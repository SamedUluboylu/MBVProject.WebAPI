import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'orders'>('profile');

  const mockOrders = [
    {
      id: '1',
      orderNumber: 'ORD-20240113-ABC123',
      date: '2024-01-13',
      status: 'Delivered',
      total: 299.99,
      items: 3,
    },
    {
      id: '2',
      orderNumber: 'ORD-20240110-XYZ789',
      date: '2024-01-10',
      status: 'Shipped',
      total: 149.99,
      items: 2,
    },
    {
      id: '3',
      orderNumber: 'ORD-20240105-DEF456',
      date: '2024-01-05',
      status: 'Processing',
      total: 449.99,
      items: 5,
    },
  ];

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      Delivered: 'bg-green-100 text-green-800',
      Shipped: 'bg-blue-100 text-blue-800',
      Processing: 'bg-yellow-100 text-yellow-800',
      Pending: 'bg-gray-100 text-gray-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">My Account</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold text-blue-600">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <h2 className="font-bold text-lg">{user?.name}</h2>
              <p className="text-sm text-gray-600">{user?.email}</p>
            </div>

            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full text-left px-4 py-2 rounded ${
                  activeTab === 'profile'
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'hover:bg-gray-50'
                }`}
              >
                Profile Information
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full text-left px-4 py-2 rounded ${
                  activeTab === 'orders'
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'hover:bg-gray-50'
                }`}
              >
                Order History
              </button>
            </nav>
          </div>
        </div>

        <div className="lg:col-span-3">
          {activeTab === 'profile' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-6">Profile Information</h2>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">First Name</label>
                    <input
                      type="text"
                      defaultValue={user?.name?.split(' ')[0]}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Last Name</label>
                    <input
                      type="text"
                      defaultValue={user?.name?.split(' ')[1] || ''}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    defaultValue={user?.email}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </form>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h2 className="text-2xl font-bold">Order History</h2>
              </div>
              <div className="divide-y">
                {mockOrders.map((order) => (
                  <div key={order.id} className="p-6 hover:bg-gray-50">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-lg">{order.orderNumber}</h3>
                        <p className="text-sm text-gray-600">
                          Placed on {new Date(order.date).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm">
                        <span className="text-gray-600">{order.items} items • </span>
                        <span className="font-bold text-lg">${order.total.toFixed(2)}</span>
                      </div>
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        View Details →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
