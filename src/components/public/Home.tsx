import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const categories = [
    { name: 'Electronics', icon: '💻' },
    { name: 'Clothing', icon: '👕' },
    { name: 'Home & Garden', icon: '🏡' },
    { name: 'Sports', icon: '⚽' },
  ];

  return (
    <div>
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg p-12 mb-12">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-bold mb-4">Welcome to E-Shop</h1>
          <p className="text-xl mb-8 text-blue-100">
            Discover amazing products at unbeatable prices. Shop now and enjoy free shipping on orders over $50!
          </p>
          <button
            onClick={() => navigate('/products')}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium text-lg hover:bg-blue-50 transition"
          >
            Shop Now
          </button>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.name}
              onClick={() => navigate('/products')}
              className="bg-white rounded-lg shadow p-6 text-center cursor-pointer hover:shadow-lg transition"
            >
              <div className="text-5xl mb-3">{category.icon}</div>
              <h3 className="font-semibold">{category.name}</h3>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-8 mb-12">
        <h2 className="text-3xl font-bold mb-6">Why Shop With Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl mb-3">🚚</div>
            <h3 className="font-semibold text-lg mb-2">Free Shipping</h3>
            <p className="text-gray-600">On orders over $50</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🔒</div>
            <h3 className="font-semibold text-lg mb-2">Secure Payment</h3>
            <p className="text-gray-600">100% secure transactions</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">↩️</div>
            <h3 className="font-semibold text-lg mb-2">Easy Returns</h3>
            <p className="text-gray-600">30-day return policy</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
        <p className="mb-6">Get the latest deals and exclusive offers delivered to your inbox!</p>
        <div className="flex max-w-md mx-auto gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-lg text-gray-900"
          />
          <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
