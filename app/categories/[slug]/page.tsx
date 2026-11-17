// app/categories/[slug]/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Hero from '@/components/Hero'
import BlogCard from '@/components/BlogCard'
import { getCategories, getCategoryBySlug, getPostsByCategory } from '@/lib/cosmic'
import { getMetafieldValue } from '@/lib/normalize'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)
  return { title: category ? category.title : 'Category' }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)
  if (!category) notFound()

  const [posts, categories] = await Promise.all([
    getPostsByCategory(category.id),
    getCategories(),
  ])

  return (
    <>
      <Hero
        compact
        eyebrow="Category"
        headline={category.title}
        subheadline={getMetafieldValue(category.metadata?.description)}
      />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
          <Link
            href="/blog"
            className="rounded-full bg-slate-100 px-4 py-1.5 text-sm font-medium text-slate-700 hover:bg-indigo-100 hover:text-indigo-700"
          >
            All
          </Link>
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/categories/${c.slug}`}
              className={`rounded-full px-4 py-1.5 text-sm font-medium ${
                c.id === category.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-indigo-100 hover:text-indigo-700'
              }`}
            >
              {c.title}
            </Link>
          ))}
        </div>
        {posts.length === 0 ? (
          <p className="text-center text-slate-500">No posts in this category yet.</p>
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