import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import dynamic from 'next/dynamic'
import FloatingCTA from '@/components/common/FloatingCTA'
import { Providers } from '@/components/providers'

const Header = dynamic(() => import('@/components/Header').then(mod => mod.Header), { ssr: false });

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BS - Создавайте и публикуйте веб-страницы',
  description: 'Платформа для создания и публикации веб-страниц с аналитикой и монетизацией',
  keywords: ['страницы', 'блог', 'контент', 'публикации'],
  authors: [{ name: 'BS Team' }],
  creator: 'BS Team',
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://bs.example.com',
    siteName: 'BS',
    title: 'BS - Создавайте и делитесь страницами',
    description: 'Создавайте красивые страницы и делитесь ими с миром',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'BS',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BS - Создавайте и делитесь страницами',
    description: 'Создавайте красивые страницы и делитесь ими с миром',
    images: ['/og-image.png'],
    creator: '@bs',
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
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  verification: {
    google: 'google-site-verification-code',
    yandex: 'yandex-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <Providers>
          <Header />
          <main className="min-h-screen pt-16">
            {children}
          </main>
          <FloatingCTA />
        </Providers>
      </body>
    </html>
  )
} 