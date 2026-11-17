import Link from 'next/link'
import type { NavItem, SocialItem } from '@/lib/normalize'

interface FooterProps {
  siteName: string
  logoUrl: string
  tagline: string
  footerText: string
  links: NavItem[]
  socials: SocialItem[]
  email: string
  phone: string
  address: string
}

export default function Footer({
  siteName,
  logoUrl,
  tagline,
  footerText,
  links,
  socials,
  email,
  phone,
  address,
}: FooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <div className="flex items-center gap-2 text-lg font-bold text-white">
            {logoUrl ? (
              <img src={logoUrl} alt={siteName} width={32} height={32} className="h-8 w-8 rounded object-contain" />
            ) : (
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
                {siteName.charAt(0)}
              </span>
            )}
            <span>{siteName}</span>
          </div>
          {tagline && <p className="mt-4 max-w-xs text-sm text-slate-400">{tagline}</p>}
          {socials.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-4">
              {socials.map((s) => (
                <li key={`${s.platform}-${s.url}`}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm capitalize text-slate-400 hover:text-white"
                  >
                    {s.platform}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Explore</h3>
          <ul className="mt-4 space-y-2">
            {links.map((link) => (
              <li key={`f-${link.label}-${link.url}`}>
                <Link href={link.url} className="text-sm text-slate-400 hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Contact</h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-400">
            {email && (
              <li>
                <a href={`mailto:${email}`} className="hover:text-white">{email}</a>
              </li>
            )}
            {phone && (
              <li>
                <a href={`tel:${phone}`} className="hover:text-white">{phone}</a>
              </li>
            )}
            {address && <li className="whitespace-pre-line">{address}</li>}
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800 py-6 text-center text-sm text-slate-500">
        {footerText || `© ${year} ${siteName}. All rights reserved.`}
      </div>
    </footer>
  )
}