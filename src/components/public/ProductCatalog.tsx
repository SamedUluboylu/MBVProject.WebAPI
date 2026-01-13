import React, { useEffect, useState } from 'react';
import { publicApi, PublicProduct } from '../../services/publicApi';
import { useCart } from '../../contexts/CartContext';

const ProductCatalog: React.FC = () => {
  const [products, setProducts] = useState<PublicProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const { addToCart } = useCart();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const result = await publicApi.products.getCatalog({
        pageNumber: currentPage,
        pageSize: 12,
        searchTerm: searchTerm || undefined,
        inStockOnly: true,
      });
      setProducts(result.items);
      setTotalPages(result.totalPages);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage, searchTerm]);

  const handleAddToCart = (product: PublicProduct) => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-64">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <div className="text-xl text-slate-600 font-medium">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
          Shop Our Products
        </h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-2xl px-6 py-4 pl-12 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
          />
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
          <svg className="w-24 h-24 mx-auto text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <p className="text-2xl text-slate-500 font-medium">No products found</p>
          <p className="text-slate-400 mt-2">Try adjusting your search criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 group-hover:scale-110 transition-transform duration-300"></div>
                {product.discountPercentage && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-rose-600 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-lg z-10">
                    -{product.discountPercentage}%
                  </div>
                )}
              </div>

              <div className="p-5">
                <h3 className="font-semibold text-lg mb-2 text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>

                {product.shortDescription && (
                  <p className="text-sm text-slate-600 mb-3 line-clamp-2 leading-relaxed">
                    {product.shortDescription}
                  </p>
                )}

                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                      ${product.price.toFixed(2)}
                    </div>
                    {product.compareAtPrice && (
                      <div className="text-sm text-slate-400 line-through">
                        ${product.compareAtPrice.toFixed(2)}
                      </div>
                    )}
                  </div>
                </div>

                {product.averageRating && (
                  <div className="flex items-center mb-4 text-sm">
                    <div className="flex items-center bg-amber-50 px-2 py-1 rounded-lg">
                      <svg className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                      <span className="ml-1 font-semibold text-slate-700">{product.averageRating.toFixed(1)}</span>
                      <span className="text-slate-500 ml-1">({product.reviewCount})</span>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={!product.inStock}
                  className={`w-full py-3 rounded-xl font-semibold transition-all duration-200 ${
                    product.inStock
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700 shadow-sm hover:shadow-md hover:scale-105'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-3 bg-white rounded-2xl shadow-sm p-6">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-6 py-3 border-2 border-slate-200 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:border-blue-500 hover:text-blue-600 transition-all font-medium"
          >
            Previous
          </button>
          <div className="flex items-center space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-12 h-12 rounded-xl font-semibold transition-all ${
                  currentPage === page
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-6 py-3 border-2 border-slate-200 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:border-blue-500 hover:text-blue-600 transition-all font-medium"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCatalog;
