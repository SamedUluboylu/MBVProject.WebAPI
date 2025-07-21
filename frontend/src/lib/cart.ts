import { api } from './api';

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface AddToCartRequest {
  productId: string;
  quantity: number;
}

export const cartApi = {
  addItem: async (data: AddToCartRequest): Promise<void> => {
    await api.post('/cart/items', data);
  },

  updateItem: async (productId: string, quantity: number): Promise<void> => {
    await api.put(`/cart/items/${productId}`, { quantity });
  },

  removeItem: async (productId: string, cartId: string): Promise<void> => {
    await api.delete(`/cart/items/${productId}?cartId=${cartId}`);
  },

  clear: async (cartId: string): Promise<void> => {
    await api.delete(`/cart/clear?cartId=${cartId}`);
  },
};