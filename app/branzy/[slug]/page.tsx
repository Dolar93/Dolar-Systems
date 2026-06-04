import { notFound } from 'next/navigation'
import NavBar from '@/components/ui/NavBar'
import Footer from '@/components/ui/Footer'
import NichePage from '@/components/sections/NichePage'
import { NICHES, getNicheBySlug } from '@/data/niches'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  return NICHES.map((n) => ({ slug: n.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const niche = getNicheBySlug(slug)
  if (!niche) return {}
  return {
    title: `${niche.name} — Dolar Systems`,
    description: niche.sub,
    openGraph: {
      title: `${niche.name} — Dolar Systems`,
      description: niche.sub,
    },
  }
}

export default async function NichePageRoute({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const niche = getNicheBySlug(slug)
  if (!niche) notFound()

  return (
    <>
      <NavBar />
      <main style={{ position: 'relative', zIndex: 1 }}>
        {/* Pass only the serializable slug — NichePage resolves the full data client-side */}
        <NichePage slug={slug} />
      </main>
      <Footer />
    </>
  )
}
