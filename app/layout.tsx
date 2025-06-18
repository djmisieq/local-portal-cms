import './globals.css'
import { Inter, Poppins } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const poppins = Poppins({ 
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-poppins'
})

export const metadata = {
  title: 'Portal Lokalny - Ogłoszenia i Aktualności',
  description: 'Najlepszy portal lokalny z ogłoszeniami, aktualnościami i reklamami dla Twojej społeczności',
  keywords: 'portal lokalny, ogłoszenia, aktualności, reklamy, społeczność, wiadomości',
  authors: [{ name: 'Portal Lokalny Team' }],
  creator: 'Portal Lokalny',
  publisher: 'Portal Lokalny',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Portal Lokalny - Ogłoszenia i Aktualności',
    description: 'Najlepszy portal lokalny z ogłoszeniami, aktualnościami i reklamami dla Twojej społeczności',
    url: 'https://local-news-40c61.web.app',
    siteName: 'Portal Lokalny',
    locale: 'pl_PL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portal Lokalny - Ogłoszenia i Aktualności',
    description: 'Najlepszy portal lokalny z ogłoszeniami, aktualnościami i reklamami dla Twojej społeczności',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl" className={`${inter.variable} ${poppins.variable}`}>
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
          {children}
        </div>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              style: {
                background: '#10b981',
              },
            },
            error: {
              duration: 5000,
              style: {
                background: '#ef4444',
              },
            },
          }}
        />
      </body>
    </html>
  )
}
