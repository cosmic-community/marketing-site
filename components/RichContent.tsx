import type { ReactNode } from 'react'

interface RichContentProps {
  content: string
  className?: string
}

function renderInline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**') && part.length > 4 ? (
      <strong key={i}>{part.slice(2, -2)}</strong>
    ) : (
      <span key={i}>{part}</span>
    )
  )
}

export default function RichContent({ content, className = '' }: RichContentProps) {
  if (!content || !content.trim()) return null

  const proseClass = `prose prose-slate max-w-none prose-a:text-indigo-600 ${className}`

  if (/<\/?[a-z][\s\S]*>/i.test(content)) {
    return <div className={proseClass} dangerouslySetInnerHTML={{ __html: content }} />
  }

  const blocks = content.split(/\n{2,}/)

  return (
    <div className={proseClass}>
      {blocks.map((block, i) => {
        const text = block.trim()
        if (!text) return null
        if (text.startsWith('### ')) return <h3 key={i}>{renderInline(text.slice(4))}</h3>
        if (text.startsWith('## ')) return <h2 key={i}>{renderInline(text.slice(3))}</h2>
        if (text.startsWith('# ')) return <h2 key={i}>{renderInline(text.slice(2))}</h2>
        const lines = text.split(/\r?\n/)
        if (lines.every((l) => /^\s*[-*]\s+/.test(l))) {
          return (
            <ul key={i}>
              {lines.map((l, j) => (
                <li key={j}>{renderInline(l.replace(/^\s*[-*]\s+/, ''))}</li>
              ))}
            </ul>
          )
        }
        return <p key={i}>{renderInline(text)}</p>
      })}
    </div>
  )
}