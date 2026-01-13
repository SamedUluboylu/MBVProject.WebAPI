import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { siteConfig } from '../../config/siteConfig';
import LanguageSwitcher from '../LanguageSwitcher';

const PublicLayout: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
      setSearchTerm('');
    }
  };

  const categories = [
    { name: 'Elektronik', icon: '📱' },
    { name: 'Giyim', icon: '👕' },
    { name: 'Ev & Bahçe', icon: '🏠' },
    { name: 'Spor', icon: '⚽' },
    { name: 'Kitap & Hobi', icon: '📚' },
    { name: 'Kozmetik', icon: '💄' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-slate-200">
        <div className="bg-slate-50 border-b border-slate-200">
          <div className="max-w-[1600px] mx-auto px-4 lg:px-6">
            <div className="flex items-center justify-between h-10 text-xs">
              <div className="flex items-center gap-4 text-slate-600">
                <a href="#" className="hover:text-blue-600 transition-colors flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="hidden sm:inline">Müşteri Hizmetleri</span>
                </a>
                <a href="#" className="hover:text-blue-600 transition-colors hidden md:inline">Yardım</a>
                <a href="#" className="hover:text-blue-600 transition-colors hidden md:inline">Sipariş Takibi</a>
              </div>
              <div className="flex items-center gap-4 text-slate-600">
                <LanguageSwitcher />
                {isAuthenticated && (
                  <span className="text-xs">
                    Hoş geldin, <span className="font-semibold text-slate-900">{user?.name}</span>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[1600px] mx-auto px-4 lg:px-6">
          <div className="flex items-center gap-4 h-16 lg:h-20">
            <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
              {siteConfig.logoUrl ? (
                <img
                  src={siteConfig.logoUrl}
                  alt={siteConfig.name}
                  className="w-9 h-9 lg:w-11 lg:h-11 object-contain group-hover:scale-105 transition-transform duration-200"
                />
              ) : (
                <div className="w-9 h-9 lg:w-11 lg:h-11 bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200 shadow-md">
                  <span className="text-white font-bold text-lg lg:text-xl">{siteConfig.logoText}</span>
                </div>
              )}
              <span className="text-xl lg:text-2xl font-bold text-slate-900 hidden sm:inline">
                {siteConfig.name}
              </span>
            </Link>

            <div className="hidden lg:block relative">
              <button
                onMouseEnter={() => setShowCategoriesDropdown(true)}
                onMouseLeave={() => setShowCategoriesDropdown(false)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors text-sm font-semibold text-slate-700 border border-slate-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                Kategoriler
                <svg className={`w-4 h-4 transition-transform ${showCategoriesDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showCategoriesDropdown && (
                <div
                  onMouseEnter={() => setShowCategoriesDropdown(true)}
                  onMouseLeave={() => setShowCategoriesDropdown(false)}
                  className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-xl border border-slate-200 py-2 animate-slideDown"
                >
                  {categories.map((category, index) => (
                    <Link
                      key={index}
                      to="/products"
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 transition-colors group"
                    >
                      <span className="text-xl">{category.icon}</span>
                      <span className="text-sm font-medium text-slate-700 group-hover:text-blue-600">
                        {category.name}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Ürün, kategori veya marka ara..."
                  className="w-full px-4 py-2.5 pl-10 pr-24 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-sm"
                />
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold transition-colors text-xs lg:text-sm"
                >
                  Ara
                </button>
              </div>
            </form>

            <div className="flex items-center gap-2 lg:gap-3">
              <Link
                to="/cart"
                className="relative group p-2 lg:p-2.5 hover:bg-slate-50 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6 lg:w-7 lg:h-7 text-slate-700 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md animate-scaleIn">
                    {totalItems}
                  </span>
                )}
              </Link>

              {isAuthenticated ? (
                <div className="hidden lg:flex items-center gap-3">
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                      <span className="text-white text-sm font-semibold">
                        {user?.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-slate-700 hidden xl:inline">Hesabım</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-sm font-medium text-slate-600 hover:text-red-600 transition-colors px-3 py-2 rounded-lg hover:bg-red-50"
                  >
                    Çıkış
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="hidden lg:flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all shadow-sm hover:shadow-md text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Giriş Yap
                </Link>
              )}

              <button
                className="lg:hidden p-2 rounded-lg hover:bg-slate-50 transition-colors"
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
          <div className="lg:hidden border-t border-slate-200 bg-white animate-slideDown">
            <div className="px-4 py-4 space-y-2">
              <Link
                to="/"
                className="block px-4 py-3 text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Ana Sayfa
              </Link>
              <Link
                to="/products"
                className="block px-4 py-3 text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Ürünler
              </Link>
              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    className="block px-4 py-3 text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg font-medium transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Profilim
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors"
                  >
                    Çıkış Yap
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="block px-4 py-3 bg-blue-600 text-white rounded-lg font-medium text-center transition-colors hover:bg-blue-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Giriş Yap
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>

      <main className="w-full">
        <Outlet />
      </main>

      <footer className="bg-slate-900 text-white mt-16">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-6 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                {siteConfig.logoUrl ? (
                  <img
                    src={siteConfig.logoUrl}
                    alt={siteConfig.name}
                    className="w-10 h-10 object-contain"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-xl">{siteConfig.logoText}</span>
                  </div>
                )}
                <span className="text-2xl font-bold">{siteConfig.name}</span>
              </div>
              <p className="text-slate-400 max-w-md leading-relaxed text-sm mb-4">
                {siteConfig.description}
              </p>
              <div className="flex gap-3">
                <a href="#" className="w-9 h-9 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="w-9 h-9 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className="w-9 h-9 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-base mb-4">Hızlı Bağlantılar</h3>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><Link to="/" className="hover:text-blue-500 transition-colors">Ana Sayfa</Link></li>
                <li><Link to="/products" className="hover:text-blue-500 transition-colors">Ürünler</Link></li>
                <li><Link to="/cart" className="hover:text-blue-500 transition-colors">Sepet</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-base mb-4">Kurumsal</h3>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-blue-500 transition-colors">Hakkımızda</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">İletişim</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Kariyer</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-base mb-4">Destek</h3>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-blue-500 transition-colors">Yardım Merkezi</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Sipariş Takibi</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">İade & İptal</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-sm">
            <p>&copy; 2024 E-Mağaza. Tüm hakları saklıdır.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-blue-500 transition-colors">Gizlilik Politikası</a>
              <a href="#" className="hover:text-blue-500 transition-colors">Kullanım Şartları</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
