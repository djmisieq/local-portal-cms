'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'

// Mock data - w przyszłości będzie pobierane z Firebase
const advertisementSlides = [
  {
    id: 1,
    title: "Premium Restaurant Chain",
    description: "Najlepsza pizza w mieście! Zamów online i odbierz 20% zniżki na pierwsze zamówienie",
    imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=1200&h=400&fit=crop",
    linkUrl: "https://example-restaurant.com",
    cta: "Zamów Teraz",
    gradient: "from-red-500 to-orange-600",
    category: "Gastronomia"
  },
  {
    id: 2,
    title: "Auto Service Premium",
    description: "Profesjonalne naprawy samochodów. Bezpłatna diagnoza i gwarancja na wszystkie usługi",
    imageUrl: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&h=400&fit=crop",
    linkUrl: "https://example-autoservice.com",
    cta: "Umów Wizytę",
    gradient: "from-blue-500 to-purple-600",
    category: "Motoryzacja"
  },
  {
    id: 3,
    title: "Fitness Studio Elite",
    description: "Nowoczesna siłownia z trenerami personalnymi. Pierwszy miesiąc za darmo!",
    imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=400&fit=crop",
    linkUrl: "https://example-fitness.com",
    cta: "Dołącz Dziś",
    gradient: "from-green-500 to-teal-600",
    category: "Sport i Zdrowie"
  },
  {
    id: 4,
    title: "Real Estate Pro",
    description: "Znajdź swój wymarzone mieszkanie. Ponad 1000+ ofert nieruchomości w najlepszych lokalizacjach",
    imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=400&fit=crop",
    linkUrl: "https://example-realestate.com",
    cta: "Zobacz Oferty",
    gradient: "from-purple-500 to-pink-600",
    category: "Nieruchomości"
  }
]

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [hoveredSlide, setHoveredSlide] = useState<number | null>(null)

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    if (!isPlaying || hoveredSlide !== null) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % advertisementSlides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isPlaying, hoveredSlide])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const goToPrevious = () => {
    setCurrentSlide((prev) => 
      prev === 0 ? advertisementSlides.length - 1 : prev - 1
    )
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % advertisementSlides.length)
  }

  const handleAdClick = (ad: typeof advertisementSlides[0]) => {
    // Track click for analytics
    console.log('Ad clicked:', ad.title)
    
    // In real app, send analytics to Firebase/Google Analytics
    // analytics.track('ad_click', { adId: ad.id, adTitle: ad.title })
    
    window.open(ad.linkUrl, '_blank')
  }

  const currentAd = advertisementSlides[currentSlide]

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
        <div className={`absolute inset-0 bg-gradient-to-r ${currentAd.gradient} opacity-80`} />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            {/* Category Badge */}
            <div className="inline-block mb-4">
              <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                {currentAd.category}
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
              {currentAd.cta}
              <ExternalLink className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
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

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {advertisementSlides.map((_, index) => (
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

      {/* Play/Pause Control */}
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

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-20">
        <div 
          className="h-full bg-white transition-all duration-300"
          style={{ 
            width: `${((currentSlide + 1) / advertisementSlides.length) * 100}%` 
          }}
        />
      </div>

      {/* Slide Counter */}
      <div className="absolute top-4 left-4 bg-white/20 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm z-20">
        {currentSlide + 1} / {advertisementSlides.length}
      </div>
    </div>
  )
}
