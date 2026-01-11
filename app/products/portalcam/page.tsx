import { Metadata } from 'next'
import { PortalCamHero } from '@/app/components/portalcam/PortalCamHero'
import { WhatIsSection } from '@/app/components/portalcam/WhatIsSection'
import { ScrollSpinner } from '@/app/components/portalcam/ScrollSpinner'
import { WorkflowTabs } from '@/app/components/portalcam/WorkflowTabs'
import { UseCasesGrid } from '@/app/components/portalcam/UseCasesGrid'
import { ToolkitSection } from '@/app/components/portalcam/ToolkitSection'
import { PortalCamPricing } from '@/app/components/portalcam/PortalCamPricing'
import { PortalCamCTA } from '@/app/components/portalcam/PortalCamCTA'
import { PortalCamViewTracker } from '@/app/components/portalcam/PortalCamViewTracker'

export const metadata: Metadata = {
  title: 'PortalCam | The First True Spatial Camera',
  description:
    'Powered by 3D Gaussian Splatting. Turn any location into a photorealistic, navigable 3D world in minutes with dual-fisheye lenses and onboard LiDAR.',
  openGraph: {
    title: 'PortalCam | The First True Spatial Camera',
    description:
      'Powered by 3D Gaussian Splatting. Turn any location into a photorealistic, navigable 3D world in minutes.',
    type: 'website',
  },
}

export default function PortalCamPage() {
  return (
    <>
      <PortalCamViewTracker />
      <PortalCamHero />
      <WhatIsSection />
      <ScrollSpinner />
      <WorkflowTabs />
      <UseCasesGrid />
      <ToolkitSection />
      <PortalCamPricing />
      <PortalCamCTA />
    </>
  )
}
