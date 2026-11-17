import type { Metadata } from 'next'
import Link from 'next/link'
import Hero from '@/components/Hero'
import BlogCard from '@/components/BlogCard'
import { getBlogPosts, getCategories, getPageByType } from '@/lib/cosmic'
import { getMetafieldValue } from '@/lib/normalize'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'News, tips and insights from our team.',
}

export default async function BlogPage() {
  const [page, posts, categories] = await Promise.all([
    getPageByType('blog'),
    getBlogPosts(),
    getCategories(),
  ])
  const meta = page?.metadata

  return (
    <>
      <Hero
        compact
        eyebrow="Blog"
        headline={getMetafieldValue(meta?.hero_headline) || 'Insights and updates'}
        subheadline={
          getMetafieldValue(meta?.hero_subheadline) || 'News, product updates and ideas from our team.'
        }
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {categories.length > 0 && (
          <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
            <span className="rounded-full bg-indigo-600 px-4 py-1.5 text-sm font-medium text-white">
              All
            </span>
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="rounded-full bg-slate-100 px-4 py-1.5 text-sm font-medium text-slate-700 hover:bg-indigo-100 hover:text-indigo-700"
              >
                {category.title}
              </Link>
            ))}
          </div>
        )}

        {posts.length === 0 ? (
          <p className="text-center text-slate-500">No posts published yet.</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>
    </>
  )
}