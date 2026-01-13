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
      orderNumber: 'ORD-20240113-ABC123',
      customerEmail: 'customer@example.com',
      status: 3,
      totalAmount: 299.99,
      createdAt: '2024-01-13T10:30:00',
      itemCount: 3,
    },
    {
      id: '2',
      orderNumber: 'ORD-20240113-XYZ789',
      customerEmail: 'john@example.com',
      status: 2,
      totalAmount: 149.99,
      createdAt: '2024-01-13T09:15:00',
      itemCount: 2,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const getStatusBadge = (status: number) => {
    const statuses = [
      { label: 'Pending', color: 'gray' },
      { label: 'Confirmed', color: 'blue' },
      { label: 'Processing', color: 'yellow' },
      { label: 'Shipped', color: 'indigo' },
      { label: 'Delivered', color: 'green' },
      { label: 'Cancelled', color: 'red' },
      { label: 'Refunded', color: 'purple' },
      { label: 'Failed', color: 'red' },
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
        <h1 className="text-3xl font-bold">Orders</h1>
      </div>

      <div className="bg-white rounded-lg shadow mb-6 p-4">
        <input
          type="text"
          placeholder="Search orders by number or email..."
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
                Order Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Items
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
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
                  ${order.totalAmount.toFixed(2)}
                </td>
                <td className="px-6 py-4">{getStatusBadge(order.status)}</td>
                <td className="px-6 py-4 text-sm">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm space-x-2">
                  <button className="text-blue-600 hover:text-blue-800">View</button>
                  <button className="text-green-600 hover:text-green-800">Update Status</button>
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
