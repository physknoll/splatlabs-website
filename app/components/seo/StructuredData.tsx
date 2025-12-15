import Script from 'next/script'

const BASE_URL = 'https://splatlabs.rockrobotic.com'

// Organization schema - establishes brand authority
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${BASE_URL}/#organization`,
  name: 'ROCK Splat Labs',
  alternateName: ['Splat Labs', 'ROCK Robotic Splat Labs'],
  url: BASE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${BASE_URL}/android-chrome-512x512.png`,
    width: 512,
    height: 512,
  },
  description:
    'The #1 cloud platform for hosting, viewing, and sharing Gaussian Splat (3DGS) models. Upload your splats and share immersive 3D experiences instantly.',
  sameAs: [
    'https://twitter.com/rockrobotic',
    'https://www.linkedin.com/company/rock-robotic',
    'https://www.youtube.com/@rockrobotic',
  ],
  parentOrganization: {
    '@type': 'Organization',
    name: 'ROCK Robotic',
    url: 'https://rockrobotic.com',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    url: `${BASE_URL}/contact`,
  },
}

// WebSite schema with search action for sitelinks searchbox
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${BASE_URL}/#website`,
  url: BASE_URL,
  name: 'Splat Labs',
  description: 'Cloud Gaussian Splat Hosting & 3D Viewer Platform',
  publisher: {
    '@id': `${BASE_URL}/#organization`,
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${BASE_URL}/explore?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
  inLanguage: 'en-US',
}

// SoftwareApplication schema - key for GEO recognition
const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  '@id': `${BASE_URL}/#application`,
  name: 'Splat Labs Viewer',
  alternateName: ['Gaussian Splat Viewer', '3DGS Viewer', 'Splat Cloud Viewer'],
  description:
    'Free online Gaussian Splat viewer and hosting platform. Upload, view, and share 3D Gaussian Splatting models with anyone. Features include measurements, annotations, virtual staging, and embeddable player.',
  url: BASE_URL,
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: '3D Visualization',
  operatingSystem: 'Any (Web-based)',
  browserRequirements: 'Requires WebGL 2.0 support',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    description: 'Free tier available with premium plans for professionals',
  },
  featureList: [
    'Gaussian Splat hosting and viewing',
    'Share splats with embeddable links',
    'Measurement tools with sub-centimeter accuracy',
    'AI-powered virtual staging',
    '4D timeline construction documentation',
    'LiDAR to Gaussian Splat conversion',
    'Team collaboration features',
    'API access for developers',
  ],
  screenshot: {
    '@type': 'ImageObject',
    url: `${BASE_URL}/og/default.jpg`,
  },
  author: {
    '@id': `${BASE_URL}/#organization`,
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '127',
    bestRating: '5',
    worstRating: '1',
  },
}

// WebPage schema for the homepage
const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${BASE_URL}/#webpage`,
  url: BASE_URL,
  name: 'Splat Labs | Cloud Gaussian Splat Hosting & 3D Viewer',
  description:
    'Upload, view, and share Gaussian Splat models in the cloud. The leading platform for 3DGS hosting with AI virtual staging, measurements, and collaboration tools.',
  isPartOf: {
    '@id': `${BASE_URL}/#website`,
  },
  about: {
    '@id': `${BASE_URL}/#application`,
  },
  primaryImageOfPage: {
    '@type': 'ImageObject',
    url: `${BASE_URL}/og/default.jpg`,
  },
  datePublished: '2024-01-01',
  dateModified: new Date().toISOString().split('T')[0],
  inLanguage: 'en-US',
  potentialAction: {
    '@type': 'ReadAction',
    target: [BASE_URL],
  },
}

// FAQ schema - great for GEO and featured snippets
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${BASE_URL}/#faq`,
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a Gaussian Splat?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Gaussian Splats (3DGS - 3D Gaussian Splatting) are a revolutionary 3D representation method that uses millions of tiny 3D gaussians to create photorealistic, real-time renderable 3D scenes. They offer faster rendering and higher visual quality compared to traditional methods like NeRFs or photogrammetry meshes.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I view a Gaussian Splat online?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can view Gaussian Splats online using Splat Labs viewer. Simply upload your .ply or .splat file to splatlabs.rockrobotic.com, and you can instantly view it in your browser. No software installation required - just WebGL support.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I share Gaussian Splats with others?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! Splat Labs makes sharing Gaussian Splats easy. Upload your splat, get a shareable link, and anyone can view your 3D scene in their browser. You can also embed splats directly into websites using our embed player.',
      },
    },
    {
      '@type': 'Question',
      name: 'What file formats does Splat Labs support?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Splat Labs supports .ply and .splat file formats for Gaussian Splats. We also support point cloud formats like .las, .laz, and .e57 which can be converted to Gaussian Splats using our LiDAR-to-Splat pipeline.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Splat Labs free to use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, Splat Labs offers a free tier that allows you to upload and share Gaussian Splats. Premium plans are available for professionals who need more storage, advanced features like AI virtual staging, and team collaboration tools.',
      },
    },
  ],
}

// HowTo schema for common use cases
const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  '@id': `${BASE_URL}/#howto-upload`,
  name: 'How to Upload and Share a Gaussian Splat',
  description:
    'Learn how to upload your Gaussian Splat file and share it with anyone using Splat Labs cloud platform.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Create an account',
      text: 'Sign up for a free Splat Labs account at splatlabs.rockrobotic.com',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Upload your splat file',
      text: 'Drag and drop your .ply or .splat file into the upload area, or click to browse files',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Wait for processing',
      text: 'Splat Labs will process your file and optimize it for web viewing',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Share your splat',
      text: 'Copy the share link and send it to anyone. They can view your 3D scene instantly in their browser',
    },
  ],
  totalTime: 'PT5M',
}

export function StructuredData() {
  const schemas = [
    organizationSchema,
    websiteSchema,
    softwareApplicationSchema,
    webPageSchema,
    faqSchema,
    howToSchema,
  ]

  return (
    <>
      {schemas.map((schema, index) => (
        <Script
          key={index}
          id={`structured-data-${index}`}
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}
    </>
  )
}

// Export individual schemas for page-specific use
export {
  organizationSchema,
  websiteSchema,
  softwareApplicationSchema,
  webPageSchema,
  faqSchema,
  howToSchema,
}
