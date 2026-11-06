/**
 * Base HTTP client for the Viro-AI FastAPI backend
 */

export const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'
).replace(/\/+$/, '');

const DEFAULT_TIMEOUT_MS = 30000;

export interface ApiError {
  status: number;
  message: string;
  detail?: string;
}

type QueryParams = Record<string, string | number | boolean | undefined | null>;

interface RequestOptions {
  method?: string;
  body?: unknown;
  params?: QueryParams;
  timeoutMs?: number;
}

class ApiClient {
  private token: string | null = null;

  constructor(private baseUrl: string) {
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token');
    }
  }

  setToken(token: string | null) {
    this.token = token;
  }

  getToken() {
    return this.token;
  }

  private buildUrl(path: string, params?: QueryParams) {
    const url = new URL(`${this.baseUrl}${path.startsWith('/') ? path : `/${path}`}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          url.searchParams.set(key, String(value));
        }
      });
    }
    return url.toString();
  }

  async request<T>(path: string, { method = 'GET', body, params, timeoutMs = DEFAULT_TIMEOUT_MS }: RequestOptions = {}): Promise<T> {
    const headers: Record<string, string> = { Accept: 'application/json' };
    const isFormData = typeof FormData !== 'undefined' && body instanceof FormData;
    if (body !== undefined && !isFormData) {
      headers['Content-Type'] = 'application/json';
    }
    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    let response: Response;
    try {
      response = await fetch(this.buildUrl(path, params), {
        method,
        headers,
        body: body === undefined ? undefined : isFormData ? (body as FormData) : JSON.stringify(body),
        signal: controller.signal,
      });
    } catch (err) {
      const timedOut = err instanceof DOMException && err.name === 'AbortError';
      const error: ApiError = {
        status: 0,
        detail: timedOut ? 'TIMEOUT' : 'NETWORK_ERROR',
        message: timedOut
          ? 'Request timed out. Please try again.'
          : `Cannot connect to server at ${this.baseUrl}. Please ensure the backend is running.`,
      };
      throw error;
    } finally {
      clearTimeout(timer);
    }

    if (response.status === 204) {
      return undefined as T;
    }

    const text = await response.text();
    let data: unknown = undefined;
    if (text) {
      try {
        data = JSON.parse(text);
      } catch {
        data = text;
      }
    }

    if (!response.ok) {
      const rawDetail = (data as { detail?: unknown } | undefined)?.detail;
      const detail = typeof rawDetail === 'string'
        ? rawDetail
        : rawDetail !== undefined
          ? JSON.stringify(rawDetail)
          : typeof data === 'string' ? data : undefined;
      const error: ApiError = {
        status: response.status,
        detail,
        message: detail || response.statusText || `Request failed with status ${response.status}`,
      };
      throw error;
    }

    return data as T;
  }

  get<T>(path: string, params?: QueryParams) {
    return this.request<T>(path, { params });
  }

  post<T>(path: string, body?: unknown) {
    return this.request<T>(path, { method: 'POST', body });
  }

  patch<T>(path: string, body?: unknown) {
    return this.request<T>(path, { method: 'PATCH', body });
  }

  delete<T>(path: string) {
    return this.request<T>(path, { method: 'DELETE' });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
