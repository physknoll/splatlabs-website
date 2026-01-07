export const SITE_CONFIG = {
  name: 'ROCK Splat Labs',
  description: 'The world\'s most advanced cloud platform for hosting, sharing, and collaborating on Gaussian Splat models.',
  url: 'https://splatlabs.rockrobotic.com',
  ogImage: '/og/default.jpg',
  links: {
    twitter: 'https://twitter.com/rockrobotic',
    github: 'https://github.com/rockrobotic',
    linkedin: 'https://linkedin.com/company/rockrobotic',
    youtube: 'https://youtube.com/@rockrobotic',
  },
}

export const NAV_ITEMS = [
  {
    title: 'Product',
    href: '/features',
    children: [
      { title: 'AI Virtual Staging', href: '/features/ai-staging', description: 'Transform spaces with AI-powered furniture and decor' },
      { title: '4D Timelines', href: '/features/4d-timelines', description: 'Track progress over time with temporal navigation' },
      { title: 'Portals', href: '/features/portals', description: 'Link multiple scenes seamlessly' },
      { title: 'Measurements', href: '/features/measurements', description: 'Precision distance and area calculations' },
    ],
  },
  {
    title: 'Solutions',
    href: '/solutions',
    children: [
      { title: 'AEC', href: '/solutions/aec', description: 'Architecture, Engineering & Construction' },
      { title: 'Real Estate', href: '/solutions/real-estate', description: 'Property marketing and virtual tours' },
      { title: 'Surveying', href: '/solutions/surveying', description: 'Professional surveying and mapping' },
      { title: 'Drone Mapping', href: '/solutions/drone-mapping', description: 'Aerial inspection and documentation' },
    ],
  },
  {
    title: 'Resources',
    href: '/resources',
    children: [
      { title: 'Blog', href: '/blog', description: 'Latest news and tutorials' },
      { title: 'Documentation', href: 'https://docs.rockrobotic.com', description: 'Technical guides and API reference' },
      { title: 'Case Studies', href: '/resources#case-studies', description: 'Success stories from customers' },
    ],
  },
  {
    title: 'Pricing',
    href: '/pricing',
  },
]

export const FOOTER_LINKS = {
  product: [
    { title: 'Features', href: '/features' },
    { title: 'AI Staging', href: '/features/ai-staging' },
    { title: '4D Timelines', href: '/features/4d-timelines' },
    { title: 'Portals', href: '/features/portals' },
    { title: 'Measurements', href: '/features/measurements' },
    { title: 'Pricing', href: '/pricing' },
  ],
  solutions: [
    { title: 'AEC', href: '/solutions/aec' },
    { title: 'Real Estate', href: '/solutions/real-estate' },
    { title: 'Surveying', href: '/solutions/surveying' },
    { title: 'Drone Mapping', href: '/solutions/drone-mapping' },
  ],
  resources: [
    { title: 'Blog', href: '/blog' },
    { title: 'Documentation', href: 'https://docs.rockrobotic.com' },
    { title: 'Case Studies', href: '/resources#case-studies' },
    { title: 'API Reference', href: 'https://docs.rockrobotic.com/api' },
  ],
  company: [
    { title: 'About', href: '/about' },
    { title: 'Contact', href: '/contact' },
    { title: 'Careers', href: 'https://rockrobotic.com/careers' },
    { title: 'Press', href: '/press' },
  ],
  legal: [
    { title: 'Privacy Policy', href: '/privacy' },
    { title: 'Terms of Service', href: '/terms' },
    { title: 'Cookie Policy', href: '/cookies' },
  ],
}

// Tier pricing structure for tiered plans
export interface PricingTier {
  projects: number | string
  users?: number | string
  monthly: number
  yearly: number
  monthlyEquivalent?: number // yearly / 12 for display
  contactSales?: boolean
}

export interface TieredPlan {
  id: string
  name: string
  description: string
  tiers: PricingTier[]
  defaultTierIndex: number
  features: string[]
  featuresHeader: string
  cta: string
  highlighted: boolean
  yearlyBonus?: string
}

