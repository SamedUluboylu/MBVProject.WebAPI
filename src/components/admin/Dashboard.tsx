import React from 'react';

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Toplam Satış',
      value: '₺125,430',
      change: '+12.5%',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bgColor: 'bg-gradient-to-br from-blue-500 to-blue-600',
    },
    {
      title: 'Toplam Sipariş',
      value: '356',
      change: '+8.2%',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      bgColor: 'bg-gradient-to-br from-green-500 to-green-600',
    },
    {
      title: 'Toplam Müşteri',
      value: '1,245',
      change: '+15.3%',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      bgColor: 'bg-gradient-to-br from-amber-500 to-amber-600',
    },
    {
      title: 'Aktif Ürünler',
      value: '89',
      change: '+4.7%',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      bgColor: 'bg-gradient-to-br from-cyan-500 to-cyan-600',
    },
  ];

  const recentOrders = [
    { id: '#ORD-001', customer: 'Ahmet Yılmaz', total: '₺450', status: 'Tamamlandı', date: '2 saat önce' },
    { id: '#ORD-002', customer: 'Ayşe Kara', total: '₺890', status: 'İşleniyor', date: '5 saat önce' },
    { id: '#ORD-003', customer: 'Mehmet Demir', total: '₺1,250', status: 'Kargoda', date: '1 gün önce' },
    { id: '#ORD-004', customer: 'Fatma Şahin', total: '₺320', status: 'Tamamlandı', date: '1 gün önce' },
    { id: '#ORD-005', customer: 'Ali Çelik', total: '₺675', status: 'İşleniyor', date: '2 gün önce' },
  ];

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'Tamamlandı': 'bg-green-100 text-green-700',
      'İşleniyor': 'bg-amber-100 text-amber-700',
      'Kargoda': 'bg-blue-100 text-blue-700',
    };
    return colors[status] || 'bg-slate-100 text-slate-700';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Dashboard</h1>
        <p className="text-slate-600">Mağazanızın genel durumu</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className={`${stat.bgColor} p-6 text-white`}>
              <div className="flex items-center justify-between mb-4">
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                  {stat.icon}
                </div>
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
                  {stat.change}
                </span>
              </div>
              <div className="space-y-1">
                <p className="text-white/80 text-sm font-medium">{stat.title}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Satış Trendi</h2>
          <div className="h-64 flex items-center justify-center text-slate-400">
            <div className="text-center">
              <svg className="w-16 h-16 mx-auto mb-2 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <p className="text-sm">Grafik verisi yükleniyor...</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-900">Son Siparişler</h2>
            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
              Tümünü Gör
            </button>
          </div>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-bold text-slate-900">{order.id}</span>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">{order.customer}</p>
                  <p className="text-xs text-slate-400">{order.date}</p>
                </div>
                <span className="font-bold text-slate-900">{order.total}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-200 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Hızlı İşlemler</h2>
            <p className="text-slate-600">En çok kullanılan özelliklere hızlı erişim</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <button className="flex flex-col items-center gap-3 p-6 bg-white border-2 border-slate-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group">
            <div className="p-3 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-colors">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <span className="font-semibold text-slate-900">Yeni Ürün</span>
          </button>
          <button className="flex flex-col items-center gap-3 p-6 bg-white border-2 border-slate-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all group">
            <div className="p-3 bg-green-100 rounded-xl group-hover:bg-green-200 transition-colors">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <span className="font-semibold text-slate-900">Siparişler</span>
          </button>
          <button className="flex flex-col items-center gap-3 p-6 bg-white border-2 border-slate-200 rounded-xl hover:border-amber-500 hover:bg-amber-50 transition-all group">
            <div className="p-3 bg-amber-100 rounded-xl group-hover:bg-amber-200 transition-colors">
              <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <span className="font-semibold text-slate-900">Kategoriler</span>
          </button>
          <button className="flex flex-col items-center gap-3 p-6 bg-white border-2 border-slate-200 rounded-xl hover:border-cyan-500 hover:bg-cyan-50 transition-all group">
            <div className="p-3 bg-cyan-100 rounded-xl group-hover:bg-cyan-200 transition-colors">
              <svg className="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <span className="font-semibold text-slate-900">Raporlar</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
