'use client'

import { useState, useEffect } from 'react'
import { ExternalLink, X } from 'lucide-react'
import { Advertisement } from '@/types'
import { advertisementService } from '@/lib/firestore'

export default function SidebarAds() {
  const [ads, setAds] = useState<Advertisement[]>([])
  const [closedAds, setClosedAds] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  // Mock data as fallback
  const mockSidebarAds: Advertisement[] = [
    {
      id: "sidebar-mock-1",
      title: "Najlepszy Bank w Mieście",
      description: "Załóż konto online i odbierz 200 zł premii. Bez ukrytych opłat!",
      imageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=300&h=200&fit=crop",
      linkUrl: "https://example-bank.com",
      position: "sidebar",
      type: "banner",
      status: "active",
      priority: 1,
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-12-31'),
      clicks: 0,
      impressions: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: "sidebar-mock-2", 
      title: "Ubezpieczenia na Auto",
      description: "Porównaj oferty 15 towarzystw ubezpieczeniowych. Znajdź najtańsze OC i AC.",
      imageUrl: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=300&h=150&fit=crop",
      linkUrl: "https://example-insurance.com",
      position: "sidebar",
      type: "banner",
      status: "active",
      priority: 2,
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-12-31'),
      clicks: 0,
      impressions: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: "sidebar-mock-3",
      title: "Promocja: Meble do Domu",
      description: "Nowa kolekcja mebli w super cenach. Dostawa gratis!",
      linkUrl: "https://example-furniture.com",
      position: "sidebar",
      type: "text",
      status: "active",
      priority: 3,
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-12-31'),
      clicks: 0,
      impressions: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]

  useEffect(() => {
    const fetchAds = async () => {
      try {
        setLoading(true)
        
        const firebaseAds = await advertisementService.getAdvertisements('sidebar')
        
        if (firebaseAds.length > 0) {
          // Filter out closed ads
          const activeAds = firebaseAds.filter(ad => !closedAds.includes(ad.id))
          setAds(activeAds)
          
          // Track impressions for sidebar ads
          firebaseAds.forEach(ad => {
            advertisementService.trackImpression(ad.id).catch(err => {
              console.error('Error tracking sidebar ad impression:', err)
            })
          })
        } else {
          // Use mock data as fallback
          const activeAds = mockSidebarAds.filter(ad => !closedAds.includes(ad.id))
          setAds(activeAds)
        }
      } catch (error) {
        console.error('Error fetching sidebar ads:', error)
        // Use mock data on error
        const activeAds = mockSidebarAds.filter(ad => !closedAds.includes(ad.id))
        setAds(activeAds)
      } finally {
        setLoading(false)
      }
    }

    fetchAds()
  }, [closedAds])

  const handleAdClick = async (ad: Advertisement) => {
    try {
      // Track click for analytics
      await advertisementService.trackClick(ad.id)
      console.log('Sidebar ad clicked and tracked:', ad.title)
      
      // Open ad link
      window.open(ad.linkUrl, '_blank')
    } catch (error) {
      console.error('Error tracking sidebar ad click:', error)
      // Still open the link even if tracking fails
      window.open(ad.linkUrl, '_blank')
    }
  }

  const handleCloseAd = (adId: string) => {
    setClosedAds(prev => [...prev, adId])
  }

  if (loading) {
    return (
      <div className="space-y-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
            <div className="h-32 bg-gray-300 rounded mb-3"></div>
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-3 bg-gray-300 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {ads.map((ad, index) => (
        <div 
          key={ad.id}
          className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group ${
            index === 0 ? 'sticky top-20' : ''
          }`}
        >
          {/* Close Button */}
          <div className="relative">
            <button
              onClick={() => handleCloseAd(ad.id)}
              className="absolute top-2 right-2 z-10 bg-gray-900/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              aria-label="Zamknij reklamę"
            >
              <X className="w-3 h-3" />
            </button>

            {/* Banner Ad */}
            {ad.type === 'banner' && ad.imageUrl && (
              <div className="relative">
                <img
                  src={ad.imageUrl}
                  alt={ad.title}
                  className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=300&h=200&fit=crop'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                
                {/* Ad Label */}
                <div className="absolute top-2 left-2">
                  <span className="bg-gray-900/70 text-white px-2 py-1 rounded text-xs">
                    Reklama
                  </span>
                </div>
              </div>
            )}

            {/* Text Ad */}
            {ad.type === 'text' && (
              <div className="bg-gradient-to-br from-primary-500 to-primary-600 text-white p-4">
                <div className="text-xs opacity-75 mb-1">Reklama</div>
                <div className="font-semibold">{ad.title}</div>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4">
            {ad.type === 'banner' && (
              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                {ad.title}
              </h3>
            )}
            
            <p className="text-sm text-gray-600 mb-3 line-clamp-3">
              {ad.description}
            </p>

            <button
              onClick={() => handleAdClick(ad)}
              className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center group"
            >
              <span className="mr-2">Zobacz ofertę</span>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      ))}

      {/* Sticky CTA for adding ads */}
      <div className="bg-gradient-to-br from-accent-500 to-accent-600 text-white rounded-lg p-4 text-center sticky top-96">
        <h3 className="font-semibold mb-2">📈 Reklamuj się!</h3>
        <p className="text-sm text-accent-100 mb-3">
          Dotrzej do tysięcy lokalnych klientów
        </p>
        <a
          href="/advertise"
          className="block bg-white text-accent-600 py-2 px-4 rounded-lg font-medium hover:bg-accent-50 transition-colors"
        >
          Rozpocznij kampanię
        </a>
      </div>

      {/* Local Business Directory Teaser */}
      <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
        <div className="text-center">
          <h3 className="font-semibold text-gray-900 mb-2">📋 Katalog Firm</h3>
          <p className="text-sm text-gray-600 mb-3">
            Znajdź lokalne usługi i firmy w Twojej okolicy
          </p>
          <a
            href="/directory"
            className="block bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Przeglądaj katalog
          </a>
        </div>
      </div>

      {/* Social Media Follow */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="font-semibold text-gray-900 mb-3 text-center">🔔 Śledź nas</h3>
        <div className="grid grid-cols-2 gap-2">
          <a
            href="https://facebook.com/portal-lokalny"
            className="bg-blue-600 text-white p-2 rounded text-center text-sm hover:bg-blue-700 transition-colors"
          >
            📘 Facebook
          </a>
          <a
            href="https://instagram.com/portal-lokalny"
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-2 rounded text-center text-sm hover:from-purple-600 hover:to-pink-600 transition-colors"
          >
            📷 Instagram
          </a>
        </div>
      </div>

      {/* No ads available */}
      {ads.length === 0 && !loading && (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-gray-500 mb-4">📢 Brak reklam do wyświetlenia</div>
          <p className="text-sm text-gray-400 mb-4">
            To miejsce może być Twoje!
          </p>
          <a
            href="/advertise"
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Reklamuj się tutaj
          </a>
        </div>
      )}
    </div>
  )
}
