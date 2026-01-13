import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const categories = [
    {
      name: 'Elektronik',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'Giyim',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      color: 'from-green-500 to-green-600'
    },
    {
      name: 'Ev & Bahçe',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      color: 'from-orange-500 to-orange-600'
    },
    {
      name: 'Spor',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'from-red-500 to-red-600'
    },
  ];

  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
      ),
      title: 'Ücretsiz Kargo',
      description: '500₺ üzeri'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Güvenli Ödeme',
      description: '100% güvenli'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      title: 'Kolay İade',
      description: '30 gün garanti'
    }
  ];

  return (
    <div className="space-y-8">
      <section className="relative bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-600/10"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-20"></div>

        <div className="relative px-6 py-16 sm:px-8 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <div className="inline-block px-3 py-1 bg-blue-500/20 backdrop-blur-sm rounded-full text-xs font-medium mb-4 border border-blue-400/20">
              Modern E-Ticaret
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Harika Ürünleri
              <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Bugün Keşfedin
              </span>
            </h1>
            <p className="text-base sm:text-lg mb-6 text-slate-300">
              En yeni trendleri uygun fiyatlarla alışveriş yapın
            </p>
            <button
              onClick={() => navigate('/products')}
              className="group bg-white text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2"
            >
              Alışverişe Başla
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      <section>
        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-1 text-slate-900">Kategoriler</h2>
          <p className="text-sm text-slate-600">Aradığınızı kolayca bulun</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => navigate('/products')}
              className="group bg-white rounded-lg p-4 transition-all duration-300 border border-slate-200 hover:border-slate-300 hover:shadow-lg"
            >
              <div className="flex flex-col items-center gap-2">
                <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${category.color} text-white flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  {category.icon}
                </div>
                <h3 className="font-semibold text-sm text-slate-900">{category.name}</h3>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-br from-slate-50 to-white rounded-xl p-6 sm:p-8 border border-slate-200">
        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-1 text-slate-900">Neden Biz?</h2>
          <p className="text-sm text-slate-600">Memnuniyetiniz önceliğimiz</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-lg mb-3 shadow-lg">
                {feature.icon}
              </div>
              <h3 className="font-bold text-sm mb-1 text-slate-900">{feature.title}</h3>
              <p className="text-slate-600 text-xs">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-xl overflow-hidden">
        <div className="px-6 py-10 sm:py-12 text-center">
          <h2 className="text-xl sm:text-2xl font-bold mb-2">Bültenimize Abone Olun</h2>
          <p className="text-sm mb-6 text-slate-300 max-w-xl mx-auto">
            En son fırsatları ve özel teklifleri doğrudan gelen kutunuza alın
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-2">
            <input
              type="email"
              placeholder="E-posta adresiniz"
              className="flex-1 px-4 py-2.5 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
            />
            <button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-5 py-2.5 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg text-sm whitespace-nowrap">
              Abone Ol
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
