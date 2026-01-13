import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';

const PublicLayout: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <div className="flex items-center space-x-6 sm:space-x-12">
              <Link to="/" className="flex items-center space-x-2 group">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <span className="text-white font-bold text-lg sm:text-xl">E</span>
                </div>
                <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  E-Mağaza
                </span>
              </Link>
              <div className="hidden md:flex space-x-6 lg:space-x-8">
                <Link to="/" className="text-slate-700 hover:text-blue-600 font-medium transition-colors relative group text-sm lg:text-base">
                  Ana Sayfa
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-200"></span>
                </Link>
                <Link to="/products" className="text-slate-700 hover:text-blue-600 font-medium transition-colors relative group text-sm lg:text-base">
                  Ürünler
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-200"></span>
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4 md:space-x-6">
              <Link
                to="/cart"
                className="relative group"
              >
                <div className="p-2 rounded-xl hover:bg-slate-100 transition-colors">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-br from-red-500 to-rose-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                      {totalItems}
                    </span>
                  )}
                </div>
              </Link>

              {isAuthenticated ? (
                <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 px-3 py-2 lg:px-4 lg:py-2 rounded-xl hover:bg-slate-100 transition-colors"
                  >
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs sm:text-sm font-semibold">
                        {user?.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-xs lg:text-sm font-medium text-slate-700 hidden lg:inline">{user?.name}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-xs lg:text-sm font-medium text-slate-600 hover:text-red-600 transition-colors px-3 py-2 lg:px-4 lg:py-2 rounded-xl hover:bg-red-50"
                  >
                    Çıkış
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="hidden md:block px-4 py-2 lg:px-6 lg:py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-sm hover:shadow-md text-xs lg:text-sm"
                >
                  Giriş Yap
                </Link>
              )}

              <button
                className="md:hidden p-2 rounded-xl hover:bg-slate-100 transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white">
            <div className="px-4 py-4 space-y-2">
              <Link
                to="/"
                className="block px-4 py-3 text-slate-700 hover:bg-slate-100 rounded-lg font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Ana Sayfa
              </Link>
              <Link
                to="/products"
                className="block px-4 py-3 text-slate-700 hover:bg-slate-100 rounded-lg font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Ürünler
              </Link>
              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    className="block px-4 py-3 text-slate-700 hover:bg-slate-100 rounded-lg font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Profilim
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg font-medium"
                  >
                    Çıkış Yap
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="block px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-medium text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Giriş Yap
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        <Outlet />
      </main>

      <footer className="bg-slate-900 text-white mt-12 sm:mt-16 md:mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <div className="col-span-1 sm:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg sm:text-xl">E</span>
                </div>
                <span className="text-xl sm:text-2xl font-bold">E-Mağaza</span>
              </div>
              <p className="text-slate-400 max-w-md leading-relaxed text-sm sm:text-base">
                Kaliteli ürünleri rekabetçi fiyatlarla sunan güvenilir hedefiniz. Güvenle alışveriş yapın ve sorunsuz bir alışveriş deneyiminin keyfini çıkarın.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Hızlı Bağlantılar</h3>
              <ul className="space-y-2 text-slate-400 text-sm sm:text-base">
                <li><Link to="/" className="hover:text-white transition-colors">Ana Sayfa</Link></li>
                <li><Link to="/products" className="hover:text-white transition-colors">Ürünler</Link></li>
                <li><Link to="/cart" className="hover:text-white transition-colors">Sepet</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Destek</h3>
              <ul className="space-y-2 text-slate-400 text-sm sm:text-base">
                <li><a href="#" className="hover:text-white transition-colors">İletişim</a></li>
                <li><a href="#" className="hover:text-white transition-colors">SSS</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Kargo Bilgisi</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-6 sm:pt-8 text-center text-slate-400 text-sm">
            <p>&copy; 2024 E-Mağaza. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
