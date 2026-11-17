import Link from 'next/link'
import Hero from '@/components/Hero'
import LogoStrip from '@/components/LogoStrip'
import SectionHeading from '@/components/SectionHeading'
import FeatureCard from '@/components/FeatureCard'
import TestimonialCard from '@/components/TestimonialCard'
import CTASection from '@/components/CTASection'
import { getFeatures, getPageByType, getSiteSettings, getTestimonials } from '@/lib/cosmic'
import {
  getMetafieldValue,
  imageUrl,
  normalizeButtons,
  normalizeLogos,
  pickObjects,
} from '@/lib/normalize'
import type { CtaButton } from '@/lib/normalize'
import type { Feature, Testimonial } from '@/types'

export default async function HomePage() {
  const [page, settings, allFeatures, allTestimonials] = await Promise.all([
    getPageByType('home'),
    getSiteSettings(),
    getFeatures(),
    getTestimonials(),
  ])

  const meta = page?.metadata
  const defaultButtons: CtaButton[] = [
    { label: 'Get started', url: '/pricing', style: 'primary' },
    { label: 'Explore features', url: '/features', style: 'secondary' },
  ]
  const buttons = normalizeButtons(meta?.cta_buttons)

  const featuredFeatures = pickObjects<Feature>(meta?.featured_features)
  const features = featuredFeatures.length > 0 ? featuredFeatures : allFeatures.slice(0, 6)

  const featuredTestimonials = pickObjects<Testimonial>(meta?.featured_testimonials)
  const testimonials =
    featuredTestimonials.length > 0 ? featuredTestimonials : allTestimonials.slice(0, 3)

  const headline =
    getMetafieldValue(meta?.hero_headline) ||
    getMetafieldValue(settings?.metadata?.tagline) ||
    'Build something customers love'

  return (
    <>
      <Hero
        headline={headline}
        subheadline={getMetafieldValue(meta?.hero_subheadline)}
        imageUrl={imageUrl(meta?.hero_image, 'w=1600&h=1200&fit=crop&auto=format,compress')}
        buttons={buttons.length > 0 ? buttons : defaultButtons}
      />

      <LogoStrip logos={normalizeLogos(meta?.logo_strip)} />

      {features.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Features"
            title="Everything you need to move faster"
            description="Powerful capabilities designed to help your team ship with confidence."
          />
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <FeatureCard key={feature.id} feature={feature} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/features" className="font-semibold text-indigo-600 hover:text-indigo-500">
              See all features →
            </Link>
          </div>
        </section>
      )}

      {testimonials.length > 0 && (
        <section className="bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Testimonials"
              title="Loved by teams everywhere"
              description="Hear from customers who made the switch."
            />
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t) => (
                <TestimonialCard key={t.id} testimonial={t} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  )
}