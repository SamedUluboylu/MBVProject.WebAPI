import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { productsApi } from '../lib/products';
import { categoriesApi } from '../lib/categories';
import { brandsApi } from '../lib/brands';
import { ProductGrid } from '../components/products/ProductGrid';
import { ProductFilters } from '../components/products/ProductFilters';
import { Button } from '../components/ui/Button';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

export function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedBrand, setSelectedBrand] = useState(searchParams.get('brand') || '');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);

  // Fetch data
  const { data: products, isLoading: productsLoading } = useQuery({
    queryKey: ['products'],
    queryFn: productsApi.getAll,
  });

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: categoriesApi.getAll,
  });

  const { data: brands } = useQuery({
    queryKey: ['brands'],
    queryFn: brandsApi.getAll,
  });

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    if (!products) return [];

    let filtered = products.filter((product) => {
      const categoryMatch = !selectedCategory || product.categoryId === selectedCategory;
      const brandMatch = !selectedBrand || product.brandId === selectedBrand;
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      return categoryMatch && brandMatch && priceMatch;
    });

    // Sort products
    filtered.sort((a, b) => {
      let aValue: any = a[sortBy as keyof typeof a];
      let bValue: any = b[sortBy as keyof typeof b];

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [products, selectedCategory, selectedBrand, priceRange, sortBy, sortOrder]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    if (categoryId) {
      searchParams.set('category', categoryId);
    } else {
      searchParams.delete('category');
    }
    setSearchParams(searchParams);
  };

  const handleBrandChange = (brandId: string) => {
    setSelectedBrand(brandId);
    if (brandId) {
      searchParams.set('brand', brandId);
    } else {
      searchParams.delete('brand');
    }
    setSearchParams(searchParams);
  };

  const handleClearFilters = () => {
    setSelectedCategory('');
    setSelectedBrand('');
    setPriceRange([0, 10000]);
    setSearchParams({});
  };

  const handleSortChange = (value: string) => {
    const [field, order] = value.split('-');
    setSortBy(field);
    setSortOrder(order as 'asc' | 'desc');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Ürünler</h1>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-gray-600">
            {filteredAndSortedProducts.length} ürün bulundu
          </p>
          
          <div className="flex items-center gap-4">
            {/* Sort Dropdown */}
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => handleSortChange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="name-asc">İsim (A-Z)</option>
              <option value="name-desc">İsim (Z-A)</option>
              <option value="price-asc">Fiyat (Düşük-Yüksek)</option>
              <option value="price-desc">Fiyat (Yüksek-Düşük)</option>
            </select>

            {/* Mobile Filter Toggle */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden"
            >
              <AdjustmentsHorizontalIcon className="h-4 w-4 mr-2" />
              Filtreler
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <ProductFilters
            categories={categories || []}
            brands={brands || []}
            selectedCategory={selectedCategory}
            selectedBrand={selectedBrand}
            priceRange={priceRange}
            onCategoryChange={handleCategoryChange}
            onBrandChange={handleBrandChange}
            onPriceRangeChange={setPriceRange}
            onClearFilters={handleClearFilters}
          />
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <ProductGrid 
            products={filteredAndSortedProducts} 
            isLoading={productsLoading} 
          />
        </div>
      </div>
    </div>
  );
}