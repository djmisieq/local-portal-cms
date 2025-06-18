'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Calendar, User, Eye, Heart } from 'lucide-react'
import { Article } from '@/types'
import { articleService } from '@/lib/firestore'
import toast from 'react-hot-toast'

interface ArticleGridProps {
  limit?: number
  category?: string
  featured?: boolean
}

export default function ArticleGrid({ limit = 6, category, featured }: ArticleGridProps) {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const result = await articleService.getArticles({
          limitCount: limit,
          category,
          featured
        })
        
        setArticles(result.articles)
      } catch (err) {
        console.error('Error fetching articles:', err)
        setError('Nie udało się załadować artykułów')
        toast.error('Błąd podczas ładowania artykułów')
        
        // Fallback to mock data if Firebase fails
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
          }
        ]
        setArticles(mockArticles.slice(0, limit))
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [limit, category, featured])

  const handleArticleClick = async (article: Article) => {
    try {
      // Track article view
      await articleService.incrementViews(article.id)
    } catch (err) {
      console.error('Error tracking article view:', err)
    }
  }

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

  if (error && articles.length === 0) {
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <article key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
          {/* Featured Image */}
          <div className="relative overflow-hidden">
            <img
              src={article.featuredImage || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop'}
              alt={article.title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop'
              }}
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
              <Link 
                href={`/articles/${article.slug}`}
                onClick={() => handleArticleClick(article)}
              >
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
                  {formatDate(new Date(article.publishedAt || article.createdAt))}
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
                src={article.author.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face'}
                alt={article.author.name}
                className="w-8 h-8 rounded-full mr-2"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face'
                }}
              />
              <div>
                <p className="text-sm font-medium text-gray-900">{article.author.name}</p>
              </div>
            </div>
          </div>
        </article>
      ))}
      
      {/* No articles found */}
      {articles.length === 0 && !loading && (
        <div className="col-span-full text-center py-8">
          <div className="text-gray-500 mb-4">📰 Brak artykułów do wyświetlenia</div>
          <p className="text-sm text-gray-400">
            {category ? `Brak artykułów w kategorii "${category}"` : 'Sprawdź ponownie później'}
          </p>
        </div>
      )}
    </div>
  )
}
