import Link from 'next/link'
import { formatDate, getMetafieldValue, imageUrl } from '@/lib/normalize'
import type { BlogPost } from '@/types'

export default function BlogCard({ post }: { post: BlogPost }) {
  const meta = post.metadata
  const image = imageUrl(meta?.featured_image, 'w=1000&h=600&fit=crop&auto=format,compress')
  const category = meta?.category
  const author = meta?.author
  const date = formatDate(getMetafieldValue(meta?.publish_date) || post.created_at)
  const excerpt = getMetafieldValue(meta?.excerpt)

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition-shadow hover:shadow-md">
      <Link href={`/blog/${post.slug}`} className="block">
        {image ? (
          <img
            src={image}
            alt={post.title}
            width={500}
            height={300}
            className="aspect-[5/3] w-full object-cover"
          />
        ) : (
          <div className="aspect-[5/3] w-full bg-gradient-to-br from-indigo-100 to-slate-100" />
        )}
      </Link>
      <div className="flex flex-1 flex-col p-6">
        {category && category.title && (
          <span className="mb-3 w-fit rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-700">
            {category.title}
          </span>
        )}
        <h3 className="text-xl font-semibold text-slate-900">
          <Link href={`/blog/${post.slug}`} className="hover:text-indigo-600">
            {post.title}
          </Link>
        </h3>
        {excerpt && <p className="mt-2 line-clamp-3 flex-1 text-slate-600">{excerpt}</p>}
        <p className="mt-4 text-sm text-slate-500">
          {author && author.title ? `${author.title}` : ''}
          {author && author.title && date ? ' · ' : ''}
          {date}
        </p>
      </div>
    </article>
  )
}