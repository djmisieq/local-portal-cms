import Link from 'next/link'
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="bg-primary-600 text-white p-2 rounded-lg mr-3">
                <span className="text-xl font-bold">PL</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Portal Lokalny</h3>
                <p className="text-gray-400 text-sm">Twoja społeczność online</p>
              </div>
            </div>
            
            <p className="text-gray-300 text-sm">
              Najlepszy portal lokalny łączący mieszkańców, firmy i instytucje. 
              Aktualne wiadomości, ogłoszenia i wydarzenia z Twojej okolicy.
            </p>

            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-300">
                <MapPin className="w-4 h-4 mr-2" />
                ul. Główna 123, 00-001 Warszawa
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <Phone className="w-4 h-4 mr-2" />
                +48 123 456 789
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <Mail className="w-4 h-4 mr-2" />
                kontakt@portal-lokalny.pl
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Szybkie Linki</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Strona Główna
                </Link>
              </li>
              <li>
                <Link href="/articles" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Aktualności
                </Link>
              </li>
              <li>
                <Link href="/classifieds" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Ogłoszenia
                </Link>
              </li>
              <li>
                <Link href="/business" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Biznes
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Wydarzenia
                </Link>
              </li>
              <li>
                <Link href="/directory" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Katalog Firm
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Kategorie</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/classifieds/category/motoryzacja" className="text-gray-300 hover:text-white transition-colors text-sm">
                  🚗 Motoryzacja
                </Link>
              </li>
              <li>
                <Link href="/classifieds/category/nieruchomosci" className="text-gray-300 hover:text-white transition-colors text-sm">
                  🏠 Nieruchomości
                </Link>
              </li>
              <li>
                <Link href="/classifieds/category/praca" className="text-gray-300 hover:text-white transition-colors text-sm">
                  💼 Praca
                </Link>
              </li>
              <li>
                <Link href="/classifieds/category/elektronika" className="text-gray-300 hover:text-white transition-colors text-sm">
                  📱 Elektronika
                </Link>
              </li>
              <li>
                <Link href="/classifieds/category/uslugi" className="text-gray-300 hover:text-white transition-colors text-sm">
                  🔧 Usługi
                </Link>
              </li>
              <li>
                <Link href="/classifieds/category/dom-ogrod" className="text-gray-300 hover:text-white transition-colors text-sm">
                  🏡 Dom i Ogród
                </Link>
              </li>
              <li>
                <Link href="/classifieds/category/moda" className="text-gray-300 hover:text-white transition-colors text-sm">
                  👕 Moda
                </Link>
              </li>
            </ul>
          </div>

          {/* For Business */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Dla Firm</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/advertise" className="text-gray-300 hover:text-white transition-colors text-sm">
                  📈 Reklamuj się
                </Link>
              </li>
              <li>
                <Link href="/business/pricing" className="text-gray-300 hover:text-white transition-colors text-sm">
                  💰 Cennik reklam
                </Link>
              </li>
              <li>
                <Link href="/business/directory" className="text-gray-300 hover:text-white transition-colors text-sm">
                  📋 Dodaj firmę
                </Link>
              </li>
              <li>
                <Link href="/business/analytics" className="text-gray-300 hover:text-white transition-colors text-sm">
                  📊 Analytics
                </Link>
              </li>
              <li>
                <Link href="/api/docs" className="text-gray-300 hover:text-white transition-colors text-sm">
                  🔧 API
                </Link>
              </li>
            </ul>

            {/* CTA for business */}
            <div className="mt-6 p-4 bg-primary-600 rounded-lg">
              <h5 className="font-semibold mb-2">Masz firmę?</h5>
              <p className="text-sm text-primary-100 mb-3">
                Dotrzij do tysięcy lokalnych klientów
              </p>
              <Link
                href="/advertise"
                className="block bg-white text-primary-600 text-center py-2 px-3 rounded font-medium hover:bg-primary-50 transition-colors text-sm"
              >
                Rozpocznij reklamę
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media & Newsletter */}
      <div className="bg-gray-800 border-t border-gray-700">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            
            {/* Social Media */}
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              <span className="text-gray-300 text-sm">Śledź nas:</span>
              <div className="flex space-x-4">
                <a
                  href="https://facebook.com/portal-lokalny"
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://instagram.com/portal-lokalny"
                  className="text-gray-400 hover:text-pink-500 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://twitter.com/portal-lokalny"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="https://youtube.com/portal-lokalny"
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Newsletter Mini Signup */}
            <div className="flex items-center space-x-3">
              <span className="text-gray-300 text-sm">Newsletter:</span>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Twój email"
                  className="bg-gray-700 text-white px-3 py-2 rounded-l border-none focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm w-48"
                />
                <button className="bg-primary-600 text-white px-4 py-2 rounded-r hover:bg-primary-700 transition-colors text-sm">
                  Zapisz
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-gray-900 border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            
            {/* Copyright */}
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Portal Lokalny. Wszystkie prawa zastrzeżone.
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap items-center space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Polityka Prywatności
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Regulamin
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">
                Cookies
              </Link>
              <Link href="/accessibility" className="text-gray-400 hover:text-white transition-colors">
                Dostępność
              </Link>
              <Link href="/sitemap" className="text-gray-400 hover:text-white transition-colors">
                Mapa Serwisu
              </Link>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-6 pt-6 border-t border-gray-800 text-center">
            <p className="text-gray-500 text-xs">
              Portal Lokalny jest częścią ekosystemu lokalnych serwisów internetowych. 
              Strona wykorzystuje pliki cookies w celu świadczenia usług zgodnie z 
              <Link href="/privacy" className="text-primary-400 hover:underline ml-1">Polityką Prywatności</Link>.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
