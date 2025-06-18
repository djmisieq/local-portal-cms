'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Calendar, User, Eye, Heart } from 'lucide-react'
import { Article } from '@/types'

interface ArticleGridProps {
  limit?: number
  category?: string
  featured?: boolean
}

// Mock data - w produkcji będzie pobierane z Firebase
const mockArticles: Article[] = [
  {
    id: "1",
    title: "Nowa inwestycja mieszkaniowa w centrum miasta",
    slug: "nowa-inwestycja-mieszkaniowa-centrum-miasta",
    excerpt: "Deweloper rozpoczyna budowę nowoczesnego kompleksu mieszkaniowego w ścisłym centrum. Będzie to największa inwestycja tego typu w ostatnich latach.",
    content: "",
    featuredImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
    author: {
      id: "1",
      name: "Anna Kowalska",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b3fd?w=50&h=50&fit=crop&crop=face"
    },
    category: {
      id: "1",
      name: "Nieruchomości",
      slug: "nieruchomosci",
      color: "bg-blue-500",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    tags: ["mieszkania", "inwestycje", "centrum"],
    status: "published",
    featured: true,
    views: 1250,
    likes: 45,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    publishedAt: new Date('2024-01-15'),
    seo: {}
  },
  {
    id: "2",
    title: "Modernizacja głównej ulicy - zamknięcie ruchu",
    slug: "modernizacja-glownej-ulicy-zamkniecie-ruchu",
    excerpt: "Urząd miasta informuje o planowanej modernizacji głównej arterii komunikacyjnej. Prace potrwają około 3 miesiące.",
    content: "",
    featuredImage: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=600&h=400&fit=crop",
    author: {
      id: "2",
      name: "Marek Nowak",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face"
    },
    category: {
      id: "2",
      name: "Miasto",
      slug: "miasto",
      color: "bg-green-500",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    tags: ["infrastruktura", "komunikacja", "modernizacja"],
    status: "published",
    featured: false,
    views: 890,
    likes: 23,
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-14'),
    publishedAt: new Date('2024-01-14'),
    seo: {}
  },
  {
    id: "3",
    title: "Nowe miejsca pracy w lokalnej fabryce",
    slug: "nowe-miejsca-pracy-lokalna-fabryka",
    excerpt: "Zakład produkcyjny planuje utworzenie 200 nowych stanowisk pracy. Rekrutacja rozpocznie się już w przyszłym tygodniu.",
    content: "",
    featuredImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
    author: {
      id: "3",
      name: "Katarzyna Wiśniewska",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face"
    },
    category: {
      id: "3",
      name: "Praca",
      slug: "praca",
      color: "bg-purple-500",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    tags: ["praca", "rekrutacja", "przemysł"],
    status: "published",
    featured: true,
    views: 2100,
    likes: 78,
    createdAt: new Date('2024-01-13'),
    updatedAt: new Date('2024-01-13'),
    publishedAt: new Date('2024-01-13'),
    seo: {}
  },
  {
    id: "4",
    title: "Festiwal kultury lokalnej - program wydarzeń",
    slug: "festiwal-kultury-lokalnej-program-wydarzen",
    excerpt: "W najbliższy weekend odbędzie się coroczny festiwal kultury lokalnej. Sprawdź bogaty program koncertów i wystaw.",
    content: "",
    featuredImage: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600&h=400&fit=crop",
    author: {
      id: "1",
      name: "Anna Kowalska",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b3fd?w=50&h=50&fit=crop&crop=face"
    },
    category: {
      id: "4",
      name: "Kultura",
      slug: "kultura",
      color: "bg-pink-500",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    tags: ["festiwal", "kultura", "wydarzenia"],
    status: "published",
    featured: false,
    views: 675,
    likes: 34,
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-12'),
    publishedAt: new Date('2024-01-12'),
    seo: {}
  }
]

export default function ArticleGrid({ limit = 6, category, featured }: ArticleGridProps) {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchArticles = async () => {
      setLoading(true)
      
      // In real app: const articles = await getArticles({ limit, category, featured })
      let filteredArticles = mockArticles
      
      if (featured) {
        filteredArticles = filteredArticles.filter(article => article.featured)
      }
      
      if (category) {
        filteredArticles = filteredArticles.filter(article => article.category.slug === category)
      }
      
      const limitedArticles = filteredArticles.slice(0, limit)
      
      // Simulate network delay
      setTimeout(() => {
        setArticles(limitedArticles)
        setLoading(false)
      }, 500)
    }

    fetchArticles()
  }, [limit, category, featured])

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pl-PL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date)
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: limit }).map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
            <div className="h-48 bg-gray-300"></div>
            <div className="p-4">
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded mb-2 w-3/4"></div>
              <div className="h-3 bg-gray-300 rounded mb-4 w-1/2"></div>
              <div className="flex items-center justify-between">
                <div className="h-3 bg-gray-300 rounded w-1/4"></div>
                <div className="h-3 bg-gray-300 rounded w-1/4"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <article key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
          {/* Featured Image */}
          <div className="relative overflow-hidden">
            <img
              src={article.featuredImage}
              alt={article.title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            
            {/* Category Badge */}
            <div className="absolute top-3 left-3">
              <span className={`${article.category.color} text-white px-3 py-1 rounded-full text-xs font-medium`}>
                {article.category.name}
              </span>
            </div>

            {/* Featured Badge */}
            {article.featured && (
              <div className="absolute top-3 right-3">
                <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                  ⭐ Wyróżnione
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
              <Link href={`/articles/${article.slug}`}>
                {article.title}
              </Link>
            </h3>

            {/* Excerpt */}
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {article.excerpt}
            </p>

            {/* Meta Information */}
            <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
              <div className="flex items-center space-x-3">
                <div className="flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  {formatDate(article.createdAt)}
                </div>
                <div className="flex items-center">
                  <Eye className="w-3 h-3 mr-1" />
                  {article.views}
                </div>
                <div className="flex items-center">
                  <Heart className="w-3 h-3 mr-1" />
                  {article.likes}
                </div>
              </div>
            </div>

            {/* Author */}
            <div className="flex items-center">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-8 h-8 rounded-full mr-2"
              />
              <div>
                <p className="text-sm font-medium text-gray-900">{article.author.name}</p>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
