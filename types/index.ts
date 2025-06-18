export interface User {
  id: string
  email: string
  displayName: string
  photoURL?: string
  role: 'admin' | 'editor' | 'user'
  createdAt: Date
  updatedAt: Date
}

export interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  featuredImage?: string
  author: {
    id: string
    name: string
    avatar?: string
  }
  category: Category
  tags: string[]
  status: 'draft' | 'published' | 'archived'
  featured: boolean
  views: number
  likes: number
  createdAt: Date
  updatedAt: Date
  publishedAt?: Date
  seo: {
    metaTitle?: string
    metaDescription?: string
    metaKeywords?: string
  }
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  color: string
  icon?: string
  parentId?: string
  createdAt: Date
  updatedAt: Date
}

export interface Advertisement {
  id: string
  title: string
  description: string
  imageUrl?: string
  linkUrl: string
  position: 'hero-slider' | 'sidebar' | 'content' | 'footer'
  type: 'banner' | 'text' | 'video' | 'carousel'
  status: 'active' | 'inactive' | 'expired'
  priority: number
  startDate: Date
  endDate: Date
  clicks: number
  impressions: number
  budget?: number
  costPerClick?: number
  targetAudience?: {
    ageMin?: number
    ageMax?: number
    location?: string[]
    interests?: string[]
  }
  createdAt: Date
  updatedAt: Date
}

export interface Classified {
  id: string
  title: string
  description: string
  price?: number
  currency: 'PLN' | 'EUR' | 'USD'
  category: Category
  subcategory?: string
  location: {
    city: string
    region: string
    coordinates?: {
      lat: number
      lng: number
    }
  }
  images: string[]
  contact: {
    name: string
    phone?: string
    email?: string
  }
  features: {
    condition?: 'new' | 'used' | 'refurbished'
    brand?: string
    model?: string
    year?: number
  }
  status: 'active' | 'sold' | 'expired' | 'pending'
  featured: boolean
  premium: boolean
  views: number
  favorites: number
  createdAt: Date
  updatedAt: Date
  expiresAt: Date
  userId: string
}

export interface Comment {
  id: string
  content: string
  author: {
    id: string
    name: string
    avatar?: string
  }
  parentId?: string
  articleId?: string
  classifiedId?: string
  status: 'approved' | 'pending' | 'rejected'
  likes: number
  createdAt: Date
  updatedAt: Date
}

export interface Newsletter {
  id: string
  email: string
  status: 'active' | 'unsubscribed'
  preferences: {
    categories: string[]
    frequency: 'daily' | 'weekly' | 'monthly'
  }
  createdAt: Date
  updatedAt: Date
}

export interface Analytics {
  id: string
  type: 'page_view' | 'ad_click' | 'ad_impression' | 'search' | 'contact'
  data: {
    url?: string
    adId?: string
    searchQuery?: string
    userAgent?: string
    referrer?: string
    location?: string
  }
  userId?: string
  sessionId: string
  timestamp: Date
}

export interface SiteSettings {
  id: string
  siteName: string
  siteDescription: string
  logoUrl?: string
  faviconUrl?: string
  primaryColor: string
  secondaryColor: string
  contactInfo: {
    email: string
    phone?: string
    address?: string
    socialMedia?: {
      facebook?: string
      twitter?: string
      instagram?: string
      linkedin?: string
    }
  }
  seoSettings: {
    defaultMetaTitle: string
    defaultMetaDescription: string
    googleAnalyticsId?: string
    facebookPixelId?: string
  }
  monetization: {
    adsenseId?: string
    stripePublishableKey?: string
    paymentMethods: string[]
  }
  updatedAt: Date
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginationParams {
  page: number
  limit: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    currentPage: number
    totalPages: number
    totalItems: number
    itemsPerPage: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
}
