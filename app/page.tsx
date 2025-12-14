import { Hero } from './components/landing/Hero'
import { SocialProof } from './components/landing/SocialProof'
import { ValuePropositions } from './components/landing/ValuePropositions'
import { FeaturesShowcase } from './components/landing/FeaturesShowcase'
import { IndustriesSection } from './components/landing/IndustriesSection'
import { TestimonialsSection } from './components/landing/TestimonialsSection'
import { PricingPreview } from './components/landing/PricingPreview'
import { FinalCTA } from './components/landing/FinalCTA'

export default function Home() {
  return (
    <>
      <Hero />
      <SocialProof />
      <ValuePropositions />
      <FeaturesShowcase />
      <IndustriesSection />
      <TestimonialsSection />
      <PricingPreview />
      <FinalCTA />
    </>
  )
}

