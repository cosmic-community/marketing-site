import RichContent from '@/components/RichContent'

export interface FaqItem {
  id: string
  question: string
  answer: string
}

export interface FaqGroup {
  name: string
  items: FaqItem[]
}

export default function FAQList({ groups }: { groups: FaqGroup[] }) {
  if (!groups || groups.length === 0) return null
  const showGroupNames = groups.length > 1

  return (
    <div className="space-y-10">
      {groups.map((group) => (
        <div key={group.name}>
          {showGroupNames && (
            <h3 className="mb-4 text-lg font-semibold text-slate-900">{group.name}</h3>
          )}
          <div className="divide-y divide-slate-200 rounded-2xl bg-white ring-1 ring-slate-200">
            {group.items.map((item) => (
              <details key={item.id} className="group p-5">
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-left font-medium text-slate-900">
                  <span>{item.question}</span>
                  <span className="text-xl text-indigo-600 transition-transform group-open:rotate-45">+</span>
                </summary>
                <RichContent content={item.answer} className="mt-3 text-slate-600" />
              </details>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}