import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';

const PublicLayout: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-2xl font-bold text-blue-600">
                E-Shop
              </Link>
              <div className="flex space-x-6">
                <Link to="/" className="text-gray-700 hover:text-blue-600">
                  Home
                </Link>
                <Link to="/products" className="text-gray-700 hover:text-blue-600">
                  Products
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/cart" className="relative text-gray-700 hover:text-blue-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
              {isAuthenticated ? (
                <>
                  <span className="text-sm text-gray-700">{user?.name}</span>
                  <button
                    onClick={handleLogout}
                    className="text-sm text-gray-700 hover:text-blue-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" className="text-sm text-gray-700 hover:text-blue-600">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Outlet />
      </main>
      <footer className="bg-gray-900 text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <p className="text-center text-sm">© 2024 E-Shop. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
