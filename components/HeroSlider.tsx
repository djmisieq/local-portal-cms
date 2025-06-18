'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import { Advertisement } from '@/types'
import { advertisementService } from '@/lib/firestore'
import toast from 'react-hot-toast'

export default function HeroSlider() {
  const [slides, setSlides] = useState<Advertisement[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [hoveredSlide, setHoveredSlide] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  // Mock data as fallback
  const fallbackSlides: Advertisement[] = [
    {
      id: "fallback-1",
      title: "Premium Restaurant Chain",
      description: "Najlepsza pizza w mieście! Zamów online i odbierz 20% zniżki na pierwsze zamówienie",
      imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=1200&h=400&fit=crop",
      linkUrl: "https://example-restaurant.com",
      position: "hero-slider",
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
      id: "fallback-2",
      title: "Auto Service Premium",
      description: "Profesjonalne naprawy samochodów. Bezpłatna diagnoza i gwarancja na wszystkie usługi",
      imageUrl: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&h=400&fit=crop",
      linkUrl: "https://example-autoservice.com",
      position: "hero-slider",
      type: "banner",
      status: "active",
      priority: 2,
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-12-31'),
      clicks: 0,
      impressions: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]

  useEffect(() => {
    const fetchAdvertisements = async () => {
      try {
        setLoading(true)
        
        const ads = await advertisementService.getAdvertisements('hero-slider')
        
        if (ads.length > 0) {
          setSlides(ads)
          
          // Track impressions for all loaded ads
          ads.forEach(ad => {
            advertisementService.trackImpression(ad.id).catch(err => {
              console.error('Error tracking impression:', err)
            })
          })
        } else {
          // Use fallback data if no ads in Firebase
          setSlides(fallbackSlides)
        }
      } catch (error) {
        console.error('Error fetching advertisements:', error)
        // Use fallback data on error
        setSlides(fallbackSlides)
      } finally {
        setLoading(false)
      }
    }

    fetchAdvertisements()
  }, [])

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    if (!isPlaying || hoveredSlide !== null || slides.length === 0) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isPlaying, hoveredSlide, slides.length])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const goToPrevious = () => {
    setCurrentSlide((prev) => 
      prev === 0 ? slides.length - 1 : prev - 1
    )
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const handleAdClick = async (ad: Advertisement) => {
    try {
      // Track click for analytics
      await advertisementService.trackClick(ad.id)
      console.log('Ad clicked and tracked:', ad.title)
      
      // Open ad link
      window.open(ad.linkUrl, '_blank')
    } catch (error) {
      console.error('Error tracking ad click:', error)
      // Still open the link even if tracking fails
      window.open(ad.linkUrl, '_blank')
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="relative w-full h-96 md:h-[500px] lg:h-[600px] bg-gray-300 animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-gray-500">Ładowanie reklam...</div>
        </div>
      </div>
    )
  }

  // No slides available
  if (slides.length === 0) {
    return (
      <div className="relative w-full h-96 md:h-[500px] lg:h-[600px] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-600 mb-2">🎯 Miejsce na Twoją reklamę</h2>
          <p className="text-gray-500 mb-4">Dotrzij do tysięcy lokalnych klientów</p>
          <a
            href="/advertise"
            className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Rozpocznij kampanię
          </a>
        </div>
      </div>
    )
  }

  const currentAd = slides[currentSlide]

  return (
    <div className="relative w-full h-96 md:h-[500px] lg:h-[600px] overflow-hidden bg-gray-900">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${currentAd.imageUrl})`,
          backgroundBlendMode: 'overlay'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            {/* Ad Label */}
            <div className="inline-block mb-4">
              <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                Reklama
              </span>
            </div>

            {/* Main Content */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in">
              {currentAd.title}
            </h1>
            
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl animate-slide-up">
              {currentAd.description}
            </p>

            {/* CTA Button */}
            <button
              onClick={() => handleAdClick(currentAd)}
              onMouseEnter={() => setHoveredSlide(currentSlide)}
              onMouseLeave={() => setHoveredSlide(null)}
              className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 flex items-center group animate-slide-up"
            >
              Zobacz ofertę
              <ExternalLink className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 z-20"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 z-20"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Slide Indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Play/Pause Control */}
      {slides.length > 1 && (
        <div className="absolute top-4 right-4 z-20">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-sm transition-all duration-300"
            aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
          >
            {isPlaying ? (
              <div className="w-4 h-4 flex space-x-1">
                <div className="w-1 h-4 bg-white"></div>
                <div className="w-1 h-4 bg-white"></div>
              </div>
            ) : (
              <div className="w-4 h-4 relative">
                <div className="absolute inset-0 triangle-right border-l-4 border-l-white border-t-2 border-b-2 border-t-transparent border-b-transparent"></div>
              </div>
            )}
          </button>
        </div>
      )}

      {/* Progress Bar */}
      {slides.length > 1 && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-20">
          <div 
            className="h-full bg-white transition-all duration-300"
            style={{ 
              width: `${((currentSlide + 1) / slides.length) * 100}%` 
            }}
          />
        </div>
      )}

      {/* Slide Counter */}
      {slides.length > 1 && (
        <div className="absolute top-4 left-4 bg-white/20 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm z-20">
          {currentSlide + 1} / {slides.length}
        </div>
      )}
    </div>
  )
}
