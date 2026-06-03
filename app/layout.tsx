import type { Metadata } from 'next'
import { IBM_Plex_Mono, Inter, Space_Mono } from 'next/font/google'
import './globals.css'

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm',
})

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
})

export const metadata: Metadata = {
  title: 'Dolar Systems — Twoja firma. Zautomatyzowana.',
  description:
    'Wdrażamy systemy AI które działają. Automatyzacje dla kancelarii prawnych, klinik, agencji nieruchomości i firm produkcyjnych. Nie prezentacje — produkcja.',
  keywords: [
    'automatyzacja AI',
    'systemy AI',
    'n8n',
    'Make.com',
    'agencja automatyzacji',
    'Polska',
    'kancelaria',
    'klinika',
    'MŚP',
  ],
  authors: [{ name: 'Bartosz Dolczewski', url: 'https://dolar-systems.pl' }],
  metadataBase: new URL('https://dolar-systems.pl'),
  openGraph: {
    title: 'Dolar Systems — Twoja firma. Zautomatyzowana.',
    description:
      'Wdrażamy systemy AI które działają. Nie prezentacje — produkcja.',
    url: 'https://dolar-systems.pl',
    siteName: 'Dolar Systems',
    locale: 'pl_PL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dolar Systems',
    description: 'Agencja AI automatyzacji dla MŚP',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="pl"
      className={`${ibmPlexMono.variable} ${inter.variable} ${spaceMono.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
