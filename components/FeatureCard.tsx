import { getMetafieldValue, resolveIcon } from '@/lib/normalize'
import type { Feature } from '@/types'

export default function FeatureCard({ feature }: { feature: Feature }) {
  const icon = resolveIcon(feature.metadata?.icon)
  const summary = getMetafieldValue(feature.metadata?.summary)

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-2xl">
        {icon.url ? (
          <img src={icon.url} alt="" width={28} height={28} className="h-7 w-7 object-contain" />
        ) : (
          <span>{icon.text}</span>
        )}
      </div>
      <h3 className="text-lg font-semibold text-slate-900">{feature.title}</h3>
      {summary && <p className="mt-2 text-slate-600">{summary}</p>}
    </div>
  )
}