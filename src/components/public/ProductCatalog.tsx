import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { publicApi, PublicProduct } from '../../services/publicApi';
import { useCart } from '../../contexts/CartContext';
import { useToast } from '../../contexts/ToastContext';

const ProductCatalog: React.FC = () => {
  const [products, setProducts] = useState<PublicProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params: any = {
        pageNumber: currentPage,
        pageSize: 12,
        searchTerm: searchTerm || undefined,
        inStockOnly: true,
      };

      if (minPrice) params.minPrice = parseFloat(minPrice);
      if (maxPrice) params.maxPrice = parseFloat(maxPrice);
      if (sortBy) {
        const [field, direction] = sortBy.split('_');
        params.sortBy = field;
        params.isDescending = direction === 'desc';
      }

      const result = await publicApi.products.getCatalog(params);
      setProducts(result.items);
      setTotalPages(result.totalPages);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
      showToast('Ürünler yüklenirken hata oluştu', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage, searchTerm, sortBy, minPrice, maxPrice]);

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

  const clearFilters = () => {
    setSearchTerm('');
    setSortBy('');
    setMinPrice('');
    setMaxPrice('');
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh]">
        <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <div className="text-lg sm:text-xl text-slate-600 font-medium">Harika ürünler yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="bg-gradient-to-br from-white to-slate-50 rounded-xl sm:rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-6 md:p-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-slate-900">
          Ürünleri Keşfedin
        </h1>
        <p className="text-slate-600 mb-4 sm:mb-6 text-sm sm:text-base">Kaliteli ürünler koleksiyonumuza göz atın</p>

        <div className="space-y-4">
          <div className="relative max-w-2xl">
            <input
              type="text"
              placeholder="Ürün ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 sm:px-6 sm:py-4 pl-12 sm:pl-14 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-slate-900 placeholder-slate-400 text-sm sm:text-base"
            />
            <svg className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-slate-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all text-slate-700 font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filtreler
            </button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all text-slate-700 font-medium"
            >
              <option value="">Sırala</option>
              <option value="price_asc">Fiyat (Düşük - Yüksek)</option>
              <option value="price_desc">Fiyat (Yüksek - Düşük)</option>
              <option value="name_asc">İsim (A-Z)</option>
              <option value="name_desc">İsim (Z-A)</option>
              <option value="createdAt_desc">En Yeni</option>
            </select>

            {(searchTerm || sortBy || minPrice || maxPrice) && (
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 border-2 border-red-200 rounded-xl hover:bg-red-100 transition-all text-red-700 font-medium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Temizle
              </button>
            )}
          </div>

          {showFilters && (
            <div className="bg-white border-2 border-slate-200 rounded-xl p-4 space-y-4 animate-slideIn">
              <h3 className="font-bold text-slate-900">Fiyat Aralığı</h3>
              <div className="flex gap-3">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="flex-1 px-4 py-2 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="flex-1 px-4 py-2 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-16 sm:py-20 bg-white rounded-xl sm:rounded-2xl shadow-sm border border-slate-200 px-4">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-slate-100 rounded-full mb-4">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">Ürün bulunamadı</h3>
          <p className="text-slate-500 mb-6 text-sm sm:text-base">Arama kriterlerinizi ayarlamayı deneyin</p>
          <button
            onClick={clearFilters}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors text-sm sm:text-base"
          >
            Filtreleri Temizle
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="group bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 hover:border-blue-200"
              >
                <div className="aspect-square bg-gradient-to-br from-slate-50 to-slate-100 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 group-hover:scale-110 transition-transform duration-500"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-16 h-16 sm:w-20 sm:h-20 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  {product.discountPercentage && (
                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-gradient-to-r from-red-500 to-rose-600 text-white text-xs font-bold px-2 py-1 sm:px-3 sm:py-1.5 rounded-full shadow-lg z-10">
                      -%{product.discountPercentage} İNDİRİM
                    </div>
                  )}
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center">
                      <span className="text-white font-bold text-base sm:text-lg">Stokta Yok</span>
                    </div>
                  )}
                </div>

                <div className="p-4 sm:p-5">
                  <h3 className="font-bold text-sm sm:text-base mb-2 text-slate-900 line-clamp-2 group-hover:text-blue-600 transition-colors min-h-[2.5rem] sm:min-h-[3rem]">
                    {product.name}
                  </h3>

                  {product.categoryName && (
                    <span className="inline-block text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-lg mb-3">
                      {product.categoryName}
                    </span>
                  )}

                  <div className="flex items-baseline justify-between mb-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl sm:text-2xl font-bold text-slate-900">
                        ₺{product.price.toFixed(2)}
                      </span>
                      {product.compareAtPrice && (
                        <span className="text-sm text-slate-400 line-through">
                          ₺{product.compareAtPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>

                  {product.averageRating && (
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center bg-amber-50 px-2.5 py-1 rounded-lg">
                        <svg className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                        </svg>
                        <span className="ml-1.5 font-bold text-sm text-slate-700">{product.averageRating.toFixed(1)}</span>
                      </div>
                      <span className="text-xs text-slate-500">({product.reviewCount} değerlendirme)</span>
                    </div>
                  )}

                  <button
                    onClick={(e) => handleAddToCart(product, e)}
                    disabled={!product.inStock}
                    className={`w-full py-2.5 sm:py-3 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 ${
                      product.inStock
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700 shadow-sm hover:shadow-md hover:-translate-y-0.5'
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    {product.inStock ? 'Sepete Ekle' : 'Stokta Yok'}
                  </button>
                </div>
              </Link>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 bg-white rounded-xl sm:rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-6">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 sm:px-5 sm:py-2.5 border-2 border-slate-200 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 transition-all font-medium text-xs sm:text-sm"
              >
                Önceki
              </button>
              <div className="flex items-center gap-1 sm:gap-2">
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let page;
                  if (totalPages <= 5) {
                    page = i + 1;
                  } else if (currentPage <= 3) {
                    page = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    page = totalPages - 4 + i;
                  } else {
                    page = currentPage - 2 + i;
                  }
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl font-semibold text-xs sm:text-sm transition-all ${
                        currentPage === page
                          ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 sm:px-5 sm:py-2.5 border-2 border-slate-200 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 transition-all font-medium text-xs sm:text-sm"
              >
                Sonraki
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductCatalog;
