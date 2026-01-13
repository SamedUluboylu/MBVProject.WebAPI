import React, { useState } from 'react';

interface Order {
  id: string;
  orderNumber: string;
  customerEmail: string;
  status: number;
  totalAmount: number;
  createdAt: string;
  itemCount: number;
}

const OrderList: React.FC = () => {
  const [orders] = useState<Order[]>([
    {
      id: '1',
      orderNumber: 'SIP-20240113-ABC123',
      customerEmail: 'musteri@example.com',
      status: 3,
      totalAmount: 299.99,
      createdAt: '2024-01-13T10:30:00',
      itemCount: 3,
    },
    {
      id: '2',
      orderNumber: 'SIP-20240113-XYZ789',
      customerEmail: 'ahmet@example.com',
      status: 2,
      totalAmount: 149.99,
      createdAt: '2024-01-13T09:15:00',
      itemCount: 2,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const getStatusBadge = (status: number) => {
    const statuses = [
      { label: 'Beklemede', color: 'gray' },
      { label: 'Onaylandı', color: 'blue' },
      { label: 'Hazırlanıyor', color: 'yellow' },
      { label: 'Kargoya Verildi', color: 'indigo' },
      { label: 'Teslim Edildi', color: 'green' },
      { label: 'İptal Edildi', color: 'red' },
      { label: 'İade Edildi', color: 'purple' },
      { label: 'Başarısız', color: 'red' },
    ];
    const { label, color } = statuses[status] || statuses[0];
    return (
      <span className={`px-2 py-1 text-xs rounded bg-${color}-100 text-${color}-800`}>
        {label}
      </span>
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Siparişler</h1>
      </div>

      <div className="bg-white rounded-lg shadow mb-6 p-4">
        <input
          type="text"
          placeholder="Sipariş numarası veya e-posta ile ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        />
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Sipariş No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Müşteri
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Ürün Sayısı
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Toplam
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Durum
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Tarih
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{order.orderNumber}</td>
                <td className="px-6 py-4 text-sm">{order.customerEmail}</td>
                <td className="px-6 py-4 text-sm">{order.itemCount}</td>
                <td className="px-6 py-4 text-sm font-semibold">
                  ₺{order.totalAmount.toFixed(2)}
                </td>
                <td className="px-6 py-4">{getStatusBadge(order.status)}</td>
                <td className="px-6 py-4 text-sm">
                  {new Date(order.createdAt).toLocaleDateString('tr-TR')}
                </td>
                <td className="px-6 py-4 text-sm space-x-2">
                  <button className="text-blue-600 hover:text-blue-800">Görüntüle</button>
                  <button className="text-green-600 hover:text-green-800">Durumu Güncelle</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;
