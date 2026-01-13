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
      <div className="flex justify-center items-center h-64">
        <div className="text-xl">Loading products...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Shop Our Products</h1>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 border rounded-lg"
        />
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">No products found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow hover:shadow-lg transition">
              <div className="aspect-square bg-gray-200 rounded-t-lg"></div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                {product.shortDescription && (
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                    {product.shortDescription}
                  </p>
                )}
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-xl font-bold text-blue-600">
                      ${product.price.toFixed(2)}
                    </div>
                    {product.compareAtPrice && (
                      <div className="text-sm text-gray-500 line-through">
                        ${product.compareAtPrice.toFixed(2)}
                      </div>
                    )}
                  </div>
                  {product.discountPercentage && (
                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                      -{product.discountPercentage}%
                    </span>
                  )}
                </div>
                {product.averageRating && (
                  <div className="flex items-center mb-3 text-sm">
                    <span className="text-yellow-500">★</span>
                    <span className="ml-1">{product.averageRating.toFixed(1)}</span>
                    <span className="text-gray-500 ml-1">({product.reviewCount})</span>
                  </div>
                )}
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={!product.inStock}
                  className={`w-full py-2 rounded font-medium ${
                    product.inStock
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
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
        <div className="flex justify-center mt-8 space-x-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded disabled:opacity-50 hover:bg-gray-50"
          >
            Previous
          </button>
          <span className="px-4 py-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded disabled:opacity-50 hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCatalog;