// Splat Plans with tiered pricing
export const SPLAT_PRICING_PLANS: TieredPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Create immersive 3D property walkthroughs with AI staging',
    tiers: [
      { projects: 5, monthly: 14, yearly: 144, monthlyEquivalent: 12 },
      { projects: 10, monthly: 28, yearly: 288, monthlyEquivalent: 24 },
      { projects: 15, monthly: 42, yearly: 432, monthlyEquivalent: 36 },
      { projects: 20, monthly: 56, yearly: 576, monthlyEquivalent: 48 },
    ],
    defaultTierIndex: 0,
    features: [
      'Most Advanced Gaussian Splat Hosting',
      'Take precise measurements of rooms, objects, and spaces',
      'Unlimited sharing',
      'Automatically generate photo galleries and tour highlights',
      'Advanced Splat Movie Creation',
      'Embed & Share on Zillow, etc.',
      'Purchase AI Enhanced Floorplans & Virtual Staging',
      'VR Viewer Support',
    ],
    featuresHeader: 'TOP FEATURES:',
    cta: 'Get Started',
    highlighted: false,
  },
  {
    id: 'business',
    name: 'Business',
    description: 'Advanced 3D walkthroughs with AI staging and portals',
    tiers: [
      { projects: 20, monthly: 69, yearly: 696, monthlyEquivalent: 58 },
      { projects: 25, monthly: 85, yearly: 852, monthlyEquivalent: 71 },
      { projects: 30, monthly: 99, yearly: 996, monthlyEquivalent: 83 },
      { projects: 40, monthly: 130, yearly: 1296, monthlyEquivalent: 108 },
      { projects: 50, monthly: 159, yearly: 1584, monthlyEquivalent: 132 },
      { projects: 75, monthly: 228, yearly: 2292, monthlyEquivalent: 191 },
      { projects: 100, monthly: 296, yearly: 2964, monthlyEquivalent: 247 },
      { projects: 125, monthly: 365, yearly: 3600, monthlyEquivalent: 300 },
      { projects: 150, monthly: 429, yearly: 4272, monthlyEquivalent: 356 },
    ],
    defaultTierIndex: 0,
    features: [
      'Everything in Splat Starter',
      'Organize projects',
      'Portals to Connect 3D Worlds',
      'Reduced Splat Labs branding',
    ],
    featuresHeader: 'ALL STARTER FEATURES, PLUS:',
    cta: 'Get Started',
    highlighted: true,
    yearlyBonus: 'Bonus: +10 AI Floorplans & Virtual Staging Projects',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Custom solutions for teams and organizations',
    tiers: [
      { projects: 50, users: 3, monthly: 191, yearly: 1901, monthlyEquivalent: 158 },
      { projects: 75, users: 5, monthly: 274, yearly: 2750, monthlyEquivalent: 229 },
      { projects: 100, users: 10, monthly: 355, yearly: 3557, monthlyEquivalent: 296 },
      { projects: 125, users: 10, monthly: 438, yearly: 4320, monthlyEquivalent: 360 },
      { projects: 150, users: 10, monthly: 515, yearly: 5126, monthlyEquivalent: 427 },
      { projects: 200, users: 20, monthly: 672, yearly: 6624, monthlyEquivalent: 552 },
      { projects: '500+', users: '20+', monthly: 0, yearly: 0, contactSales: true },
    ],
    defaultTierIndex: 0,
    features: [
      'User access control',
      'Custom storage',
      'White Label Branding',
    ],
    featuresHeader: 'ALL BUSINESS FEATURES, PLUS:',
    cta: 'Contact Sales',
    highlighted: false,
  },
]

