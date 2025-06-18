'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { MapPin, Calendar, Eye, Heart, Star } from 'lucide-react'
import { Classified } from '@/types'

interface ClassifiedsSectionProps {
  limit?: number
  category?: string
  featured?: boolean
}

// Mock data - w produkcji będzie pobierane z Firebase
const mockClassifieds: Classified[] = [
  {
    id: "1",
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
    id: "2",
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
  },
  {
    id: "3",
    title: "Laptop Dell XPS 13 - stan idealny",
    description: "Sprzedam laptopa Dell XPS 13, stan idealny, używany tylko do pracy biurowej.",
    price: 4500,
    currency: "PLN",
    category: {
      id: "3",
      name: "Elektronika",
      slug: "elektronika",
      color: "bg-purple-500",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    subcategory: "Laptopy",
    location: {
      city: "Gdańsk",
      region: "Pomorskie"
    },
    images: ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop"],
    contact: {
      name: "Marek Wiśniewski",
      phone: "+48 555 123 456"
    },
    features: {
      condition: "used",
      brand: "Dell",
      model: "XPS 13"
    },
    status: "active",
    featured: false,
    premium: false,
    views: 230,
    favorites: 8,
    createdAt: new Date('2024-01-13'),
    updatedAt: new Date('2024-01-13'),
    expiresAt: new Date('2024-03-13'),
    userId: "user3"
  },
  {
    id: "4",
    title: "Usługi remontowe - malowanie, gładzie",
    description: "Profesjonalne usługi malarskie i wykończeniowe. Wieloletnie doświadczenie, konkurencyjne ceny.",
    price: 50,
    currency: "PLN",
    category: {
      id: "4",
      name: "Usługi",
      slug: "uslugi",
      color: "bg-orange-500",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    subcategory: "Remonty",
    location: {
      city: "Wrocław",
      region: "Dolnośląskie"
    },
    images: ["https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400&h=300&fit=crop"],
    contact: {
      name: "Firma RemBud",
      phone: "+48 777 888 999",
      email: "kontakt@rembud.pl"
    },
    features: {
      condition: "new"
    },
    status: "active",
    featured: true,
    premium: false,
    views: 125,
    favorites: 3,
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-12'),
    expiresAt: new Date('2024-04-12'),
    userId: "user4"
  }
]

export default function ClassifiedsSection({ limit = 8, category, featured }: ClassifiedsSectionProps) {
  const [classifieds, setClassifieds] = useState<Classified[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchClassifieds = async () => {
      setLoading(true)
      
      let filteredClassifieds = mockClassifieds
      
      if (featured) {
        filteredClassifieds = filteredClassifieds.filter(classified => classified.featured)
      }
      
      if (category) {
        filteredClassifieds = filteredClassifieds.filter(classified => classified.category.slug === category)
      }
      
      const limitedClassifieds = filteredClassifieds.slice(0, limit)
      
      setTimeout(() => {
        setClassifieds(limitedClassifieds)
        setLoading(false)
      }, 500)
    }

    fetchClassifieds()
  }, [limit, category, featured])

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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {classifieds.map((classified) => (
        <div key={classified.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
          {/* Image */}
          <div className="relative">
            <img
              src={classified.images[0]}
              alt={classified.title}
              className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
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
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-3">
            {/* Title */}
            <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
              <Link href={`/classifieds/${classified.id}`}>
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
                {formatDate(classified.createdAt)}
              </div>
            </div>

            {/* Features */}
            {classified.features.brand && (
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
    </div>
  )
}
