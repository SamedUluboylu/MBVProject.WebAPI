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
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const priceRanges = [
    { label: 'Tümü', min: '', max: '' },
    { label: '< 100₺', min: '', max: '100' },
    { label: '100-500₺', min: '100', max: '500' },
    { label: '500-1K₺', min: '500', max: '1000' },
    { label: '1K-5K₺', min: '1000', max: '5000' },
    { label: '5K+₺', min: '5000', max: '' },
  ];

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

  const setPriceRange = (min: string, max: string) => {
    setMinPrice(min);
    setMaxPrice(max);
  };

  const hasActiveFilters = searchTerm || sortBy || minPrice || maxPrice;

  const FilterSidebar = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className={`${isMobile ? 'fixed inset-0 z-50 lg:hidden' : 'hidden lg:block'}`}>
      {isMobile && (
        <div
          className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
          onClick={() => setShowMobileFilters(false)}
        />
      )}

      <div className={`bg-white ${isMobile ? 'absolute right-0 top-0 bottom-0 w-72 shadow-2xl overflow-y-auto' : 'rounded-xl border border-slate-200 shadow-sm sticky top-6'}`}>
        {isMobile && (
          <div className="flex items-center justify-between p-4 border-b border-slate-200">
            <h3 className="font-bold text-slate-900">Filtreler</h3>
            <button
              onClick={() => setShowMobileFilters(false)}
              className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        <div className="p-4 space-y-5">
          {!isMobile && (
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900">Filtreler</h3>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-xs text-red-600 hover:text-red-700 font-medium"
                >
                  Temizle
                </button>
              )}
            </div>
          )}

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Fiyat
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {priceRanges.map((range, index) => (
                <button
                  key={index}
                  onClick={() => setPriceRange(range.min, range.max)}
                  className={`text-xs py-1.5 px-2 rounded-lg font-medium transition-all ${
                    minPrice === range.min && maxPrice === range.max
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>

            <div className="flex gap-2 pt-1">
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="flex-1 px-2.5 py-1.5 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 transition-all text-xs"
              />
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="flex-1 px-2.5 py-1.5 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 transition-all text-xs"
              />
            </div>
          </div>

          {isMobile && hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="w-full py-2 bg-red-50 text-red-600 rounded-lg text-sm font-semibold hover:bg-red-100 transition-colors"
            >
              Filtreleri Temizle
            </button>
          )}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh]">
        <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <div className="text-lg sm:text-xl text-slate-600 font-medium">Harika ürünler yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-5">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Ürünler</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">{products.length} ürün</p>
          </div>
          <button
            onClick={() => setShowMobileFilters(true)}
            className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-all text-slate-700 text-sm font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            Filtre
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Ürün ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 pl-9 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-sm"
            />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 transition-all text-sm font-medium"
          >
            <option value="">Sırala</option>
            <option value="price_asc">Fiyat ↑</option>
            <option value="price_desc">Fiyat ↓</option>
            <option value="name_asc">İsim A-Z</option>
            <option value="name_desc">İsim Z-A</option>
            <option value="createdAt_desc">En Yeni</option>
          </select>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-all text-red-600 text-sm font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Temizle
            </button>
          )}
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-[220px,1fr] gap-4">
        <FilterSidebar />
        {showMobileFilters && <FilterSidebar isMobile />}

        <div>
          {products.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-slate-200">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-slate-100 rounded-full mb-3">
                <svg className="w-7 h-7 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Ürün bulunamadı</h3>
              <p className="text-sm text-slate-500 mb-4">Arama kriterlerinizi değiştirmeyi deneyin</p>
              <button
                onClick={clearFilters}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
              >
                Filtreleri Temizle
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
                {products.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-slate-100 hover:border-blue-200"
                  >
                    <div className="aspect-square bg-gradient-to-br from-slate-50 to-slate-100 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 group-hover:scale-110 transition-transform duration-500"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="w-16 h-16 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                      {product.discountPercentage && (
                        <div className="absolute top-2 right-2 bg-gradient-to-r from-red-500 to-rose-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                          -%{product.discountPercentage}
                        </div>
                      )}
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center">
                          <span className="text-white font-bold text-sm">Stokta Yok</span>
                        </div>
                      )}
                    </div>

                    <div className="p-3.5">
                      <h3 className="font-bold text-sm mb-1.5 text-slate-900 line-clamp-2 group-hover:text-blue-600 transition-colors min-h-[2.5rem]">
                        {product.name}
                      </h3>

                      {product.categoryName && (
                        <span className="inline-block text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded mb-2">
                          {product.categoryName}
                        </span>
                      )}

                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-lg font-bold text-slate-900">
                          ₺{product.price.toFixed(2)}
                        </span>
                        {product.compareAtPrice && (
                          <span className="text-xs text-slate-400 line-through">
                            ₺{product.compareAtPrice.toFixed(2)}
                          </span>
                        )}
                      </div>

                      {product.averageRating && (
                        <div className="flex items-center gap-1.5 mb-3">
                          <div className="flex items-center bg-amber-50 px-2 py-0.5 rounded-lg">
                            <svg className="w-3.5 h-3.5 text-amber-400 fill-current" viewBox="0 0 20 20">
                              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                            </svg>
                            <span className="ml-1 font-bold text-xs text-slate-700">{product.averageRating.toFixed(1)}</span>
                          </div>
                          <span className="text-xs text-slate-500">({product.reviewCount})</span>
                        </div>
                      )}

                      <button
                        onClick={(e) => handleAddToCart(product, e)}
                        disabled={!product.inStock}
                        className={`w-full py-2 rounded-lg font-semibold text-xs transition-all duration-200 ${
                          product.inStock
                            ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700 shadow-sm hover:shadow-md'
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
                <div className="flex justify-center items-center gap-2 bg-white rounded-xl shadow-sm border border-slate-200 p-3 mt-4">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1.5 border border-slate-200 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:border-blue-500 hover:bg-blue-50 transition-all text-xs font-medium"
                  >
                    Önceki
                  </button>
                  <div className="flex items-center gap-1">
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
                          className={`w-8 h-8 rounded-lg font-semibold text-xs transition-all ${
                            currentPage === page
                              ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-sm'
                              : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
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
                    className="px-3 py-1.5 border border-slate-200 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:border-blue-500 hover:bg-blue-50 transition-all text-xs font-medium"
                  >
                    Sonraki
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCatalog;
