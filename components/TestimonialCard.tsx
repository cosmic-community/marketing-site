import { getMetafieldValue, imageUrl, toNumber } from '@/lib/normalize'
import type { Testimonial } from '@/types'

export default function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const meta = testimonial.metadata
  const name = getMetafieldValue(meta?.customer_name) || testimonial.title
  const role = getMetafieldValue(meta?.role)
  const company = getMetafieldValue(meta?.company)
  const avatar = imageUrl(meta?.avatar, 'w=112&h=112&fit=crop&auto=format,compress')
  const rating = Math.max(0, Math.min(5, Math.round(toNumber(meta?.rating, 5))))
  const subtitle = [role, company].filter((s) => s.length > 0).join(', ')

  return (
    <figure className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="flex gap-0.5 text-amber-400" aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: 5 }, (_, i) => (
          <svg
            key={i}
            className={`h-5 w-5 ${i < rating ? 'text-amber-400' : 'text-slate-200'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        ))}
      </div>
      <blockquote className="mt-4 flex-1 text-slate-700">
        &ldquo;{getMetafieldValue(meta?.quote)}&rdquo;
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        {avatar ? (
          <img src={avatar} alt={name} width={48} height={48} className="h-12 w-12 rounded-full object-cover" />
        ) : (
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-700">
            {name.charAt(0)}
          </span>
        )}
        <div>
          <p className="font-semibold text-slate-900">{name}</p>
          {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
        </div>
      </figcaption>
    </figure>
  )
}