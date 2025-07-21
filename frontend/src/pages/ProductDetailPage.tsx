import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { productsApi } from '../lib/products';
import { useCart } from '../contexts/CartContext';
import { formatPrice } from '../lib/utils';
import { Button } from '../components/ui/Button';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { 
  ShoppingCartIcon, 
  HeartIcon, 
  StarIcon,
  TruckIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import toast from 'react-hot-toast';

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productsApi.getById(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <LoadingSpinner size="lg" className="py-20" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ürün bulunamadı</h2>
          <p className="text-gray-600 mb-8">Aradığınız ürün mevcut değil veya kaldırılmış olabilir.</p>
          <Button onClick={() => navigate('/products')}>
            Ürünlere Geri Dön
          </Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast.success(`${quantity} adet ürün sepete eklendi!`);
  };

  const handleAddToWishlist = () => {
    toast.success('Ürün favorilere eklendi!');
  };

  const images = [
    product.imageUrl || 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=800',
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex mb-8" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-4">
          <li>
            <button onClick={() => navigate('/')} className="text-gray-500 hover:text-gray-700">
              Ana Sayfa
            </button>
          </li>
          <li>
            <span className="text-gray-500">/</span>
          </li>
          <li>
            <button onClick={() => navigate('/products')} className="text-gray-500 hover:text-gray-700">
              Ürünler
            </button>
          </li>
          <li>
            <span className="text-gray-500">/</span>
          </li>
          <li>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
            <img
              src={images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square overflow-hidden rounded-lg bg-gray-100 border-2 ${
                  selectedImage === index ? 'border-primary-500' : 'border-transparent'
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <StarIconSolid
                    key={i}
                    className={`h-5 w-5 ${
                      i < 4 ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">(24 değerlendirme)</span>
            </div>

            <div className="text-3xl font-bold text-primary-600 mb-4">
              {formatPrice(product.price)}
            </div>

            {product.isFeatured && (
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800 mb-4">
                ⭐ Öne Çıkan Ürün
              </div>
            )}
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Açıklama</h3>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          {/* Stock Status */}
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              product.stockQuantity > 0 ? 'bg-green-500' : 'bg-red-500'
            }`} />
            <span className={`font-medium ${
              product.stockQuantity > 0 ? 'text-green-700' : 'text-red-700'
            }`}>
              {product.stockQuantity > 0 
                ? `Stokta (${product.stockQuantity} adet)` 
                : 'Stokta Yok'
              }
            </span>
          </div>

          {/* Quantity and Add to Cart */}
          {product.stockQuantity > 0 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700">Adet:</label>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-gray-600 hover:text-gray-800"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                    className="px-3 py-2 text-gray-600 hover:text-gray-800"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1"
                  size="lg"
                >
                  <ShoppingCartIcon className="h-5 w-5 mr-2" />
                  Sepete Ekle
                </Button>
                
                <Button
                  onClick={handleAddToWishlist}
                  variant="outline"
                  size="lg"
                >
                  <HeartIcon className="h-5 w-5" />
                </Button>
              </div>
            </div>
          )}

          {/* Features */}
          <div className="border-t border-gray-200 pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <TruckIcon className="h-6 w-6 text-primary-600" />
                <div>
                  <div className="font-medium text-gray-900">Ücretsiz Kargo</div>
                  <div className="text-sm text-gray-600">500 TL üzeri</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <ShieldCheckIcon className="h-6 w-6 text-primary-600" />
                <div>
                  <div className="font-medium text-gray-900">Güvenli Ödeme</div>
                  <div className="text-sm text-gray-600">SSL korumalı</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}