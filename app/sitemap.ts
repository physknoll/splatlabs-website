import { MetadataRoute } from 'next'

const BASE_URL = 'https://splatlabs.rockrobotic.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  // Core pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    // Add more pages as they're created:
    // {
    //   url: `${BASE_URL}/pricing`,
    //   lastModified: now,
    //   changeFrequency: 'monthly',
    //   priority: 0.9,
    // },
    // {
    //   url: `${BASE_URL}/features`,
    //   lastModified: now,
    //   changeFrequency: 'monthly',
    //   priority: 0.8,
    // },
    // {
    //   url: `${BASE_URL}/about`,
    //   lastModified: now,
    //   changeFrequency: 'monthly',
    //   priority: 0.7,
    // },
    // {
    //   url: `${BASE_URL}/contact`,
    //   lastModified: now,
    //   changeFrequency: 'yearly',
    //   priority: 0.5,
    // },
  ]

  // In the future, dynamically fetch public splats/galleries
  // const publicSplats = await getPublicSplats()
  // const splatPages = publicSplats.map((splat) => ({
  //   url: `${BASE_URL}/view/${splat.id}`,
  //   lastModified: splat.updatedAt,
  //   changeFrequency: 'weekly' as const,
  //   priority: 0.6,
  // }))

  return [...staticPages]
}
