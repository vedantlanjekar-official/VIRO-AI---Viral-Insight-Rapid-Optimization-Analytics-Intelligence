/**
 * Projects API
 */

import { apiClient } from './client';

export type ProjectStatus = 'Pending' | 'Processing' | 'Completed' | 'Failed' | string;

export interface Project {
  id: number;
  user_id: number;
  title: string;
  description?: string | null;
  status: ProjectStatus;
  latitude?: number | null;
  longitude?: number | null;
  country?: string | null;
  region?: string | null;
  collection_timestamp?: string | null;
  symptoms?: string | null;
  clinical_severity?: string | null;
  clinical_notes?: string | null;
  protein_files: string[];
  clinical_files: string[];
  assay_files: string[];
  mutations_count: number;
  drugs_count: number;
  modifications_count: number;
  deadliness_score?: number | null;
  created_at: string;
  updated_at: string;
}

export interface ProjectListResponse {
  items: Project[];
  projects: Project[];
  total: number;
  page: number;
  page_size: number;
}

export interface CreateProjectRequest {
  title: string;
  description?: string;
  proteinFiles?: File[];
  clinicalFiles?: File[];
  assayFiles?: File[];
  latitude?: number;
  longitude?: number;
  country?: string;
  region?: string;
  collection_timestamp?: string;
  symptoms?: string;
  clinical_severity?: string;
  clinical_notes?: string;
}

export interface UpdateProjectRequest {
  title?: string;
  description?: string;
  status?: string;
}

export interface ProjectStatusResponse {
  project_id: number;
  status: ProjectStatus;
  mutations_count: number;
  drugs_count: number;
  modifications_count: number;
}

export const projectsApi = {
  list: async (page = 1, pageSize = 20): Promise<ProjectListResponse> => {
    const data = await apiClient.get<Omit<ProjectListResponse, 'projects'>>('/projects', {
      page,
      page_size: pageSize,
    });
    return { ...data, projects: data.items };
  },

  get: (id: number) => apiClient.get<Project>(`/projects/${id}`),

  create: (data: CreateProjectRequest) => {
    const form = new FormData();
    form.append('title', data.title);

    const optionalFields: Array<[string, string | number | undefined]> = [
      ['description', data.description],
      ['latitude', data.latitude],
      ['longitude', data.longitude],
      ['country', data.country],
      ['region', data.region],
      ['collection_timestamp', data.collection_timestamp],
      ['symptoms', data.symptoms],
      ['clinical_severity', data.clinical_severity],
      ['clinical_notes', data.clinical_notes],
    ];
    optionalFields.forEach(([key, value]) => {
      if (value !== undefined && value !== '' && !(typeof value === 'number' && Number.isNaN(value))) {
        form.append(key, String(value));
      }
    });

    data.proteinFiles?.forEach((file) => form.append('protein_files', file));
    data.clinicalFiles?.forEach((file) => form.append('clinical_files', file));
    data.assayFiles?.forEach((file) => form.append('assay_files', file));

    return apiClient.request<Project>('/projects', { method: 'POST', body: form, timeoutMs: 120000 });
  },

  update: (id: number, data: UpdateProjectRequest) => apiClient.patch<Project>(`/projects/${id}`, data),

  delete: (id: number) => apiClient.delete<void>(`/projects/${id}`),

  getStatus: (id: number) => apiClient.get<ProjectStatusResponse>(`/projects/${id}/status`),
};
