import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { productsApi } from '../lib/products';
import { categoriesApi } from '../lib/categories';
import { ProductGrid } from '../components/products/ProductGrid';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { 
  TruckIcon, 
  ShieldCheckIcon, 
  CreditCardIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

export function HomePage() {
  const { data: featuredProducts, isLoading: productsLoading } = useQuery({
    queryKey: ['products', 'featured'],
    queryFn: productsApi.getFeatured,
  });

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: categoriesApi.getAll,
  });

  const features = [
    {
      icon: TruckIcon,
      title: 'Ücretsiz Kargo',
      description: '500 TL ve üzeri alışverişlerde ücretsiz kargo',
    },
    {
      icon: ShieldCheckIcon,
      title: 'Güvenli Alışveriş',
      description: 'SSL sertifikası ile korumalı ödeme sistemi',
    },
    {
      icon: CreditCardIcon,
      title: 'Kolay Ödeme',
      description: 'Kredi kartı, havale ve kapıda ödeme seçenekleri',
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: '7/24 Destek',
      description: 'Müşteri hizmetlerimiz her zaman yanınızda',
    },
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Modern Alışverişin Yeni Adresi
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Kaliteli ürünler, uygun fiyatlar ve hızlı teslimat
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/products">Ürünleri Keşfet</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-600">
                Kategoriler
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center p-6">
              <CardContent className="p-0">
                <feature.icon className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Categories */}
      {categories && categories.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Kategoriler</h2>
            <p className="text-lg text-gray-600">İhtiyacınız olan her şey burada</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.slice(0, 6).map((category) => (
              <Link
                key={category.id}
                to={`/products?category=${category.id}`}
                className="group"
              >
                <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
                      <span className="text-2xl">📦</span>
                    </div>
                    <h3 className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors">
                      {category.name}
                    </h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Öne Çıkan Ürünler</h2>
          <p className="text-lg text-gray-600">En popüler ve kaliteli ürünlerimiz</p>
        </div>
        
        <ProductGrid products={featuredProducts || []} isLoading={productsLoading} />
        
        {featuredProducts && featuredProducts.length > 0 && (
          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link to="/products">Tüm Ürünleri Gör</Link>
            </Button>
          </div>
        )}
      </section>

      {/* Newsletter */}
      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Kampanyalardan Haberdar Olun
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Yeni ürünler ve özel indirimlerden ilk siz haberdar olun
            </p>
            
            <div className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <Button size="lg">Abone Ol</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}