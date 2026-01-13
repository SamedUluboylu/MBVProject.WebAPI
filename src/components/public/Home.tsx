import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const categories = [
    {
      name: 'Elektronik',
      icon: (
        <svg className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      color: 'bg-blue-50 text-blue-600 hover:bg-blue-100'
    },
    {
      name: 'Giyim',
      icon: (
        <svg className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      color: 'bg-green-50 text-green-600 hover:bg-green-100'
    },
    {
      name: 'Ev & Bahçe',
      icon: (
        <svg className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      color: 'bg-orange-50 text-orange-600 hover:bg-orange-100'
    },
    {
      name: 'Spor',
      icon: (
        <svg className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'bg-red-50 text-red-600 hover:bg-red-100'
    },
  ];

  const features = [
    {
      icon: (
        <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
      ),
      title: 'Ücretsiz Kargo',
      description: '500 TL üzeri siparişlerde'
    },
    {
      icon: (
        <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Güvenli Ödeme',
      description: '%100 güvenli işlem'
    },
    {
      icon: (
        <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      title: 'Kolay İade',
      description: '30 gün iade garantisi'
    }
  ];

  return (
    <div className="space-y-12 sm:space-y-16 md:space-y-20">
      <section className="relative -mx-4 sm:-mx-6 lg:-mx-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-30"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 lg:py-32">
          <div className="max-w-3xl">
            <div className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-500/20 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 border border-blue-400/30">
              Modern E-Ticaret'e Hoş Geldiniz
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
              Harika Ürünleri
              <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Bugün Keşfedin
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 md:mb-10 text-slate-300 leading-relaxed">
              En yeni trendleri uygun fiyatlarla alışveriş yapın ve 500 TL üzeri siparişlerde ücretsiz kargo keyfini çıkarın
            </p>
            <button
              onClick={() => navigate('/products')}
              className="group bg-white text-slate-900 px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 inline-flex items-center gap-2"
            >
              Alışverişe Başla
              <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      <section>
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 text-slate-900">Kategoriye Göre Alışveriş</h2>
          <p className="text-base sm:text-lg text-slate-600">Aradığınızı kolayca bulun</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => navigate('/products')}
              className={`group relative rounded-xl sm:rounded-2xl p-6 sm:p-8 transition-all duration-300 border-2 border-transparent ${category.color}`}
            >
              <div className="flex flex-col items-center gap-3 sm:gap-4">
                <div className="transform group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <h3 className="font-semibold text-sm sm:text-base md:text-lg">{category.name}</h3>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-br from-slate-50 to-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 border border-slate-200">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 text-slate-900">Neden Bizden Alışveriş Yapmalısınız?</h2>
          <p className="text-base sm:text-lg text-slate-600">Memnuniyetiniz önceliğimiz</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-xl sm:rounded-2xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                {feature.icon}
              </div>
              <h3 className="font-bold text-base sm:text-lg mb-1 sm:mb-2 text-slate-900">{feature.title}</h3>
              <p className="text-slate-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative -mx-4 sm:-mx-6 lg:-mx-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-teal-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Bültenimize Abone Olun</h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-slate-300 max-w-2xl mx-auto">
            En son fırsatları ve özel teklifleri doğrudan gelen kutunuza alın
          </p>
          <div className="flex flex-col sm:flex-row max-w-xl mx-auto gap-3">
            <input
              type="email"
              placeholder="E-posta adresinizi girin"
              className="flex-1 px-4 py-3 sm:px-6 sm:py-4 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-lg text-sm sm:text-base"
            />
            <button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 whitespace-nowrap text-sm sm:text-base">
              Abone Ol
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
