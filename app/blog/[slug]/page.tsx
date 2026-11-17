// app/blog/[slug]/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import RichContent from '@/components/RichContent'
import CTASection from '@/components/CTASection'
import { getBlogPostBySlug } from '@/lib/cosmic'
import { formatDate, getMetafieldValue, imageUrl } from '@/lib/normalize'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  if (!post) return { title: 'Post not found' }
  return {
    title: post.title,
    description: getMetafieldValue(post.metadata?.excerpt),
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  if (!post) notFound()

  const meta = post.metadata
  const author = meta?.author
  const category = meta?.category
  const hero = imageUrl(meta?.featured_image, 'w=1800&h=900&fit=crop&auto=format,compress')
  const avatar = imageUrl(author?.metadata?.avatar, 'w=96&h=96&fit=crop&auto=format,compress')
  const date = formatDate(getMetafieldValue(meta?.publish_date) || post.created_at)
  const content = getMetafieldValue(meta?.content) || post.content || ''

  return (
    <>
      <meta
        name="cosmic-context"
        content={JSON.stringify({ object_id: post.id, object_type: post.type })}
      />
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <Link href="/blog" className="text-sm font-semibold text-indigo-600 hover:text-indigo-500">
          ← Back to blog
        </Link>

        {category && category.slug && (
          <div className="mt-6">
            <Link
              href={`/categories/${category.slug}`}
              className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-700"
            >
              {category.title}
            </Link>
          </div>
        )}

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          {post.title}
        </h1>

        <div className="mt-6 flex items-center gap-3 text-sm text-slate-600">
          {author && author.slug && (
            <Link href={`/authors/${author.slug}`} className="flex items-center gap-3 hover:text-indigo-600">
              {avatar && (
                <img src={avatar} alt={author.title} width={40} height={40} className="h-10 w-10 rounded-full object-cover" />
              )}
              <span className="font-medium">{author.title}</span>
            </Link>
          )}
          {date && <span>· {date}</span>}
        </div>

        {hero && (
          <img
            src={hero}
            alt={post.title}
            width={900}
            height={450}
            className="mt-10 h-auto w-full rounded-2xl object-cover shadow-lg"
          />
        )}

        <RichContent content={content} className="mt-10" />

        {author && author.slug && getMetafieldValue(author.metadata?.bio) && (
          <div className="mt-16 flex items-start gap-4 rounded-2xl bg-slate-50 p-6">
            {avatar && (
              <img src={avatar} alt={author.title} width={56} height={56} className="h-14 w-14 rounded-full object-cover" />
            )}
            <div>
              <p className="text-sm text-slate-500">Written by</p>
              <Link href={`/authors/${author.slug}`} className="font-semibold text-slate-900 hover:text-indigo-600">
                {author.title}
              </Link>
              <p className="mt-1 text-sm text-slate-600">{getMetafieldValue(author.metadata?.bio)}</p>
            </div>
          </div>
        )}
      </article>
      <CTASection />
    </>
  )
}