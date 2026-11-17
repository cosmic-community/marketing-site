import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CosmicBadge from '@/components/CosmicBadge'
import { getSiteSettings } from '@/lib/cosmic'
import {
  getMetafieldValue,
  imageUrl,
  normalizeNavLinks,
  normalizeSocialLinks,
} from '@/lib/normalize'
import type { NavItem } from '@/lib/normalize'

const DEFAULT_NAV: NavItem[] = [
  { label: 'Home', url: '/' },
  { label: 'About', url: '/about' },
  { label: 'Features', url: '/features' },
  { label: 'Pricing', url: '/pricing' },
  { label: 'Blog', url: '/blog' },
  { label: 'Contact', url: '/contact' },
]

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  const name = getMetafieldValue(settings?.metadata?.site_name) || 'Marketing Site'
  const tagline = getMetafieldValue(settings?.metadata?.tagline)
  return {
    title: { default: name, template: `%s | ${name}` },
    description: tagline || `${name} - modern product marketing website`,
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = await getSiteSettings()
  const meta = settings?.metadata
  const siteName = getMetafieldValue(meta?.site_name) || 'Marketing Site'
  const navLinks = normalizeNavLinks(meta?.nav_links)
  const links = navLinks.length > 0 ? navLinks : DEFAULT_NAV
  const logoUrl = imageUrl(meta?.logo, 'w=160&h=160&fit=max&auto=format,compress')
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🚀</text></svg>"
        />
        {/* Concierge Agent Protocol (CAP) door for visiting AI agents */}
        <link rel="agent" href="/agent.txt" />
        {/* Console capture script for dashboard debugging */}
        <script src="/dashboard-console-capture.js" />
              <script defer src="https://insights.cosmicinsights.dev/script.js" data-project="6afca75cf3a10241a632c993"></script>
      </head>
      <body className="flex min-h-screen flex-col bg-white font-sans text-slate-900 antialiased">
        <Header siteName={siteName} logoUrl={logoUrl} links={links} />
        <main className="flex-1">{children}</main>
        <Footer
          siteName={siteName}
          logoUrl={logoUrl}
          tagline={getMetafieldValue(meta?.tagline)}
          footerText={getMetafieldValue(meta?.footer_text)}
          links={links}
          socials={normalizeSocialLinks(meta?.social_links)}
          email={getMetafieldValue(meta?.contact_email)}
          phone={getMetafieldValue(meta?.contact_phone)}
          address={getMetafieldValue(meta?.address)}
        />
        <CosmicBadge bucketSlug={bucketSlug} />
        {/* Concierge chat widget */}
        <script
          src="https://www.cosmicjs.com/agent.js"
          data-key="pk_f5775eed33347ed1b2e89a3bb0eff4f9"
          async
        />
      </body>
    </html>
  )
}