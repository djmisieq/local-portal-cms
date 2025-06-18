'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Menu, X, User, Plus, Bell } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-gray-100 border-b border-gray-200">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4 text-gray-600">
              <span>📍 Warszawa, Mazowieckie</span>
              <span>📞 +48 123 456 789</span>
              <span>📧 kontakt@portal-lokalny.pl</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/auth/login" className="text-gray-600 hover:text-primary-600 flex items-center">
                <User className="w-4 h-4 mr-1" />
                Zaloguj się
              </Link>
              <Link href="/auth/register" className="bg-primary-600 text-white px-3 py-1 rounded text-xs hover:bg-primary-700">
                Załóż konto
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="bg-primary-600 text-white p-2 rounded-lg mr-3">
              <span className="text-xl font-bold">PL</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Portal Lokalny</h1>
              <p className="text-sm text-gray-600">Twoja społeczność online</p>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="flex w-full">
              <input
                type="text"
                placeholder="Szukaj artykułów, ogłoszeń..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="bg-primary-600 text-white px-4 py-2 rounded-r-lg hover:bg-primary-700 transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
            </form>
          </div>

          {/* Quick Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="/classifieds/create"
              className="bg-accent-600 text-white px-4 py-2 rounded-lg hover:bg-accent-700 transition-colors flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Dodaj Ogłoszenie
            </Link>
            <button className="relative text-gray-600 hover:text-primary-600">
              <Bell className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-gray-600 hover:text-primary-600"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <form onSubmit={handleSearch} className="flex">
            <input
              type="text"
              placeholder="Szukaj..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="bg-primary-600 text-white px-4 py-2 rounded-r-lg hover:bg-primary-700 transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-primary-600 text-white">
        <div className="container mx-auto px-4">
          <div className="hidden lg:flex items-center space-x-8 py-3">
            <Link href="/" className="hover:text-primary-200 transition-colors">
              🏠 Strona Główna
            </Link>
            <Link href="/articles" className="hover:text-primary-200 transition-colors">
              📰 Aktualności
            </Link>
            <Link href="/classifieds" className="hover:text-primary-200 transition-colors">
              🏷️ Ogłoszenia
            </Link>
            <Link href="/business" className="hover:text-primary-200 transition-colors">
              💼 Biznes
            </Link>
            <Link href="/events" className="hover:text-primary-200 transition-colors">
              📅 Wydarzenia
            </Link>
            <Link href="/directory" className="hover:text-primary-200 transition-colors">
              📋 Katalog Firm
            </Link>
            <Link href="/contact" className="hover:text-primary-200 transition-colors">
              📞 Kontakt
            </Link>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t border-primary-500">
              <div className="flex flex-col space-y-2">
                <Link href="/" className="block py-2 hover:text-primary-200 transition-colors">
                  🏠 Strona Główna
                </Link>
                <Link href="/articles" className="block py-2 hover:text-primary-200 transition-colors">
                  📰 Aktualności
                </Link>
                <Link href="/classifieds" className="block py-2 hover:text-primary-200 transition-colors">
                  🏷️ Ogłoszenia
                </Link>
                <Link href="/business" className="block py-2 hover:text-primary-200 transition-colors">
                  💼 Biznes
                </Link>
                <Link href="/events" className="block py-2 hover:text-primary-200 transition-colors">
                  📅 Wydarzenia
                </Link>
                <Link href="/directory" className="block py-2 hover:text-primary-200 transition-colors">
                  📋 Katalog Firm
                </Link>
                <Link href="/contact" className="block py-2 hover:text-primary-200 transition-colors">
                  📞 Kontakt
                </Link>
                <div className="border-t border-primary-500 pt-4 mt-4">
                  <Link
                    href="/classifieds/create"
                    className="block bg-accent-600 text-white text-center py-2 px-4 rounded-lg hover:bg-accent-700 transition-colors"
                  >
                    + Dodaj Ogłoszenie
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}
