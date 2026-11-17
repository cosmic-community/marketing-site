import ButtonLink from '@/components/ButtonLink'
import type { CtaButton } from '@/lib/normalize'

interface HeroProps {
  headline: string
  subheadline?: string
  imageUrl?: string
  buttons?: CtaButton[]
  eyebrow?: string
  compact?: boolean
}

export default function Hero({
  headline,
  subheadline,
  imageUrl,
  buttons = [],
  eyebrow,
  compact = false,
}: HeroProps) {
  const hasImage = Boolean(imageUrl)

  return (
    <section className="bg-gradient-to-b from-indigo-50 via-white to-white">
      <div
        className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${compact ? 'py-16 sm:py-20' : 'py-20 sm:py-28'} ${
          hasImage ? 'grid items-center gap-12 lg:grid-cols-2' : ''
        }`}
      >
        <div className={hasImage ? '' : 'mx-auto max-w-3xl text-center'}>
          {eyebrow && (
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-indigo-600">
              {eyebrow}
            </p>
          )}
          <h1
            className={`font-bold tracking-tight text-slate-900 ${
              compact ? 'text-4xl sm:text-5xl' : 'text-4xl sm:text-5xl lg:text-6xl'
            }`}
          >
            {headline}
          </h1>
          {subheadline && (
            <p className="mt-6 text-lg leading-8 text-slate-600">{subheadline}</p>
          )}
          {buttons.length > 0 && (
            <div
              className={`mt-10 flex flex-wrap gap-4 ${hasImage ? '' : 'justify-center'}`}
            >
              {buttons.map((button) => (
                <ButtonLink
                  key={`${button.label}-${button.url}`}
                  href={button.url}
                  variant={button.style === 'primary' ? 'primary' : 'secondary'}
                >
                  {button.label}
                </ButtonLink>
              ))}
            </div>
          )}
        </div>
        {hasImage && imageUrl && (
          <div>
            <img
              src={imageUrl}
              alt={headline}
              width={800}
              height={600}
              className="h-auto w-full rounded-2xl object-cover shadow-2xl"
            />
          </div>
        )}
      </div>
    </section>
  )
}