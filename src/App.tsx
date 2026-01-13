import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';

import Login from './components/auth/Login';
import AdminLayout from './components/admin/AdminLayout';
import ProductList from './components/admin/ProductList';
import PublicLayout from './components/public/PublicLayout';
import ProductCatalog from './components/public/ProductCatalog';
import Cart from './components/public/Cart';

const ProtectedRoute: React.FC<{ children: React.ReactNode; adminOnly?: boolean }> = ({
  children,
  adminOnly = false,
}) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/" element={<PublicLayout />}>
        <Route index element={<ProductCatalog />} />
        <Route path="products" element={<ProductCatalog />} />
        <Route path="cart" element={<Cart />} />
      </Route>

      <Route
        path="/admin"
        element={
          <ProtectedRoute adminOnly>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<ProductList />} />
        <Route path="products" element={<ProductList />} />
        <Route path="orders" element={<div className="text-xl">Orders (Coming Soon)</div>} />
        <Route path="categories" element={<div className="text-xl">Categories (Coming Soon)</div>} />
      </Route>
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <AppRoutes />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
