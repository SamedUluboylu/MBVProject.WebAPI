import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const AdminLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-gray-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link to="/admin" className="text-xl font-bold">
                Admin Dashboard
              </Link>
              <div className="flex space-x-4">
                <Link to="/admin/products" className="hover:bg-gray-800 px-3 py-2 rounded">
                  Products
                </Link>
                <Link to="/admin/orders" className="hover:bg-gray-800 px-3 py-2 rounded">
                  Orders
                </Link>
                <Link to="/admin/categories" className="hover:bg-gray-800 px-3 py-2 rounded">
                  Categories
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm">{user?.email}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
