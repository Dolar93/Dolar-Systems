import NavBar from '@/components/ui/NavBar'
import Footer from '@/components/ui/Footer'
import FloatingPaper from '@/components/ui/FloatingPaper'
import Hero from '@/components/sections/Hero'
import WhatWeAutomate from '@/components/sections/WhatWeAutomate'
import CaseStudies from '@/components/sections/CaseStudies'
import AboutUs from '@/components/sections/AboutUs'
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <>
      <FloatingPaper />
      <NavBar />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <WhatWeAutomate />
        <CaseStudies />
        <AboutUs />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
