import ButtonLink from '@/components/ButtonLink'

interface CTASectionProps {
  heading?: string
  text?: string
  primaryLabel?: string
  primaryUrl?: string
  secondaryLabel?: string
  secondaryUrl?: string
}

export default function CTASection({
  heading = 'Ready to get started?',
  text = 'Join thousands of teams already building better products with us.',
  primaryLabel = 'View pricing',
  primaryUrl = '/pricing',
  secondaryLabel = 'Talk to us',
  secondaryUrl = '/contact',
}: CTASectionProps) {
  return (
    <section className="bg-indigo-600">
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{heading}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-indigo-100">{text}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <ButtonLink href={primaryUrl} variant="light">
            {primaryLabel}
          </ButtonLink>
          <ButtonLink
            href={secondaryUrl}
            variant="secondary"
            className="!bg-transparent !text-white !ring-white/50 hover:!bg-indigo-500"
          >
            {secondaryLabel}
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}