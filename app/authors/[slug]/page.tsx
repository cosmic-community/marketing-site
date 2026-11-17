// app/authors/[slug]/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Hero from '@/components/Hero'
import BlogCard from '@/components/BlogCard'
import { getAuthorBySlug, getPostsByAuthor } from '@/lib/cosmic'
import { getMetafieldValue } from '@/lib/normalize'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const author = await getAuthorBySlug(slug)
  return { title: author ? author.title : 'Author' }
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const author = await getAuthorBySlug(slug)
  if (!author) notFound()

  const posts = await getPostsByAuthor(author.id)

  return (
    <>
      <Hero
        compact
        eyebrow="Author"
        headline={author.title}
        subheadline={getMetafieldValue(author.metadata?.bio)}
      />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {posts.length === 0 ? (
          <p className="text-center text-slate-500">No posts by this author yet.</p>
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