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
      <div className="flex justify-center items-center h-96">
        <div className="text-xl">Loading product...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <button
          onClick={() => navigate('/products')}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={() => navigate('/products')}
        className="mb-6 text-blue-600 hover:text-blue-800 flex items-center"
      >
        ← Back to Products
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-200 aspect-square rounded-lg flex items-center justify-center">
          <span className="text-gray-400 text-4xl">No Image</span>
        </div>

        <div>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

          {product.brandName && (
            <p className="text-gray-600 mb-4">Brand: {product.brandName}</p>
          )}

          <div className="flex items-center gap-4 mb-6">
            <div className="text-3xl font-bold text-blue-600">
              ${product.price.toFixed(2)}
            </div>
            {product.compareAtPrice && (
              <>
                <div className="text-xl text-gray-500 line-through">
                  ${product.compareAtPrice.toFixed(2)}
                </div>
                {product.discountPercentage && (
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                    Save {product.discountPercentage}%
                  </span>
                )}
              </>
            )}
          </div>

          {product.averageRating && (
            <div className="flex items-center gap-2 mb-6">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`text-2xl ${
                      star <= (product.averageRating || 0)
                        ? 'text-yellow-500'
                        : 'text-gray-300'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-gray-600">
                {product.averageRating.toFixed(1)} ({product.reviewCount} reviews)
              </span>
            </div>
          )}

          <div className="mb-6">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                product.inStock
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          {product.shortDescription && (
            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-2">Description</h3>
              <p className="text-gray-700">{product.shortDescription}</p>
            </div>
          )}

          {product.categoryName && (
            <div className="mb-6">
              <span className="text-sm text-gray-600">
                Category: <span className="font-medium">{product.categoryName}</span>
              </span>
            </div>
          )}

          <div className="border-t pt-6">
            <div className="flex items-center gap-4 mb-6">
              <label className="font-medium">Quantity:</label>
              <div className="flex items-center border rounded">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-6 py-2 border-x">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex-1 py-3 rounded-lg font-medium text-lg ${
                  product.inStock
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Add to Cart
              </button>
              <button
                onClick={() => navigate('/cart')}
                className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50"
              >
                View Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
