import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans, IBM_Plex_Mono, Archivo, Inter_Tight } from 'next/font/google'
import './globals.css'

/* Archivo ma oś szerokości (wdth) — rozciągnięty daje litery jak ryte w płycie */
const archivo = Archivo({
  subsets: ['latin', 'latin-ext'],
  axes: ['wdth'],
  variable: '--font-archivo',
  display: 'swap',
})

const interTight = Inter_Tight({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter-tight',
  display: 'swap',
})

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
    'Budujemy systemy pod konkretną branżę: RentCore dla wypożyczalni sprzętu, BookCore dla klinik i salonów premium, oraz automatyzacje procesów szyte na miarę.',
  keywords: ['system dla wypożyczalni', 'RentCore', 'BookCore', 'system rezerwacji dla klinik', 'automatyzacja procesów', 'systemy AI', 'Polska'],
  authors: [{ name: 'Bartosz Dolczewski', url: 'https://dolar-systems.pl' }],
  metadataBase: new URL('https://dolar-systems.pl'),
  openGraph: {
    title: 'Dolar Systems — Twoja firma. Zautomatyzowana.',
    description: 'Budujemy systemy pod konkretną branżę i pokazujemy je działające, zanim zdecydujesz o wdrożeniu.',
    url: 'https://dolar-systems.pl',
    siteName: 'Dolar Systems',
    locale: 'pl_PL',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className={`${playfair.variable} ${dmSans.variable} ${ibmPlexMono.variable} ${archivo.variable} ${interTight.variable}`}>
      <body>{children}</body>
    </html>
  )
}
