import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrderSuccess: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center py-12 sm:py-16 px-4">
      <div className="bg-green-100 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
        <svg className="w-10 h-10 sm:w-12 sm:h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-slate-900">Siparişiniz Başarıyla Oluşturuldu!</h1>
      <p className="text-slate-600 mb-6 sm:mb-8 text-base sm:text-lg max-w-md mx-auto">
        Siparişiniz için teşekkür ederiz. Size kısa süre içinde bir onay e-postası göndereceğiz.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md mx-auto">
        <button
          onClick={() => navigate('/profile')}
          className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 sm:px-8 sm:py-3 rounded-xl hover:from-blue-700 hover:to-cyan-700 font-semibold transition-all shadow-lg hover:shadow-xl"
        >
          Siparişlerim
        </button>
        <button
          onClick={() => navigate('/products')}
          className="flex-1 border-2 border-slate-300 text-slate-700 px-6 py-3 sm:px-8 sm:py-3 rounded-xl hover:bg-slate-50 hover:border-slate-400 font-semibold transition-all"
        >
          Alışverişe Devam Et
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;
