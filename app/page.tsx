import { Suspense } from 'react'
import Header from '@/components/Header'
import HeroSlider from '@/components/HeroSlider'
import ArticleGrid from '@/components/ArticleGrid'
import ClassifiedsSection from '@/components/ClassifiedsSection'
import SidebarAds from '@/components/SidebarAds'
import Newsletter from '@/components/Newsletter'
import Footer from '@/components/Footer'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      
      {/* Hero Advertising Slider */}
      <section className="w-full">
        <Suspense fallback={<LoadingSpinner />}>
          <HeroSlider />
        </Suspense>
      </section>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Latest Articles */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  📰 Najnowsze Aktualności
                </h2>
                <a 
                  href="/articles" 
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Zobacz wszystkie →
                </a>
              </div>
              <Suspense fallback={<LoadingSpinner />}>
                <ArticleGrid limit={6} />
              </Suspense>
            </section>

            {/* Featured Classifieds */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  🏷️ Wyróżnione Ogłoszenia
                </h2>
                <a 
                  href="/classifieds" 
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Wszystkie ogłoszenia →
                </a>
              </div>
              <Suspense fallback={<LoadingSpinner />}>
                <ClassifiedsSection featured={true} limit={8} />
              </Suspense>
            </section>

            {/* Newsletter Signup */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <Newsletter />
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Sidebar Advertisements */}
            <Suspense fallback={<LoadingSpinner />}>
              <SidebarAds />
            </Suspense>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">
                🚀 Szybkie Akcje
              </h3>
              <div className="space-y-3">
                <a
                  href="/classifieds/create"
                  className="block w-full bg-primary-600 text-white text-center py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  + Dodaj Ogłoszenie
                </a>
                <a
                  href="/contact"
                  className="block w-full bg-gray-100 text-gray-700 text-center py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  📞 Kontakt
                </a>
                <a
                  href="/advertise"
                  className="block w-full bg-accent-100 text-accent-700 text-center py-2 px-4 rounded-lg hover:bg-accent-200 transition-colors"
                >
                  📈 Reklamuj się
                </a>
              </div>
            </div>

            {/* Popular Categories */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">
                📊 Popularne Kategorie
              </h3>
              <div className="space-y-2">
                <a href="/classifieds/category/motoryzacja" className="flex items-center justify-between text-sm hover:text-primary-600">
                  <span>🚗 Motoryzacja</span>
                  <span className="text-gray-400">234</span>
                </a>
                <a href="/classifieds/category/nieruchomosci" className="flex items-center justify-between text-sm hover:text-primary-600">
                  <span>🏠 Nieruchomości</span>
                  <span className="text-gray-400">187</span>
                </a>
                <a href="/classifieds/category/praca" className="flex items-center justify-between text-sm hover:text-primary-600">
                  <span>💼 Praca</span>
                  <span className="text-gray-400">156</span>
                </a>
                <a href="/classifieds/category/elektronika" className="flex items-center justify-between text-sm hover:text-primary-600">
                  <span>📱 Elektronika</span>
                  <span className="text-gray-400">98</span>
                </a>
                <a href="/classifieds/category/uslugi" className="flex items-center justify-between text-sm hover:text-primary-600">
                  <span>🔧 Usługi</span>
                  <span className="text-gray-400">76</span>
                </a>
              </div>
            </div>

            {/* Local Weather Widget */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">
                🌤️ Pogoda Lokalna
              </h3>
              <div className="text-center">
                <div className="text-3xl mb-2">☀️</div>
                <div className="text-xl font-semibold">22°C</div>
                <div className="text-sm text-gray-600">Słonecznie</div>
                <div className="text-xs text-gray-500 mt-2">
                  Warszawa, Mazowieckie
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Ad Section */}
      <section className="bg-white border-t border-gray-200 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg text-center">
              <h3 className="text-lg font-semibold mb-2">Reklama Partner A</h3>
              <p className="text-sm opacity-90">Najlepsze usługi w mieście</p>
              <button className="mt-3 bg-white text-blue-600 px-4 py-2 rounded text-sm font-medium hover:bg-gray-100">
                Dowiedz się więcej
              </button>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-6 rounded-lg text-center">
              <h3 className="text-lg font-semibold mb-2">Reklama Partner B</h3>
              <p className="text-sm opacity-90">Promocja tylko dziś!</p>
              <button className="mt-3 bg-white text-green-600 px-4 py-2 rounded text-sm font-medium hover:bg-gray-100">
                Sprawdź ofertę
              </button>
            </div>
            <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-6 rounded-lg text-center">
              <h3 className="text-lg font-semibold mb-2">Reklama Partner C</h3>
              <p className="text-sm opacity-90">Najniższe ceny w regionie</p>
              <button className="mt-3 bg-white text-orange-600 px-4 py-2 rounded text-sm font-medium hover:bg-gray-100">
                Zamów teraz
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
