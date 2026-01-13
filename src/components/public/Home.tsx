import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const categories = [
    { name: 'Electronics', icon: '💻', gradient: 'from-blue-500 to-cyan-500' },
    { name: 'Clothing', icon: '👕', gradient: 'from-emerald-500 to-teal-500' },
    { name: 'Home & Garden', icon: '🏡', gradient: 'from-orange-500 to-amber-500' },
    { name: 'Sports', icon: '⚽', gradient: 'from-rose-500 to-red-500' },
  ];

  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
      ),
      title: 'Free Shipping',
      description: 'On orders over $50'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Secure Payment',
      description: '100% secure transactions'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      title: 'Easy Returns',
      description: '30-day return policy'
    }
  ];

  return (
    <div className="space-y-16">
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-30"></div>

        <div className="relative max-w-4xl px-8 py-20 md:px-16 md:py-28">
          <div className="inline-block px-4 py-2 bg-blue-500/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6 border border-blue-400/30">
            Welcome to Modern E-Commerce
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Discover Amazing
            <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Products Today
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-slate-300 max-w-2xl leading-relaxed">
            Shop the latest trends with unbeatable prices and enjoy free shipping on orders over $50
          </p>
          <button
            onClick={() => navigate('/products')}
            className="group bg-white text-slate-900 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 inline-flex items-center gap-2"
          >
            Start Shopping
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </section>

      <section>
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">Shop by Category</h2>
          <p className="text-xl text-slate-600">Find exactly what you're looking for</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.name}
              onClick={() => navigate('/products')}
              className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
              <div className="relative p-8 text-center">
                <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <h3 className="font-semibold text-lg text-slate-900">{category.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-3xl shadow-sm p-8 md:p-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">Why Shop With Us?</h2>
          <p className="text-xl text-slate-600">Your satisfaction is our priority</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-xl mb-2 text-slate-900">{feature.title}</h3>
              <p className="text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-teal-600/20"></div>
        <div className="relative px-8 py-12 md:py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-lg md:text-xl mb-8 text-slate-300 max-w-2xl mx-auto">
            Get the latest deals and exclusive offers delivered straight to your inbox
          </p>
          <div className="flex flex-col sm:flex-row max-w-xl mx-auto gap-3">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-lg"
            />
            <button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
