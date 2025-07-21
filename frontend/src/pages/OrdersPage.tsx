import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { ordersApi } from '../lib/orders';
import { formatPrice, formatDate } from '../lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

export function OrdersPage() {
  const { data: orders, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: ordersApi.getMyOrders,
  });

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <LoadingSpinner size="lg" className="py-20" />
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📦</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Henüz Siparişiniz Yok</h2>
          <p className="text-gray-600 mb-8">İlk siparişinizi vermek için alışverişe başlayın.</p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'Beklemede';
      case 'processing':
        return 'Hazırlanıyor';
      case 'shipped':
        return 'Kargoda';
      case 'delivered':
        return 'Teslim Edildi';
      case 'cancelled':
        return 'İptal Edildi';
      default:
        return status;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Siparişlerim</h1>
        <p className="text-gray-600">{orders.length} sipariş bulundu</p>
      </div>

      <div className="space-y-6">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">Sipariş #{order.id.slice(0, 8)}</CardTitle>
                  <p className="text-gray-600 mt-1">
                    Sipariş Tarihi: {formatDate(new Date())}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                    order.status
                  )}`}
                >
                  {getStatusText(order.status)}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Order Items */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Ürünler</h4>
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                        <div>
                          <span className="text-gray-900">Ürün ID: {item.productId.slice(0, 8)}</span>
                          <span className="text-gray-600 ml-2">x{item.quantity}</span>
                        </div>
                        <span className="font-medium">{formatPrice(item.unitPrice)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shipping Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Teslimat Adresi</h4>
                    <p className="text-gray-600 text-sm">{order.shippingAddress}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Ödeme Yöntemi</h4>
                    <p className="text-gray-600 text-sm">{order.paymentMethod}</p>
                  </div>
                </div>

                {/* Order Total */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <span className="text-lg font-medium text-gray-900">Toplam</span>
                  <span className="text-lg font-bold text-primary-600">
                    {formatPrice(
                      order.items.reduce((total, item) => total + item.unitPrice * item.quantity, 0)
                    )}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}