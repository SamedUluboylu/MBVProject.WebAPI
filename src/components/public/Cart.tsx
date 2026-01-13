import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';

const Cart: React.FC = () => {
  const { items, removeFromCart, updateQuantity, totalAmount, clearCart } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-6">Add some products to get started!</p>
        <button
          onClick={() => navigate('/products')}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            {items.map((item) => (
              <div key={item.productId} className="flex items-center border-b p-4">
                <div className="w-20 h-20 bg-gray-200 rounded"></div>
                <div className="flex-1 ml-4">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border rounded">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="px-3 py-1 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="px-4 py-1">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="px-3 py-1 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                  <div className="font-semibold w-24 text-right">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={clearCart}
            className="mt-4 text-red-600 hover:text-red-800 text-sm"
          >
            Clear Cart
          </button>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>$0.00</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium"
            >
              Proceed to Checkout
            </button>
            <button
              onClick={() => navigate('/products')}
              className="w-full mt-2 border border-gray-300 py-3 rounded-lg hover:bg-gray-50"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
