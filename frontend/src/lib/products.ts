import { api } from './api';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  categoryId: string;
  brandId: string;
  imageUrl?: string;
  isFeatured: boolean;
}

export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  categoryId: string;
  brandId: string;
  imageUrl?: string;
  isFeatured: boolean;
}

export const productsApi = {
  getAll: async (): Promise<Product[]> => {
    const response = await api.get('/products');
    return response.data;
  },

  getById: async (id: string): Promise<Product> => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  getFeatured: async (): Promise<Product[]> => {
    const response = await api.get('/products/featured');
    return response.data;
  },

  create: async (data: CreateProductRequest): Promise<string> => {
    const response = await api.post('/products', data);
    return response.data;
  },

  update: async (id: string, data: CreateProductRequest): Promise<void> => {
    await api.put(`/products/${id}`, data);
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/products/${id}`);
  },
};