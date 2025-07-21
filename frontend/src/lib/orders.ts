import { api } from './api';

export interface OrderItem {
  productId: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  status: string;
  shippingAddress: string;
  billingAddress?: string;
  paymentMethod: string;
  items: OrderItem[];
}

export interface CreateOrderRequest {
  shippingAddress: string;
  billingAddress?: string;
  paymentMethod: string;
  items: OrderItem[];
}

export const ordersApi = {
  getMyOrders: async (): Promise<Order[]> => {
    const response = await api.get('/orders');
    return response.data;
  },

  create: async (data: CreateOrderRequest): Promise<{ orderId: string }> => {
    const response = await api.post('/orders', data);
    return response.data;
  },

  updateStatus: async (id: string, status: string): Promise<void> => {
    await api.put(`/orders/${id}/status`, { status });
  },
};