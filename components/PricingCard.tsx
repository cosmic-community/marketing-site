import ButtonLink from '@/components/ButtonLink'
import { formatPrice, getMetafieldValue, toBool, toStringList } from '@/lib/normalize'
import type { PricingPlan } from '@/types'

export default function PricingCard({ plan }: { plan: PricingPlan }) {
  const meta = plan.metadata
  const popular = toBool(meta?.most_popular)
  const features = toStringList(meta?.plan_features)
  const period = getMetafieldValue(meta?.billing_period)
  const description = getMetafieldValue(meta?.description)
  const cta = getMetafieldValue(meta?.cta_label) || 'Get started'

  return (
    <div
      className={`relative flex h-full flex-col rounded-2xl bg-white p-8 ${
        popular
          ? 'shadow-xl ring-2 ring-indigo-600'
          : 'shadow-sm ring-1 ring-slate-200'
      }`}
    >
      {popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white">
          Most popular
        </span>
      )}
      <h3 className="text-xl font-semibold text-slate-900">{plan.title}</h3>
      {description && <p className="mt-2 text-sm text-slate-600">{description}</p>}
      <p className="mt-6 flex items-baseline gap-1">
        <span className="text-4xl font-bold tracking-tight text-slate-900">
          {formatPrice(meta?.price)}
        </span>
        {period && <span className="text-sm text-slate-500">/{period.replace(/^\//, '')}</span>}
      </p>
      <ul className="mt-8 flex-1 space-y-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm text-slate-700">
            <svg className="mt-0.5 h-5 w-5 flex-none text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                clipRule="evenodd"
              />
            </svg>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <ButtonLink
        href="/contact"
        variant={popular ? 'primary' : 'secondary'}
        className="mt-8 w-full"
      >
        {cta}
      </ButtonLink>
    </div>
  )
}