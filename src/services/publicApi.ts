import { apiService } from './api';

export interface PublicProduct {
  id: string;
  name: string;
  slug: string;
  shortDescription?: string;
  price: number;
  compareAtPrice?: number;
  inStock: boolean;
  isFeatured: boolean;
  averageRating?: number;
  reviewCount: number;
  categoryName?: string;
  brandName?: string;
  discountPercentage?: number;
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

export interface CreateOrderCommand {
  userId: string;
  shippingAddress: string;
  billingAddress?: string;
  customerEmail: string;
  customerPhone: string;
  customerNote?: string;
  couponCode?: string;
  items: {
    productId: string;
    variantId?: string;
    quantity: number;
  }[];
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  parentId?: string;
}

export interface Brand {
  id: string;
  name: string;
  description?: string;
  logoUrl?: string;
}

export const publicApi = {
  products: {
    getCatalog: (params: {
      pageNumber?: number;
      pageSize?: number;
      searchTerm?: string;
      categoryId?: string;
      brandId?: string;
      minPrice?: number;
      maxPrice?: number;
      inStockOnly?: boolean;
      sortBy?: string;
      isDescending?: boolean;
    }) => apiService.get<PaginatedResult<PublicProduct>>('/api/public/products', params),
  },

  categories: {
    getAll: () => apiService.get<Category[]>('/api/categories'),
  },

  brands: {
    getAll: () => apiService.get<Brand[]>('/api/brands'),
  },

  orders: {
    create: (data: CreateOrderCommand) =>
      apiService.post<{ success: boolean; message: string; data: string }>('/api/public/orders', data),
  },
};
