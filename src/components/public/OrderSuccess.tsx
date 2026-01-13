import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrderSuccess: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center py-16">
      <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h1 className="text-4xl font-bold mb-4">Order Placed Successfully!</h1>
      <p className="text-gray-600 mb-8 text-lg">
        Thank you for your order. We'll send you a confirmation email shortly.
      </p>

      <div className="flex gap-4 justify-center">
        <button
          onClick={() => navigate('/profile')}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-medium"
        >
          View Orders
        </button>
        <button
          onClick={() => navigate('/products')}
          className="border-2 border-gray-300 px-8 py-3 rounded-lg hover:bg-gray-50 font-medium"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;
