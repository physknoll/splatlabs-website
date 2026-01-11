import { Metadata } from 'next'
import { L2ProHero } from '@/app/components/lixell2pro/L2ProHero'
import { L2ProScrollSpinner } from '@/app/components/lixell2pro/L2ProScrollSpinner'
import { L2ProColorComparison } from '@/app/components/lixell2pro/L2ProColorComparison'
import { L2ProAlgorithm } from '@/app/components/lixell2pro/L2ProAlgorithm'
import { L2ProReliability } from '@/app/components/lixell2pro/L2ProReliability'
import { L2ProWorkflow } from '@/app/components/lixell2pro/L2ProWorkflow'
import { L2ProEcosystem } from '@/app/components/lixell2pro/L2ProEcosystem'
import { L2ProCTA } from '@/app/components/lixell2pro/L2ProCTA'
import { L2ProViewTracker } from '@/app/components/lixell2pro/L2ProViewTracker'

export const metadata: Metadata = {
  title: 'Lixel L2 Pro | Real-Time Scanning & Modeling Device',
  description:
    'The Lixel L2 Pro combines LiDAR, visual, and IMU modules with AI, delivering real-time point cloud data that rivals post-processed quality. Zero post-processing era.',
  openGraph: {
    title: 'Lixel L2 Pro | Real-Time Scanning & Modeling Device',
    description:
      'Real-time point cloud data that rivals post-processed quality. 3cm absolute accuracy, 1M points/m² density.',
    type: 'website',
  },
}

export default function LixelL2ProPage() {
  return (
    <>
      <L2ProViewTracker />
      <L2ProHero />
      <L2ProScrollSpinner />
      <L2ProColorComparison />
      <L2ProAlgorithm />
      <L2ProReliability />
      <L2ProWorkflow />
      <L2ProEcosystem />
      <L2ProCTA />
    </>
  )
}
