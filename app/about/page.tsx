import type { Metadata } from 'next'
import Hero from '@/components/Hero'
import PageSections from '@/components/PageSections'
import SectionHeading from '@/components/SectionHeading'
import TeamCard from '@/components/TeamCard'
import CTASection from '@/components/CTASection'
import { getPageByType, getTeamMembers } from '@/lib/cosmic'
import {
  getMetafieldValue,
  imageUrl,
  normalizeSections,
  pickObjects,
} from '@/lib/normalize'
import type { TeamMember } from '@/types'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about our story, mission and the team behind the product.',
}

export default async function AboutPage() {
  const [page, allTeam] = await Promise.all([getPageByType('about'), getTeamMembers()])
  const meta = page?.metadata
  const sections = normalizeSections(meta?.sections)
  const pageTeam = pickObjects<TeamMember>(meta?.team_members)
  const team = pageTeam.length > 0 ? pageTeam : allTeam

  return (
    <>
      <Hero
        compact
        eyebrow="About us"
        headline={getMetafieldValue(meta?.hero_headline) || 'Our story and mission'}
        subheadline={getMetafieldValue(meta?.hero_subheadline)}
        imageUrl={imageUrl(meta?.hero_image, 'w=1600&h=1200&fit=crop&auto=format,compress')}
      />

      <PageSections sections={sections} />

      {team.length > 0 && (
        <section className="bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Team"
              title="Meet the people behind the product"
              description="A small, passionate team focused on making your work easier."
            />
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((member) => (
                <TeamCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  )
}