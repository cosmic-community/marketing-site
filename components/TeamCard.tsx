import { getMetafieldValue, imageUrl } from '@/lib/normalize'
import type { TeamMember } from '@/types'

export default function TeamCard({ member }: { member: TeamMember }) {
  const photo = imageUrl(member.metadata?.photo, 'w=800&h=800&fit=crop&auto=format,compress')
  const linkedin = getMetafieldValue(member.metadata?.linkedin_url)
  const bio = getMetafieldValue(member.metadata?.bio)

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
      {photo ? (
        <img
          src={photo}
          alt={member.title}
          width={400}
          height={400}
          className="aspect-square w-full object-cover"
        />
      ) : (
        <div className="flex aspect-square w-full items-center justify-center bg-indigo-100 text-5xl font-bold text-indigo-600">
          {member.title.charAt(0)}
        </div>
      )}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-slate-900">{member.title}</h3>
        <p className="text-sm font-medium text-indigo-600">{getMetafieldValue(member.metadata?.role)}</p>
        {bio && <p className="mt-3 text-sm text-slate-600">{bio}</p>}
        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-sm font-semibold text-slate-700 hover:text-indigo-600"
          >
            LinkedIn →
          </a>
        )}
      </div>
    </div>
  )
}