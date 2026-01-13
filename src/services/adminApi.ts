import { apiService } from './api';

export interface AdminProduct {
  id: string;
  name: string;
  slug: string;
  sku: string;
  price: number;
  compareAtPrice?: number;
  cost: number;
  stockQuantity: number;
  status: number;
  isFeatured: boolean;
  categoryId: string;
  categoryName?: string;
  brandId: string;
  brandName?: string;
  viewCount: number;
  salesCount: number;
  averageRating?: number;
  reviewCount: number;
  createdAt: string;
  updatedAt?: string;
  margin?: number;
}

export interface PaginatedResult<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface CreateProductCommand {
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  price: number;
  compareAtPrice?: number;
  cost: number;
  stockQuantity: number;
  sku: string;
  barcode?: string;
  categoryId: string;
  brandId: string;
  status: number;
  isFeatured: boolean;
  allowBackorder: boolean;
  weight: number;
  dimensions?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
}

export const adminApi = {
  products: {
    getAll: (params: {
      pageNumber?: number;
      pageSize?: number;
      searchTerm?: string;
      categoryId?: string;
      brandId?: string;
      status?: number;
      sortBy?: string;
      isDescending?: boolean;
    }) => apiService.get<PaginatedResult<AdminProduct>>('/api/admin/products', params),

    create: (data: CreateProductCommand) =>
      apiService.post<{ success: boolean; message: string; data: string }>('/api/admin/products', data),

    update: (id: string, data: CreateProductCommand) =>
      apiService.put<{ success: boolean; message: string }>(`/api/admin/products/${id}`, { ...data, id }),

    delete: (id: string) =>
      apiService.delete<{ success: boolean; message: string }>(`/api/admin/products/${id}`),
  },
};
