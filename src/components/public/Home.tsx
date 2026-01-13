import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { publicApi, PublicProduct } from '../../services/publicApi';
import { useCart } from '../../contexts/CartContext';
import { useToast } from '../../contexts/ToastContext';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [featuredProducts, setFeaturedProducts] = useState<PublicProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: 'Yeni Sezon Ürünleri',
      subtitle: 'En yeni trendleri keşfedin',
      cta: 'Hemen İncele',
      bg: 'from-blue-600 to-blue-500',
      image: '🎉'
    },
    {
      title: 'Özel İndirimler',
      subtitle: '%50\'ye varan indirimler',
      cta: 'Fırsatları Gör',
      bg: 'from-emerald-600 to-emerald-500',
      image: '🎁'
    },
    {
      title: 'Ücretsiz Kargo',
      subtitle: '500₺ üzeri tüm siparişlerde',
      cta: 'Alışverişe Başla',
      bg: 'from-blue-600 to-blue-500',
      image: '🚚'
    },
  ];

  const categories = [
    { name: 'Elektronik', icon: '📱', bg: 'from-blue-500 to-blue-600' },
    { name: 'Giyim', icon: '👕', bg: 'from-green-500 to-green-600' },
    { name: 'Ev & Bahçe', icon: '🏠', bg: 'from-blue-500 to-blue-600' },
    { name: 'Spor', icon: '⚽', bg: 'from-red-500 to-red-600' },
    { name: 'Kitap', icon: '📚', bg: 'from-purple-500 to-purple-600' },
    { name: 'Kozmetik', icon: '💄', bg: 'from-pink-500 to-pink-600' },
    { name: 'Oyuncak', icon: '🧸', bg: 'from-yellow-500 to-yellow-600' },
    { name: 'Aksesuar', icon: '⌚', bg: 'from-slate-500 to-slate-600' },
  ];

  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
      ),
      title: 'Ücretsiz Kargo',
      description: '500₺ ve üzeri siparişlerde',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Güvenli Ödeme',
      description: '256-bit SSL sertifikası',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      title: 'Kolay İade',
      description: '30 gün içinde iade garantisi',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: '7/24 Destek',
      description: 'Canlı müşteri desteği',
      color: 'from-purple-500 to-purple-600'
    },
  ];

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        const result = await publicApi.products.getCatalog({
          pageNumber: 1,
          pageSize: 8,
          inStockOnly: true,
        });
        setFeaturedProducts(result.items);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedProducts();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleAddToCart = (product: PublicProduct, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
    });
    showToast(`${product.name} sepete eklendi!`, 'success');
  };

  return (
    <div className="bg-slate-50">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-6 py-4 lg:py-6">
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl overflow-hidden shadow-xl mb-6 relative">
          <div className="relative h-[300px] lg:h-[400px]">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className={`h-full bg-gradient-to-r ${slide.bg} flex items-center`}>
                  <div className="max-w-[1600px] mx-auto px-8 lg:px-12 w-full">
                    <div className="max-w-2xl">
                      <div className="text-6xl lg:text-8xl mb-4 animate-scaleIn">{slide.image}</div>
                      <h2 className="text-3xl lg:text-5xl font-bold text-white mb-3 animate-fadeIn">
                        {slide.title}
                      </h2>
                      <p className="text-lg lg:text-xl text-white/90 mb-6 animate-fadeIn">
                        {slide.subtitle}
                      </p>
                      <button
                        onClick={() => navigate('/products')}
                        className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-slate-50 transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                      >
                        {slide.cta}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-4 lg:p-6 shadow-sm hover:shadow-md transition-all group"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} text-white flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className="font-bold text-slate-900 mb-1">{feature.title}</h3>
              <p className="text-xs text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-1">Kategoriler</h2>
              <p className="text-sm text-slate-600">Aradığınızı hızlıca bulun</p>
            </div>
            <Link
              to="/products"
              className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1 group"
            >
              Tümünü Gör
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-4 lg:grid-cols-8 gap-2 lg:gap-3">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => navigate('/products')}
                className="group bg-white rounded-xl p-3 lg:p-4 transition-all duration-300 hover:shadow-lg border border-slate-200 hover:border-blue-200"
              >
                <div className="flex flex-col items-center gap-2">
                  <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-gradient-to-br ${category.bg} text-white flex items-center justify-center text-2xl lg:text-3xl group-hover:scale-110 transition-transform shadow-md`}>
                    {category.icon}
                  </div>
                  <span className="font-semibold text-[10px] lg:text-xs text-slate-900 text-center leading-tight">
                    {category.name}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-1">Öne Çıkan Ürünler</h2>
              <p className="text-sm text-slate-600">En popüler ve çok satanlar</p>
            </div>
            <Link
              to="/products"
              className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1 group"
            >
              Tüm Ürünler
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl p-3 animate-pulse">
                  <div className="aspect-square bg-slate-200 rounded-lg mb-3"></div>
                  <div className="h-4 bg-slate-200 rounded mb-2"></div>
                  <div className="h-3 bg-slate-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {featuredProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="group bg-white rounded-xl hover:shadow-lg transition-all duration-300 overflow-hidden border border-slate-200 hover:border-blue-200 flex flex-col"
                >
                  <div className="aspect-square bg-gradient-to-br from-slate-50 to-slate-100 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-600/5 group-hover:scale-105 transition-transform duration-300"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-16 h-16 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    {product.discountPercentage && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-md">
                        -%{Math.round(product.discountPercentage)}
                      </div>
                    )}
                  </div>

                  <div className="p-3 flex flex-col flex-1">
                    <div className="flex items-center gap-1 mb-2">
                      {product.categoryName && (
                        <span className="text-[9px] text-green-700 bg-green-50 px-1.5 py-0.5 rounded font-medium">
                          {product.categoryName}
                        </span>
                      )}
                      {product.brandName && (
                        <span className="text-[9px] text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded font-medium">
                          {product.brandName}
                        </span>
                      )}
                    </div>

                    <h3 className="font-semibold text-sm mb-2 text-slate-900 line-clamp-2 group-hover:text-blue-600 transition-colors min-h-[2.5rem] leading-tight">
                      {product.name}
                    </h3>

                    <div className="mt-auto">
                      {product.averageRating && (
                        <div className="flex items-center gap-1.5 mb-2">
                          <div className="flex items-center bg-amber-50 px-1.5 py-1 rounded">
                            <svg className="w-3 h-3 text-amber-400 fill-current" viewBox="0 0 20 20">
                              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                            </svg>
                            <span className="ml-1 font-bold text-[10px] text-slate-700">{product.averageRating.toFixed(1)}</span>
                          </div>
                          <span className="text-[10px] text-slate-500">({product.reviewCount})</span>
                        </div>
                      )}

                      <div className="flex items-baseline gap-1.5 mb-3">
                        <span className="text-lg font-bold text-blue-600">
                          ₺{product.price.toFixed(2)}
                        </span>
                        {product.compareAtPrice && (
                          <span className="text-[10px] text-slate-400 line-through">
                            ₺{product.compareAtPrice.toFixed(2)}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={(e) => handleAddToCart(product, e)}
                        disabled={!product.inStock}
                        className={`w-full py-2 rounded-lg font-semibold text-xs transition-all ${
                          product.inStock
                            ? 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95 shadow-sm hover:shadow-md'
                            : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        {product.inStock ? 'Sepete Ekle' : 'Stokta Yok'}
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl overflow-hidden shadow-xl">
          <div className="px-6 lg:px-12 py-12 lg:py-16 text-center">
            <h2 className="text-2xl lg:text-4xl font-bold text-white mb-3">
              Bültenimize Abone Olun
            </h2>
            <p className="text-base lg:text-lg text-white/90 mb-6 max-w-2xl mx-auto">
              Özel fırsatlar, yeni ürünler ve kampanyalardan ilk siz haberdar olun
            </p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="flex-1 px-4 py-3 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
              />
              <button className="bg-slate-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl text-sm whitespace-nowrap active:scale-95">
                Abone Ol
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
