import Link from 'next/link'
import type { ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'light'

interface ButtonLinkProps {
  href: string
  children: ReactNode
  variant?: Variant
  className?: string
}

const styles: Record<Variant, string> = {
  primary: 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-500',
  secondary: 'bg-white text-slate-900 ring-1 ring-inset ring-slate-300 hover:bg-slate-50',
  light: 'bg-white text-indigo-700 shadow-sm hover:bg-indigo-50',
}

export default function ButtonLink({
  href,
  children,
  variant = 'primary',
  className = '',
}: ButtonLinkProps) {
  const classes = `inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold transition-colors ${styles[variant]} ${className}`

  if (/^(https?:|mailto:|tel:)/i.test(href)) {
    const external = href.startsWith('http')
    return (
      <a
        href={href}
        className={classes}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  )
}