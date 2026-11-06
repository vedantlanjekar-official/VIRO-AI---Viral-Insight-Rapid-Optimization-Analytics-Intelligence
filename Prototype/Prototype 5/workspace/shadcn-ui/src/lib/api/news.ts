/**
 * News / research articles API
 */

import { apiClient } from './client';

export interface NewsArticle {
  id: number;
  title: string;
  summary?: string;
  source?: string;
  publish_date?: string;
  tags?: string[];
  credibility?: string;
  relevance?: number;
  link?: string;
  created_at?: string;
  saved_at?: string;
}

export interface NewsListResponse {
  articles: NewsArticle[];
  total: number;
  page: number;
  page_size: number;
}

export const newsApi = {
  list: (page = 1, pageSize = 20, search?: string, topic?: string) =>
    apiClient.get<NewsListResponse>('/news', { page, page_size: pageSize, search, topic }),

  get: (id: number) => apiClient.get<NewsArticle>(`/news/${id}`),
};
