'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { MapPin, Calendar, Eye, Heart, Star } from 'lucide-react'
import { Classified } from '@/types'
import { classifiedService } from '@/lib/firestore'
import toast from 'react-hot-toast'

interface ClassifiedsSectionProps {
  limit?: number
  category?: string
  featured?: boolean
}

export default function ClassifiedsSection({ limit = 8, category, featured }: ClassifiedsSectionProps) {
  const [classifieds, setClassifieds] = useState<Classified[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Mock data as fallback
  const mockClassifieds: Classified[] = [
    {
      id: "mock-1",
      title: "Sprzedam samochód Toyota Corolla 2020",
      description: "Samochód w bardzo dobrym stanie, pierwszy właściciel, serwisowany w ASO. Przebieg 45000 km.",
      price: 75000,
      currency: "PLN",
      category: {
        id: "1",
        name: "Motoryzacja",
        slug: "motoryzacja",
        color: "bg-blue-500",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      subcategory: "Samochody osobowe",
      location: {
        city: "Warszawa",
        region: "Mazowieckie"
      },
      images: ["https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop"],
      contact: {
        name: "Jan Kowalski",
        phone: "+48 123 456 789",
        email: "jan@example.com"
      },
      features: {
        condition: "used",
        brand: "Toyota",
        model: "Corolla",
        year: 2020
      },
      status: "active",
      featured: true,
      premium: false,
      views: 450,
      favorites: 12,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
      expiresAt: new Date('2024-03-15'),
      userId: "user1"
    },
    {
      id: "mock-2",
      title: "Mieszkanie 3-pokojowe do wynajęcia",
      description: "Komfortowe mieszkanie w centrum miasta, w pełni umeblowane. Dostępne od zaraz.",
      price: 3500,
      currency: "PLN",
      category: {
        id: "2",
        name: "Nieruchomości",
        slug: "nieruchomosci",
        color: "bg-green-500",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      subcategory: "Mieszkania na wynajem",
      location: {
        city: "Kraków",
        region: "Małopolskie"
      },
      images: ["https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop"],
      contact: {
        name: "Anna Nowak",
        phone: "+48 987 654 321",
        email: "anna@example.com"
      },
      features: {
        condition: "new"
      },
      status: "active",
      featured: true,
      premium: true,
      views: 1200,
      favorites: 45,
      createdAt: new Date('2024-01-14'),
      updatedAt: new Date('2024-01-14'),
      expiresAt: new Date('2024-03-14'),
      userId: "user2"
    }
  ]

  useEffect(() => {
    const fetchClassifieds = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const result = await classifiedService.getClassifieds({
          limitCount: limit,
          category,
          featured
        })
        
        if (result.classifieds.length > 0) {
          setClassifieds(result.classifieds)
        } else {
          // Use mock data if no classifieds in Firebase
          setClassifieds(mockClassifieds.slice(0, limit))
        }
      } catch (err) {
        console.error('Error fetching classifieds:', err)
        setError('Nie udało się załadować ogłoszeń')
        toast.error('Błąd podczas ładowania ogłoszeń')
        
        // Fallback to mock data on error
        setClassifieds(mockClassifieds.slice(0, limit))
      } finally {
        setLoading(false)
      }
    }

    fetchClassifieds()
  }, [limit, category, featured])

  const handleClassifiedClick = async (classified: Classified) => {
    try {
      // Track classified view
      await classifiedService.incrementViews(classified.id)
    } catch (err) {
      console.error('Error tracking classified view:', err)
    }
  }

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('pl-PL', {
      style: 'currency',
      currency: currency
    }).format(price)
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pl-PL', {
      month: 'short',
      day: 'numeric'
    }).format(date)
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: limit }).map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
            <div className="h-40 bg-gray-300"></div>
            <div className="p-3">
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-3 bg-gray-300 rounded mb-2 w-2/3"></div>
              <div className="h-4 bg-gray-300 rounded w-1/3"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error && classifieds.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500 mb-4">⚠️ {error}</div>
        <button 
          onClick={() => window.location.reload()}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
        >
          Spróbuj ponownie
        </button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {classifieds.map((classified) => (
        <div key={classified.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
          {/* Image */}
          <div className="relative">
            <img
              src={classified.images[0] || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop'}
              alt={classified.title}
              className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop'
              }}
            />
            
            {/* Badges */}
            <div className="absolute top-2 left-2 flex flex-col space-y-1">
              <span className={`${classified.category.color} text-white px-2 py-1 rounded text-xs font-medium`}>
                {classified.category.name}
              </span>
              {classified.featured && (
                <span className="bg-yellow-500 text-white px-2 py-1 rounded text-xs font-medium">
                  ⭐ Wyróżnione
                </span>
              )}
              {classified.premium && (
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded text-xs font-medium">
                  💎 Premium
                </span>
              )}
            </div>

            {/* Price */}
            <div className="absolute bottom-2 right-2">
              <span className="bg-black/70 text-white px-2 py-1 rounded text-sm font-semibold">
                {formatPrice(classified.price, classified.currency)}
                {classified.category.slug === 'uslugi' && '/h'}
                {classified.category.slug === 'nieruchomosci' && classified.subcategory?.includes('wynajem') && '/mies'}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-3">
            {/* Title */}
            <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
              <Link 
                href={`/classifieds/${classified.id}`}
                onClick={() => handleClassifiedClick(classified)}
              >
                {classified.title}
              </Link>
            </h3>

            {/* Location and Date */}
            <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
              <div className="flex items-center">
                <MapPin className="w-3 h-3 mr-1" />
                {classified.location.city}
              </div>
              <div className="flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                {formatDate(new Date(classified.createdAt))}
              </div>
            </div>

            {/* Features */}
            {(classified.features.brand || classified.features.model) && (
              <div className="text-xs text-gray-600 mb-2">
                {classified.features.brand} {classified.features.model} {classified.features.year}
              </div>
            )}

            {/* Stats */}
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  <Eye className="w-3 h-3 mr-1" />
                  {classified.views}
                </div>
                <div className="flex items-center">
                  <Heart className="w-3 h-3 mr-1" />
                  {classified.favorites}
                </div>
              </div>
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className={`w-3 h-3 ${
                      index < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {/* No classifieds found */}
      {classifieds.length === 0 && !loading && (
        <div className="col-span-full text-center py-8">
          <div className="text-gray-500 mb-4">🏷️ Brak ogłoszeń do wyświetlenia</div>
          <p className="text-sm text-gray-400 mb-4">
            {category ? `Brak ogłoszeń w kategorii "${category}"` : 'Sprawdź ponownie później'}
          </p>
          <Link
            href="/classifieds/create"
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Dodaj pierwsze ogłoszenie
          </Link>
        </div>
      )}
    </div>
  )
}
