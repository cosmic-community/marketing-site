import { createBucketClient } from '@cosmicjs/sdk'
import { getCosmic } from '@/lib/cosmic-preview'
import { getMetafieldValue, toNumber } from '@/lib/normalize'
import type {
  Author,
  BlogPost,
  Category,
  Faq,
  Feature,
  PageObject,
  PricingPlan,
  SiteSettings,
  TeamMember,
  Testimonial,
} from '@/types'

export { getMetafieldValue } from '@/lib/normalize'

// Write client (server-side only). Reads that render pages use getCosmic().
export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

async function fetchObjects<T>(
  type: string,
  filter: Record<string, unknown> = {}
): Promise<T[]> {
  try {
    const { cosmic: client, previewToken } = await getCosmic()
    const query = client.objects.find({ type, ...filter }).depth(1)
    const response = previewToken ? await query.status('any') : await query
    return (response.objects ?? []) as T[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw error
  }
}

function sortByOrder<T extends { metadata: { sort_order?: number | string } }>(
  items: T[]
): T[] {
  return [...items].sort(
    (a, b) =>
      toNumber(a.metadata?.sort_order, 999) -
      toNumber(b.metadata?.sort_order, 999)
  )
}

function postTime(post: BlogPost): number {
  const raw = getMetafieldValue(post.metadata?.publish_date) || post.created_at
  const time = Date.parse(raw)
  return Number.isNaN(time) ? 0 : time
}

function sortPosts(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort((a, b) => postTime(b) - postTime(a))
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  const items = await fetchObjects<SiteSettings>('site-settings')
  return items[0] ?? null
}

export async function getPageByType(type: string): Promise<PageObject | null> {
  const key = type.toLowerCase()
  const pages = await fetchObjects<PageObject>('pages')
  return (
    pages.find((p) => p.slug === key) ??
    pages.find((p) =>
      getMetafieldValue(p.metadata?.page_type).toLowerCase().includes(key)
    ) ??
    pages.find((p) => p.slug.includes(key)) ??
    null
  )
}

export async function getFeatures(): Promise<Feature[]> {
  return sortByOrder(await fetchObjects<Feature>('features'))
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return fetchObjects<Testimonial>('testimonials')
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  return fetchObjects<TeamMember>('team-members')
}

export async function getPricingPlans(): Promise<PricingPlan[]> {
  return sortByOrder(await fetchObjects<PricingPlan>('pricing-plans'))
}

export async function getFaqs(): Promise<Faq[]> {
  return fetchObjects<Faq>('faqs')
}

export async function getCategories(): Promise<Category[]> {
  return fetchObjects<Category>('categories')
}

export async function getAuthors(): Promise<Author[]> {
  return fetchObjects<Author>('authors')
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  return sortPosts(await fetchObjects<BlogPost>('blog-posts'))
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const items = await fetchObjects<BlogPost>('blog-posts', { slug })
  return items[0] ?? null
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const items = await fetchObjects<Category>('categories', { slug })
  return items[0] ?? null
}

export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  const items = await fetchObjects<Author>('authors', { slug })
  return items[0] ?? null
}

export async function getPostsByCategory(categoryId: string): Promise<BlogPost[]> {
  return sortPosts(
    await fetchObjects<BlogPost>('blog-posts', { 'metadata.category': categoryId })
  )
}

export async function getPostsByAuthor(authorId: string): Promise<BlogPost[]> {
  return sortPosts(
    await fetchObjects<BlogPost>('blog-posts', { 'metadata.author': authorId })
  )
}