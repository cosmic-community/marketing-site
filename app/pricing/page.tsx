import type { Metadata } from 'next'
import Hero from '@/components/Hero'
import PricingCard from '@/components/PricingCard'
import FAQList from '@/components/FAQList'
import SectionHeading from '@/components/SectionHeading'
import CTASection from '@/components/CTASection'
import { getFaqs, getPageByType, getPricingPlans } from '@/lib/cosmic'
import { getMetafieldValue } from '@/lib/normalize'
import type { FaqGroup } from '@/components/FAQList'

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Simple, transparent pricing for teams of every size.',
}

export default async function PricingPage() {
  const [page, plans, faqs] = await Promise.all([
    getPageByType('pricing'),
    getPricingPlans(),
    getFaqs(),
  ])
  const meta = page?.metadata

  const groups = new Map<string, FaqGroup['items']>()
  for (const faq of faqs) {
    const name = getMetafieldValue(faq.metadata?.group) || 'General'
    const list = groups.get(name) ?? []
    list.push({
      id: faq.id,
      question: getMetafieldValue(faq.metadata?.question) || faq.title,
      answer: getMetafieldValue(faq.metadata?.answer),
    })
    groups.set(name, list)
  }
  const faqGroups: FaqGroup[] = Array.from(groups.entries()).map(([name, items]) => ({
    name,
    items,
  }))

  return (
    <>
      <Hero
        compact
        eyebrow="Pricing"
        headline={getMetafieldValue(meta?.hero_headline) || 'Simple, transparent pricing'}
        subheadline={
          getMetafieldValue(meta?.hero_subheadline) || 'Choose the plan that fits your team. Upgrade or cancel any time.'
        }
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {plans.length === 0 && (
          <p className="text-center text-slate-500">Pricing plans coming soon.</p>
        )}
        <div className="grid items-stretch gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>
      </section>

      {faqGroups.length > 0 && (
        <section className="bg-slate-50 py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="FAQ"
              title="Frequently asked questions"
              description="Can't find what you're looking for? Get in touch with our team."
            />
            <div className="mt-12">
              <FAQList groups={faqGroups} />
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  )
}