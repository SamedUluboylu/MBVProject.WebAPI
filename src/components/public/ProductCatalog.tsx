import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { publicApi, PublicProduct, Category, Brand } from '../../services/publicApi';
import { useCart } from '../../contexts/CartContext';
import { useToast } from '../../contexts/ToastContext';

const ProductCatalog: React.FC = () => {
  const [products, setProducts] = useState<PublicProduct[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    price: true,
    categories: true,
    brands: true,
  });
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const priceRanges = [
    { label: 'Tümü', min: '', max: '' },
    { label: '<100₺', min: '', max: '100' },
    { label: '100-500₺', min: '100', max: '500' },
    { label: '500-1K', min: '500', max: '1000' },
    { label: '1K-5K', min: '1000', max: '5000' },
    { label: '>5K', min: '5000', max: '' },
  ];

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [categoriesData, brandsData] = await Promise.all([
          publicApi.categories.getAll(),
          publicApi.brands.getAll(),
        ]);
        setCategories(categoriesData);
        setBrands(brandsData);
      } catch (error) {
        console.error('Error fetching filters:', error);
      }
    };
    fetchFilters();
  }, []);

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
      if (selectedCategories.length > 0) params.categoryId = selectedCategories[0];
      if (selectedBrands.length > 0) params.brandId = selectedBrands[0];
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
  }, [currentPage, searchTerm, sortBy, minPrice, maxPrice, selectedCategories, selectedBrands]);

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
    setSelectedCategories([]);
    setSelectedBrands([]);
    setCurrentPage(1);
  };

  const setPriceRange = (min: string, max: string) => {
    setMinPrice(min);
    setMaxPrice(max);
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
    setCurrentPage(1);
  };

  const toggleBrand = (brandId: string) => {
    setSelectedBrands(prev =>
      prev.includes(brandId)
        ? prev.filter(id => id !== brandId)
        : [...prev, brandId]
    );
    setCurrentPage(1);
  };

  const hasActiveFilters = searchTerm || sortBy || minPrice || maxPrice || selectedCategories.length > 0 || selectedBrands.length > 0;

  const FilterSidebar = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className={`${isMobile ? 'fixed inset-0 z-50 lg:hidden' : 'hidden lg:block'}`}>
      {isMobile && (
        <div
          className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
          onClick={() => setShowMobileFilters(false)}
        />
      )}

      <div className={`bg-white ${isMobile ? 'absolute right-0 top-0 bottom-0 w-72 shadow-2xl overflow-y-auto' : 'rounded-lg border border-slate-200 sticky top-6'}`}>
        {isMobile && (
          <div className="flex items-center justify-between p-4 border-b border-slate-200 sticky top-0 bg-white z-10">
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

        <div className="p-3 space-y-2">
          {!isMobile && (
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-slate-900 text-sm">Filtreler</h3>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-[10px] text-red-600 hover:text-red-700 font-semibold"
                >
                  Temizle
                </button>
              )}
            </div>
          )}

          {/* Fiyat Filtresi */}
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection('price')}
              className="w-full flex items-center justify-between p-2.5 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Fiyat
              </div>
              <svg
                className={`w-4 h-4 text-slate-400 transition-transform ${expandedSections.price ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {expandedSections.price && (
              <div className="p-2.5 border-t border-slate-200 space-y-2">
                <div className="grid grid-cols-2 gap-1.5">
                  {priceRanges.map((range, index) => (
                    <button
                      key={index}
                      onClick={() => setPriceRange(range.min, range.max)}
                      className={`text-[10px] py-1.5 px-2 rounded font-medium transition-all ${
                        minPrice === range.min && maxPrice === range.max
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="flex-1 px-2 py-1.5 border border-slate-200 rounded text-xs focus:outline-none focus:border-blue-500"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="flex-1 px-2 py-1.5 border border-slate-200 rounded text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Kategori Filtresi */}
          {categories.length > 0 && (
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection('categories')}
                className="w-full flex items-center justify-between p-2.5 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  Kategori
                  {selectedCategories.length > 0 && (
                    <span className="bg-green-100 text-green-700 text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                      {selectedCategories.length}
                    </span>
                  )}
                </div>
                <svg
                  className={`w-4 h-4 text-slate-400 transition-transform ${expandedSections.categories ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {expandedSections.categories && (
                <div className="p-2.5 border-t border-slate-200 space-y-1 max-h-48 overflow-y-auto">
                  {categories.map((category) => (
                    <label
                      key={category.id}
                      className="flex items-center gap-2 p-1.5 hover:bg-slate-50 rounded cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category.id)}
                        onChange={() => toggleCategory(category.id)}
                        className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="text-xs text-slate-700 group-hover:text-slate-900 flex-1">
                        {category.name}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Marka Filtresi */}
          {brands.length > 0 && (
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection('brands')}
                className="w-full flex items-center justify-between p-2.5 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                  Marka
                  {selectedBrands.length > 0 && (
                    <span className="bg-orange-100 text-orange-700 text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                      {selectedBrands.length}
                    </span>
                  )}
                </div>
                <svg
                  className={`w-4 h-4 text-slate-400 transition-transform ${expandedSections.brands ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {expandedSections.brands && (
                <div className="p-2.5 border-t border-slate-200 space-y-1 max-h-48 overflow-y-auto">
                  {brands.map((brand) => (
                    <label
                      key={brand.id}
                      className="flex items-center gap-2 p-1.5 hover:bg-slate-50 rounded cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand.id)}
                        onChange={() => toggleBrand(brand.id)}
                        className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="text-xs text-slate-700 group-hover:text-slate-900 flex-1">
                        {brand.name}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          )}

          {isMobile && hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="w-full py-2 bg-red-50 text-red-600 rounded-lg text-sm font-bold hover:bg-red-100 transition-colors"
            >
              Tüm Filtreleri Temizle
            </button>
          )}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <div className="text-lg text-slate-600 font-medium">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="bg-white rounded-lg border border-slate-200 p-3">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-900">Ürünler</h1>
            <p className="text-xs text-slate-500">{products.length} ürün</p>
          </div>
          <button
            onClick={() => setShowMobileFilters(true)}
            className="lg:hidden flex items-center gap-1.5 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-all text-slate-700 text-xs font-semibold"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            Filtrele
            {hasActiveFilters && (
              <span className="bg-blue-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                {(selectedCategories.length + selectedBrands.length + (minPrice || maxPrice ? 1 : 0))}
              </span>
            )}
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Ürün ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 pl-9 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
            />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 text-xs font-semibold"
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
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-all text-red-600 text-xs font-semibold"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Temizle
            </button>
          )}
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-[220px,1fr] gap-3">
        <FilterSidebar />
        {showMobileFilters && <FilterSidebar isMobile />}

        <div>
          {products.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-lg border border-slate-200">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
                <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Ürün bulunamadı</h3>
              <p className="text-sm text-slate-500 mb-4">Arama kriterlerinizi değiştirerek tekrar deneyin</p>
              <button
                onClick={clearFilters}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
              >
                Filtreleri Temizle
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3">
                {products.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    className="group bg-white rounded-lg hover:shadow-lg transition-all duration-300 overflow-hidden border border-slate-200 hover:border-blue-300"
                  >
                    <div className="aspect-square bg-gradient-to-br from-slate-50 to-slate-100 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 group-hover:scale-110 transition-transform duration-500"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="w-14 h-14 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                      {product.discountPercentage && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                          -%{product.discountPercentage}
                        </div>
                      )}
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center">
                          <span className="text-white font-bold text-xs">Stokta Yok</span>
                        </div>
                      )}
                    </div>

                    <div className="p-3">
                      <h3 className="font-bold text-xs mb-1 text-slate-900 line-clamp-2 group-hover:text-blue-600 transition-colors min-h-[2rem]">
                        {product.name}
                      </h3>

                      <div className="flex items-center gap-1 mb-2">
                        {product.categoryName && (
                          <span className="inline-block text-[10px] text-green-700 bg-green-50 px-1.5 py-0.5 rounded font-medium">
                            {product.categoryName}
                          </span>
                        )}
                        {product.brandName && (
                          <span className="inline-block text-[10px] text-orange-700 bg-orange-50 px-1.5 py-0.5 rounded font-medium">
                            {product.brandName}
                          </span>
                        )}
                      </div>

                      <div className="flex items-baseline gap-1.5 mb-2">
                        <span className="text-base font-bold text-slate-900">
                          ₺{product.price.toFixed(2)}
                        </span>
                        {product.compareAtPrice && (
                          <span className="text-[10px] text-slate-400 line-through">
                            ₺{product.compareAtPrice.toFixed(2)}
                          </span>
                        )}
                      </div>

                      {product.averageRating && (
                        <div className="flex items-center gap-1 mb-2">
                          <div className="flex items-center bg-amber-50 px-1.5 py-0.5 rounded">
                            <svg className="w-3 h-3 text-amber-400 fill-current" viewBox="0 0 20 20">
                              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                            </svg>
                            <span className="ml-0.5 font-bold text-[10px] text-slate-700">{product.averageRating.toFixed(1)}</span>
                          </div>
                          <span className="text-[10px] text-slate-500">({product.reviewCount})</span>
                        </div>
                      )}

                      <button
                        onClick={(e) => handleAddToCart(product, e)}
                        disabled={!product.inStock}
                        className={`w-full py-1.5 rounded font-semibold text-[11px] transition-all ${
                          product.inStock
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
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
                <div className="flex justify-center items-center gap-2 bg-white rounded-lg border border-slate-200 p-2.5 mt-3">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-2.5 py-1 border border-slate-200 rounded text-[11px] disabled:opacity-40 disabled:cursor-not-allowed hover:border-blue-500 hover:bg-blue-50 transition-all font-medium"
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
                          className={`w-7 h-7 rounded font-semibold text-[11px] transition-all ${
                            currentPage === page
                              ? 'bg-blue-600 text-white'
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
                    className="px-2.5 py-1 border border-slate-200 rounded text-[11px] disabled:opacity-40 disabled:cursor-not-allowed hover:border-blue-500 hover:bg-blue-50 transition-all font-medium"
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
