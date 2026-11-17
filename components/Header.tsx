'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import type { NavItem } from '@/lib/normalize'

interface HeaderProps {
  siteName: string
  logoUrl: string
  links: NavItem[]
}

export default function Header({ siteName, logoUrl, links }: HeaderProps) {
  const [open, setOpen] = useState<boolean>(false)
  const pathname = usePathname()

  const isActive = (url: string): boolean =>
    url === '/' ? pathname === '/' : pathname === url || pathname.startsWith(`${url}/`)

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold text-slate-900">
          {logoUrl ? (
            <img src={logoUrl} alt={siteName} width={32} height={32} className="h-8 w-8 object-contain" />
          ) : (
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
              {siteName.charAt(0)}
            </span>
          )}
          <span>{siteName}</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {links.map((link) => (
            <Link
              key={`${link.label}-${link.url}`}
              href={link.url}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive(link.url)
                  ? 'text-indigo-600'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/pricing"
            className="ml-3 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
          >
            Get started
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-slate-700 hover:bg-slate-100 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-slate-200 bg-white px-4 py-3 md:hidden" aria-label="Mobile navigation">
          {links.map((link) => (
            <Link
              key={`m-${link.label}-${link.url}`}
              href={link.url}
              onClick={() => setOpen(false)}
              className={`block rounded-md px-3 py-2 text-base font-medium ${
                isActive(link.url) ? 'bg-indigo-50 text-indigo-600' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/pricing"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-lg bg-indigo-600 px-4 py-2 text-center text-base font-semibold text-white"
          >
            Get started
          </Link>
        </nav>
      )}
    </header>
  )
}