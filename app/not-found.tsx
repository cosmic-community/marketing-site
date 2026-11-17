import ButtonLink from '@/components/ButtonLink'

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-32 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">404</p>
      <h1 className="mt-2 text-4xl font-bold text-slate-900">Page not found</h1>
      <p className="mt-4 text-slate-600">
        Sorry, we couldn&apos;t find the page you were looking for.
      </p>
      <ButtonLink href="/" className="mt-8">
        Back to home
      </ButtonLink>
    </div>
  )
}