// Feature comparison data for the full pricing page
export const SPLAT_FEATURE_COMPARISON = [
  { id: 'users', label: 'Users Per Subscription', starter: '1', business: '1', enterprise: '3+' },
  { id: 'splat_hosting', label: 'Gaussian Splat Hosting', starter: true, business: true, enterprise: true },
  { id: 'virtual_walkthroughs', label: '3D Virtual Walkthroughs', starter: true, business: true, enterprise: true },
  { id: 'ai_staging', label: 'AI Virtual Staging', starter: false, business: 'Optional', enterprise: 'Optional' },
  { id: 'floor_plans', label: 'AI Floor Plans', starter: false, business: 'Optional', enterprise: 'Optional' },
  { id: 'portals', label: 'Portals to Connect 3D Worlds', starter: false, business: true, enterprise: true },
  { id: 'embed_splats', label: 'Embed & Share on Zillow, etc.', starter: true, business: true, enterprise: true },
  { id: 'kml', label: 'Display KML Layer', starter: true, business: true, enterprise: true },
  { id: 'orthomosaic', label: 'Display Orthomosaic Layer', starter: true, business: true, enterprise: true },
  { id: 'measure_distance', label: 'Measure Distance', starter: true, business: true, enterprise: true },
  { id: 'measure_area', label: 'Measure Area', starter: true, business: true, enterprise: true },
  { id: 'annotate', label: 'Annotate Dataset', starter: true, business: true, enterprise: true },
  { id: 'sharing', label: 'Unlimited Sharing', starter: true, business: true, enterprise: true },
  { id: 'export', label: 'Export Data', starter: true, business: true, enterprise: true },
  { id: 'organize', label: 'Organize Your Projects', starter: false, business: true, enterprise: true },
  { id: 'support_community', label: 'Community Support', starter: true, business: true, enterprise: true },
  { id: 'support_email', label: 'Email Support', starter: false, business: true, enterprise: true },
  { id: 'support_phone', label: 'Phone Support', starter: false, business: false, enterprise: true },
  { id: 'manage_users', label: 'User Access Control', starter: false, business: false, enterprise: true },
]

// Legacy flat pricing for backward compatibility (used by PricingPreview simplified view)
export const PRICING_PLANS = [
  {
    name: 'Starter',
    startingPrice: { monthly: 14, yearly: 12 },
    projects: '5-20',
    description: 'Create immersive 3D property walkthroughs',
    features: [
      'Gaussian Splat Hosting',
      'Precise measurements',
      'Unlimited sharing',
      'Advanced Splat Movies',
    ],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Business',
    startingPrice: { monthly: 69, yearly: 58 },
    projects: '20-150',
    description: 'Advanced features for growing teams',
    features: [
      'Everything in Starter',
      'Portals to link 3D worlds',
      'Project organization',
      'Reduced branding',
    ],
    cta: 'Get Started',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    startingPrice: { monthly: 191, yearly: 158 },
    projects: '50-500+',
    description: 'Custom solutions for organizations',
    features: [
      'Everything in Business',
      'User access control',
      'White Label Branding',
      'Custom storage',
    ],
    cta: 'Contact Sales',
    highlighted: false,
  },
]

export const TESTIMONIALS = [
  {
    quote: "ROCK Splat Labs has completely transformed how we present properties to buyers. The 3D tours are incredibly immersive.",
    author: "Sarah Chen",
    role: "Real Estate Agent",
    company: "Sotheby's International",
    avatar: "/testimonials/sarah.jpg",
  },
  {
    quote: "The timeline feature is a game-changer for construction monitoring. We can track progress like never before.",
    author: "Michael Torres",
    role: "Project Manager",
    company: "Turner Construction",
    avatar: "/testimonials/michael.jpg",
  },
  {
    quote: "Being able to measure directly in the 3D model saves us countless hours of on-site revisits.",
    author: "David Park",
    role: "Lead Surveyor",
    company: "AECOM",
    avatar: "/testimonials/david.jpg",
  },
]

export const TRUST_LOGOS = [
  'Disney',
  'AECOM',
  'Turner',
  'DJI',
  "Sotheby's",
  'Skanska',
]
