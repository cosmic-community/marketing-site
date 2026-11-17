'use client'

import { useState } from 'react'
import type { FormEvent } from 'react'

type Status = 'idle' | 'sending' | 'success' | 'error'

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    setStatus('sending')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          subject: data.get('subject'),
          message: data.get('message'),
        }),
      })
      const result: { error?: string } = await response.json()
      if (!response.ok) {
        setStatus('error')
        setErrorMessage(result.error ?? 'Something went wrong. Please try again.')
        return
      }
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
      setErrorMessage('Network error. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-xl bg-green-50 p-6 text-green-800" role="status">
        <p className="font-semibold">Thanks for reaching out!</p>
        <p className="mt-1 text-sm">We&apos;ve received your message and will reply shortly.</p>
      </div>
    )
  }

  const inputClass =
    'mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-medium text-slate-700">
          Name
          <input name="name" type="text" required className={inputClass} />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Email
          <input name="email" type="email" required className={inputClass} />
        </label>
      </div>
      <label className="block text-sm font-medium text-slate-700">
        Subject
        <input name="subject" type="text" className={inputClass} />
      </label>
      <label className="block text-sm font-medium text-slate-700">
        Message
        <textarea name="message" rows={5} required className={inputClass} />
      </label>
      {status === 'error' && (
        <p className="text-sm text-red-600" role="alert">
          {errorMessage}
        </p>
      )}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-60"
      >
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  )
}