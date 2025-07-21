import { api } from './api';

export interface Brand {
  id: string;
  name: string;
  slug: string;
  description?: string;
  logoUrl?: string;
}

export interface CreateBrandRequest {
  name: string;
  slug: string;
  description?: string;
  logoUrl?: string;
}

export const brandsApi = {
  getAll: async (): Promise<Brand[]> => {
    const response = await api.get('/brands');
    return response.data;
  },

  create: async (data: CreateBrandRequest): Promise<string> => {
    const response = await api.post('/brands', data);
    return response.data;
  },

  update: async (id: string, data: CreateBrandRequest): Promise<void> => {
    await api.put(`/brands/${id}`, data);
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/brands/${id}`);
  },
};