import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const BLOG_DIR = path.join(process.cwd(), 'content/blog')

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  author: string
  authorImage?: string
  image?: string
  category: string
  tags: string[]
  readingTime: string
  content: string
}

export interface BlogPostMeta {
  slug: string
  title: string
  description: string
  date: string
  author: string
  authorImage?: string
  image?: string
  category: string
  tags: string[]
  readingTime: string
}

export async function getAllPosts(): Promise<BlogPostMeta[]> {
  if (!fs.existsSync(BLOG_DIR)) {
    return []
  }

  const files = fs.readdirSync(BLOG_DIR)
  const posts = files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const filePath = path.join(BLOG_DIR, file)
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      const { data, content } = matter(fileContent)
      const slug = file.replace('.mdx', '')
      const stats = readingTime(content)

      return {
        slug,
        title: data.title || '',
        description: data.description || '',
        date: data.date || '',
        author: data.author || '',
        authorImage: data.authorImage || null,
        image: data.image || null,
        category: data.category || 'General',
        tags: data.tags || [],
        readingTime: stats.text,
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return posts
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(fileContent)
  const stats = readingTime(content)

  return {
    slug,
    title: data.title || '',
    description: data.description || '',
    date: data.date || '',
    author: data.author || '',
    authorImage: data.authorImage || null,
    image: data.image || null,
    category: data.category || 'General',
    tags: data.tags || [],
    readingTime: stats.text,
    content,
  }
}

export async function getPostsByCategory(category: string): Promise<BlogPostMeta[]> {
  const posts = await getAllPosts()
  return posts.filter((post) => post.category.toLowerCase() === category.toLowerCase())
}

export async function getPostsByTag(tag: string): Promise<BlogPostMeta[]> {
  const posts = await getAllPosts()
  return posts.filter((post) =>
    post.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
  )
}

export async function getAllCategories(): Promise<string[]> {
  const posts = await getAllPosts()
  const categories = new Set(posts.map((post) => post.category))
  return Array.from(categories)
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts()
  const tags = new Set(posts.flatMap((post) => post.tags))
  return Array.from(tags)
}

export async function getRelatedPosts(currentSlug: string, limit = 3): Promise<BlogPostMeta[]> {
  const currentPost = await getPostBySlug(currentSlug)
  if (!currentPost) return []

  const allPosts = await getAllPosts()
  const otherPosts = allPosts.filter((post) => post.slug !== currentSlug)

  // Score posts by matching tags and category
  const scoredPosts = otherPosts.map((post) => {
    let score = 0
    if (post.category === currentPost.category) score += 2
    const matchingTags = post.tags.filter((tag) =>
      currentPost.tags.includes(tag)
    )
    score += matchingTags.length
    return { post, score }
  })

  return scoredPosts
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ post }) => post)
}
