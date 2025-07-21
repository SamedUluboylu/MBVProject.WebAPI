import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../lib/products';
import { useCart } from '../../contexts/CartContext';
import { formatPrice } from '../../lib/utils';
import { Button } from '../ui/Button';
import { ShoppingCartIcon, HeartIcon } from '@heroicons/react/24/outline';
import { Card, CardContent } from '../ui/Card';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast.success('Ürün sepete eklendi!');
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast.success('Ürün favorilere eklendi!');
  };

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300">
      <Link to={`/products/${product.id}`}>
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={product.imageUrl || 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=400'}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {product.isFeatured && (
            <div className="absolute top-2 left-2 bg-primary-600 text-white px-2 py-1 rounded-md text-xs font-medium">
              Öne Çıkan
            </div>
          )}
          
          {product.stockQuantity === 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-medium">Stokta Yok</span>
            </div>
          )}

          <button
            onClick={handleAddToWishlist}
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-50"
          >
            <HeartIcon className="h-4 w-4 text-gray-600" />
          </button>
        </div>

        <CardContent className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
            {product.name}
          </h3>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center justify-between mb-3">
            <span className="text-lg font-bold text-primary-600">
              {formatPrice(product.price)}
            </span>
            
            <span className="text-sm text-gray-500">
              Stok: {product.stockQuantity}
            </span>
          </div>

          <Button
            onClick={handleAddToCart}
            disabled={product.stockQuantity === 0}
            className="w-full"
            size="sm"
          >
            <ShoppingCartIcon className="h-4 w-4 mr-2" />
            Sepete Ekle
          </Button>
        </CardContent>
      </Link>
    </Card>
  );
}