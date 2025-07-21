import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { formatPrice } from '../lib/utils';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { TrashIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';

export function CartPage() {
  const { items, total, updateQuantity, removeItem, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login?redirect=/checkout');
      return;
    }
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Sepetiniz Boş</h2>
          <p className="text-gray-600 mb-8">Henüz sepetinize ürün eklemediniz.</p>
          <Button asChild>
            <Link to="/products">Alışverişe Başla</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Sepetim</h1>
        <div className="flex justify-between items-center">
          <p className="text-gray-600">{items.length} ürün</p>
          <Button
            variant="outline"
            onClick={clearCart}
            className="text-red-600 border-red-600 hover:bg-red-50"
          >
            Sepeti Temizle
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={item.product.id}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.product.imageUrl || 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=200'}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      <Link 
                        to={`/products/${item.product.id}`}
                        className="hover:text-primary-600"
                      >
                        {item.product.name}
                      </Link>
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      {item.product.description.substring(0, 100)}...
                    </p>
                    <div className="text-lg font-bold text-primary-600">
                      {formatPrice(item.product.price)}
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    {/* Quantity Controls */}
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-2 text-gray-600 hover:text-gray-800"
                      >
                        <MinusIcon className="h-4 w-4" />
                      </button>
                      <span className="px-4 py-2 border-x border-gray-300 min-w-[3rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-2 text-gray-600 hover:text-gray-800"
                        disabled={item.quantity >= item.product.stockQuantity}
                      >
                        <PlusIcon className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="p-2 text-red-600 hover:text-red-800"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
                  <span>Birim Fiyat: {formatPrice(item.product.price)}</span>
                  <span className="font-semibold text-gray-900">
                    Toplam: {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Sipariş Özeti</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Ara Toplam</span>
                <span>{formatPrice(total)}</span>
              </div>
              
              <div className="flex justify-between">
                <span>Kargo</span>
                <span className="text-green-600">
                  {total >= 500 ? 'Ücretsiz' : formatPrice(29.99)}
                </span>
              </div>
              
              {total < 500 && (
                <div className="text-sm text-gray-600 bg-yellow-50 p-3 rounded-md">
                  <strong>{formatPrice(500 - total)}</strong> daha alışveriş yapın, 
                  kargo ücretsiz olsun!
                </div>
              )}
              
              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Toplam</span>
                  <span className="text-primary-600">
                    {formatPrice(total + (total >= 500 ? 0 : 29.99))}
                  </span>
                </div>
              </div>
              
              <Button 
                onClick={handleCheckout}
                className="w-full"
                size="lg"
              >
                Ödemeye Geç
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full"
                asChild
              >
                <Link to="/products">Alışverişe Devam Et</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}