import type { Metadata } from 'next'
import Hero from '@/components/Hero'
import ContactForm from '@/components/ContactForm'
import { getPageByType, getSiteSettings } from '@/lib/cosmic'
import { getMetafieldValue } from '@/lib/normalize'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with our team.',
}

export default async function ContactPage() {
  const [page, settings] = await Promise.all([getPageByType('contact'), getSiteSettings()])
  const meta = page?.metadata
  const email = getMetafieldValue(settings?.metadata?.contact_email)
  const phone = getMetafieldValue(settings?.metadata?.contact_phone)
  const address = getMetafieldValue(settings?.metadata?.address)

  return (
    <>
      <Hero
        compact
        eyebrow="Contact"
        headline={getMetafieldValue(meta?.hero_headline) || "Let's talk"}
        subheadline={
          getMetafieldValue(meta?.hero_subheadline) || "Questions, feedback or ready to get started? We'd love to hear from you."
        }
      />

      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-5 lg:px-8">
        <div className="space-y-8 lg:col-span-2">
          <h2 className="text-2xl font-bold text-slate-900">Contact information</h2>
          {email && (
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Email</p>
              <a href={`mailto:${email}`} className="mt-1 block text-lg text-indigo-600 hover:text-indigo-500">
                {email}
              </a>
            </div>
          )}
          {phone && (
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Phone</p>
              <a href={`tel:${phone}`} className="mt-1 block text-lg text-slate-900 hover:text-indigo-600">
                {phone}
              </a>
            </div>
          )}
          {address && (
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Address</p>
              <p className="mt-1 whitespace-pre-line text-lg text-slate-900">{address}</p>
            </div>
          )}
          {!email && !phone && !address && (
            <p className="text-slate-500">Contact details will appear here once added in Cosmic.</p>
          )}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:col-span-3">
          <h2 className="text-2xl font-bold text-slate-900">Send us a message</h2>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  )
}