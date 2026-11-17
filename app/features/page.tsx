import type { Metadata } from 'next'
import Hero from '@/components/Hero'
import RichContent from '@/components/RichContent'
import CTASection from '@/components/CTASection'
import { getFeatures, getPageByType } from '@/lib/cosmic'
import { getMetafieldValue, imageUrl, resolveIcon } from '@/lib/normalize'

export const metadata: Metadata = {
  title: 'Features',
  description: 'Explore the features that make our product stand out.',
}

export default async function FeaturesPage() {
  const [page, features] = await Promise.all([getPageByType('features'), getFeatures()])
  const meta = page?.metadata

  return (
    <>
      <Hero
        compact
        eyebrow="Features"
        headline={getMetafieldValue(meta?.hero_headline) || 'Powerful features, thoughtfully designed'}
        subheadline={getMetafieldValue(meta?.hero_subheadline)}
      />

      <section className="mx-auto max-w-7xl space-y-24 px-4 py-20 sm:px-6 lg:px-8">
        {features.length === 0 && (
          <p className="text-center text-slate-500">No features published yet.</p>
        )}
        {features.map((feature, index) => {
          const icon = resolveIcon(feature.metadata?.icon)
          const image = imageUrl(feature.metadata?.image, 'w=1200&h=900&fit=crop&auto=format,compress')
          const details = getMetafieldValue(feature.metadata?.details)
          return (
            <article
              key={feature.id}
              className={`flex flex-col items-center gap-10 lg:gap-16 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'
              }`}
            >
              <div className="flex-1">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-100 text-2xl">
                  {icon.url ? (
                    <img src={icon.url} alt="" width={32} height={32} className="h-8 w-8 object-contain" />
                  ) : (
                    <span>{icon.text}</span>
                  )}
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900">{feature.title}</h2>
                <p className="mt-3 text-lg text-slate-600">
                  {getMetafieldValue(feature.metadata?.summary)}
                </p>
                {details && <RichContent content={details} className="mt-4" />}
              </div>
              {image && (
                <div className="w-full flex-1">
                  <img
                    src={image}
                    alt={feature.title}
                    width={600}
                    height={450}
                    className="h-auto w-full rounded-2xl object-cover shadow-xl"
                  />
                </div>
              )}
            </article>
          )
        })}
      </section>

      <CTASection />
    </>
  )
}