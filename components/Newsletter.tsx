'use client'

import { useState } from 'react'
import { Mail, CheckCircle, AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      toast.error('Wprowadź adres email')
      return
    }

    if (!email.includes('@')) {
      toast.error('Wprowadź poprawny adres email')
      return
    }

    setIsLoading(true)

    try {
      // In real app: await subscribeToNewsletter(email)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock success
      console.log('Newsletter subscription for:', email)
      
      setIsSubscribed(true)
      setEmail('')
      toast.success('Dziękujemy za subskrypcję!')
      
    } catch (error) {
      toast.error('Wystąpił błąd podczas subskrypcji')
      console.error('Newsletter subscription error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubscribed) {
    return (
      <div className="text-center py-8">
        <div className="mb-4">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          🎉 Dziękujemy za subskrypcję!
        </h3>
        <p className="text-gray-600 mb-4">
          Sprawdź swoją skrzynkę email - wysłaliśmy Ci potwierdzenie.
        </p>
        <p className="text-sm text-gray-500">
          Będziesz otrzymywać najnowsze aktualności z Twojej społeczności.
        </p>
      </div>
    )
  }

  return (
    <div className="text-center">
      <div className="mb-6">
        <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="w-8 h-8 text-primary-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          📧 Newsletter Lokalny
        </h3>
        <p className="text-gray-600 text-sm">
          Otrzymuj najważniejsze wiadomości z Twojej okolicy bezpośrednio na email. 
          Bez spamu, tylko ważne informacje!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="Wprowadź swój adres email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !email}
            className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Zapisywanie...
              </div>
            ) : (
              'Zapisz się'
            )}
          </button>
        </div>
        
        <div className="flex items-start text-xs text-gray-500 space-x-2">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <p className="text-left">
            Subskrybując newsletter, wyrażasz zgodę na otrzymywanie wiadomości email. 
            Możesz wypisać się w dowolnym momencie. 
            <a href="/privacy" className="text-primary-600 hover:underline">Polityka prywatności</a>
          </p>
        </div>
      </form>

      {/* Newsletter Benefits */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
        <div className="flex flex-col items-center">
          <div className="bg-green-100 w-10 h-10 rounded-full flex items-center justify-center mb-2">
            <span className="text-green-600">📰</span>
          </div>
          <p className="text-gray-600 text-center">
            Najnowsze <br />aktualności
          </p>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center mb-2">
            <span className="text-blue-600">🏷️</span>
          </div>
          <p className="text-gray-600 text-center">
            Najlepsze <br />ogłoszenia
          </p>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-purple-100 w-10 h-10 rounded-full flex items-center justify-center mb-2">
            <span className="text-purple-600">🎉</span>
          </div>
          <p className="text-gray-600 text-center">
            Wydarzenia <br />i promocje
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          Dołącz do <span className="font-semibold text-primary-600">2,847</span> mieszkańców, 
          którzy już otrzymują nasze wiadomości
        </p>
      </div>
    </div>
  )
}
