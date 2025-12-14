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

export const PRICING_PLANS = [
  {
    name: 'Free',
    price: { monthly: 0, yearly: 0 },
    projects: 2,
    description: 'Perfect for trying out the platform',
    features: [
      'Core 3D Viewer',
      'Unlimited Sharing',
      'Basic Measurements',
      'Community Support',
    ],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Starter',
    price: { monthly: 29.95, yearly: 300 },
    projects: 10,
    description: 'For professionals getting started',
    features: [
      'Everything in Free',
      'Basic AI Staging',
      'Priority Processing',
      'Email Support',
    ],
    cta: 'Start Free Trial',
    highlighted: false,
  },
  {
    name: 'Business',
    price: { monthly: 99.95, yearly: 1000 },
    projects: 50,
    description: 'For teams and growing businesses',
    features: [
      'Everything in Starter',
      'Unlimited AI Staging',
      'Portals & Linking',
      'Project Folders',
      'Team Roles',
      '4D Timelines',
    ],
    cta: 'Start Free Trial',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: { monthly: null, yearly: null },
    projects: 'Unlimited',
    description: 'For large organizations',
    features: [
      'Everything in Business',
      'Custom Project Limits',
      'SSO & SAML',
      'White Labeling',
      'On-Premise Options',
      'Dedicated Support',
      'SLA Guarantee',
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
