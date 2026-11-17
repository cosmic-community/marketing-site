import type { LogoItem } from '@/lib/normalize'

export default function LogoStrip({ logos }: { logos: LogoItem[] }) {
  if (!logos || logos.length === 0) return null

  return (
    <section className="border-y border-slate-200 bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold uppercase tracking-wide text-slate-500">
          Trusted by teams at
        </p>
        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {logos.map((logo, index) => (
            <li key={`${logo.name}-${index}`} className="flex items-center">
              {logo.imageUrl ? (
                <img
                  src={logo.imageUrl}
                  alt={logo.name || 'Company logo'}
                  width={120}
                  height={40}
                  className="h-8 w-auto object-contain opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0"
                />
              ) : (
                <span className="text-xl font-bold text-slate-400">{logo.name}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}