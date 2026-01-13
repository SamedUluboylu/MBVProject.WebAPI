import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { publicApi, PublicProduct } from '../../services/publicApi';

const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<PublicProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const result = await publicApi.products.getCatalog({
          searchTerm: slug,
          pageSize: 1,
        });
        if (result.items.length > 0) {
          setProduct(result.items[0]);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity,
      });
      navigate('/cart');
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh]">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <div className="text-xl text-slate-600 font-medium">Loading product details...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-slate-200">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-4">
          <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold mb-3 text-slate-900">Product Not Found</h1>
        <p className="text-slate-600 mb-6">The product you're looking for doesn't exist</p>
        <button
          onClick={() => navigate('/products')}
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate('/products')}
        className="inline-flex items-center text-slate-600 hover:text-blue-600 font-medium transition-colors group"
      >
        <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Products
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 aspect-square rounded-2xl flex items-center justify-center border border-slate-200 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5"></div>
          <svg className="w-32 h-32 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          {product.discountPercentage && (
            <div className="absolute top-6 right-6 bg-gradient-to-r from-red-500 to-rose-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
              -{product.discountPercentage}% OFF
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            {product.categoryName && (
              <span className="inline-block text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-lg mb-3">
                {product.categoryName}
              </span>
            )}
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">{product.name}</h1>
            {product.brandName && (
              <p className="text-slate-600 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                {product.brandName}
              </p>
            )}
          </div>

          {product.averageRating && (
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-amber-50 px-3 py-2 rounded-xl border border-amber-200">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-5 h-5 ${
                      star <= (product.averageRating || 0)
                        ? 'text-amber-400 fill-current'
                        : 'text-slate-300 fill-current'
                    }`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                  </svg>
                ))}
                <span className="ml-2 font-bold text-slate-700">{product.averageRating.toFixed(1)}</span>
              </div>
              <span className="text-slate-600">
                {product.reviewCount} {product.reviewCount === 1 ? 'review' : 'reviews'}
              </span>
            </div>
          )}

          <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-2xl p-6">
            <div className="flex items-baseline gap-4 mb-3">
              <div className="text-4xl font-bold text-slate-900">
                ${product.price.toFixed(2)}
              </div>
              {product.compareAtPrice && (
                <div className="flex items-center gap-2">
                  <span className="text-xl text-slate-400 line-through">
                    ${product.compareAtPrice.toFixed(2)}
                  </span>
                  {product.discountPercentage && (
                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded-lg text-sm font-bold">
                      Save {product.discountPercentage}%
                    </span>
                  )}
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold ${
                  product.inStock
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></span>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
          </div>

          {product.shortDescription && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-3 text-slate-900 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Description
              </h3>
              <p className="text-slate-700 leading-relaxed">{product.shortDescription}</p>
            </div>
          )}

          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6">
            <div className="flex items-center gap-4">
              <label className="font-semibold text-slate-900">Quantity:</label>
              <div className="flex items-center border-2 border-slate-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-5 py-3 hover:bg-slate-100 transition-colors font-semibold text-slate-700"
                >
                  −
                </button>
                <span className="px-6 py-3 border-x-2 border-slate-200 font-bold text-slate-900 min-w-[4rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-5 py-3 hover:bg-slate-100 transition-colors font-semibold text-slate-700"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex-1 py-4 rounded-xl font-bold text-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                  product.inStock
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700 shadow-lg hover:shadow-xl hover:-translate-y-0.5'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
