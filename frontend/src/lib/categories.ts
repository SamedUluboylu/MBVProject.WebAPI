import { api } from './api';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
  imageUrl?: string;
}

export interface CreateCategoryRequest {
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
  imageUrl?: string;
}

export const categoriesApi = {
  getAll: async (): Promise<Category[]> => {
    const response = await api.get('/categories');
    return response.data;
  },

  create: async (data: CreateCategoryRequest): Promise<string> => {
    const response = await api.post('/categories', data);
    return response.data;
  },

  update: async (id: string, data: CreateCategoryRequest): Promise<void> => {
    await api.put(`/categories/${id}`, data);
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/categories/${id}`);
  },
};