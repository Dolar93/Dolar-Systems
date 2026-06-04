import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm',
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-ibm',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Dolar Systems — Twoja firma. Zautomatyzowana.',
  description:
    'Wdrażamy systemy AI które działają. Automatyzacje dla kancelarii prawnych, klinik, agencji nieruchomości i firm produkcyjnych.',
  keywords: ['automatyzacja AI', 'systemy AI', 'n8n', 'Make.com', 'agencja automatyzacji', 'Polska'],
  authors: [{ name: 'Bartosz Dolczewski', url: 'https://dolar-systems.pl' }],
  metadataBase: new URL('https://dolar-systems.pl'),
  openGraph: {
    title: 'Dolar Systems — Twoja firma. Zautomatyzowana.',
    description: 'Wdrażamy systemy AI które działają. Nie prezentacje — produkcja.',
    url: 'https://dolar-systems.pl',
    siteName: 'Dolar Systems',
    locale: 'pl_PL',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className={`${playfair.variable} ${dmSans.variable} ${ibmPlexMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
