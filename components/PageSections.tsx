import RichContent from '@/components/RichContent'
import type { SectionItem } from '@/lib/normalize'

export default function PageSections({ sections }: { sections: SectionItem[] }) {
  if (!sections || sections.length === 0) return null

  return (
    <div className="mx-auto max-w-7xl space-y-20 px-4 py-20 sm:px-6 lg:px-8">
      {sections.map((section, index) => (
        <section
          key={`${section.heading}-${index}`}
          className={`flex flex-col items-center gap-10 lg:gap-16 ${
            index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'
          }`}
        >
          <div className="flex-1">
            {section.heading && (
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">{section.heading}</h2>
            )}
            <RichContent content={section.body} className="mt-4 text-lg" />
          </div>
          {section.imageUrl && (
            <div className="w-full flex-1">
              <img
                src={section.imageUrl}
                alt={section.heading || 'Section image'}
                width={600}
                height={450}
                className="h-auto w-full rounded-2xl object-cover shadow-xl"
              />
            </div>
          )}
        </section>
      ))}
    </div>
  )
}