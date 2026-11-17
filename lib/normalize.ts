// Pure helpers (no server-only imports) that make Cosmic metadata safe to render.

export interface CtaButton {
  label: string
  url: string
  style: 'primary' | 'secondary'
}
export interface NavItem {
  label: string
  url: string
}
export interface SocialItem {
  platform: string
  url: string
}
export interface LogoItem {
  name: string
  imageUrl: string
}
export interface SectionItem {
  heading: string
  body: string
  imageUrl: string
}

export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return ''
  if (typeof field === 'string') return field
  if (typeof field === 'number' || typeof field === 'boolean') return String(field)
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value)
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key)
  }
  return ''
}

export function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v)
}

export function parseMaybeJson(raw: unknown): unknown {
  if (typeof raw === 'string') {
    const t = raw.trim()
    if (t.startsWith('[') || t.startsWith('{')) {
      try {
        return JSON.parse(t)
      } catch {
        return raw
      }
    }
  }
  return raw
}

export function toBool(v: unknown): boolean {
  if (typeof v === 'boolean') return v
  const s = getMetafieldValue(v).toLowerCase().trim()
  return s === 'true' || s === 'yes' || s === '1' || s === 'on'
}

export function toNumber(v: unknown, fallback: number): number {
  const n = Number(getMetafieldValue(v))
  return Number.isFinite(n) && getMetafieldValue(v) !== '' ? n : fallback
}

export function pickObjects<T>(raw: unknown): T[] {
  if (!Array.isArray(raw)) return []
  return raw.filter((item) => isRecord(item)) as unknown as T[]
}

function pickString(obj: Record<string, unknown>, keys: string[]): string {
  for (const key of keys) {
    const s = getMetafieldValue(obj[key]).trim()
    if (s) return s
  }
  return ''
}

export function imageUrl(raw: unknown, params = ''): string {
  let base = ''
  if (typeof raw === 'string') {
    base = raw
  } else if (isRecord(raw)) {
    const i = raw['imgix_url']
    const u = raw['url']
    base = typeof i === 'string' ? i : typeof u === 'string' ? u : ''
  }
  if (!base || !base.startsWith('http')) return ''
  if (!params) return base
  return `${base}${base.includes('?') ? '&' : '?'}${params}`
}

function pickImage(obj: Record<string, unknown>, keys: string[], params: string): string {
  for (const key of keys) {
    const u = imageUrl(obj[key], params)
    if (u) return u
  }
  return ''
}

function normalizeUrl(url: string): string {
  const t = url.trim()
  if (!t) return '#'
  if (/^(https?:|mailto:|tel:|#|\/)/i.test(t)) return t
  return `/${t}`
}

export function normalizeButtons(raw: unknown): CtaButton[] {
  const data = parseMaybeJson(raw)
  const list: unknown[] = Array.isArray(data) ? data : isRecord(data) ? [data] : []
  const buttons: CtaButton[] = []
  list.forEach((item, index) => {
    if (!isRecord(item)) return
    const label = pickString(item, ['label', 'text', 'title', 'name', 'button_text', 'cta_label'])
    if (!label) return
    const url = normalizeUrl(pickString(item, ['url', 'link', 'href', 'button_url']))
    const styleRaw = pickString(item, ['style', 'variant', 'type']).toLowerCase()
    let style: 'primary' | 'secondary' = index === 0 ? 'primary' : 'secondary'
    if (styleRaw.includes('secondary') || styleRaw.includes('outline') || styleRaw.includes('ghost')) {
      style = 'secondary'
    } else if (styleRaw.includes('primary')) {
      style = 'primary'
    }
    buttons.push({ label, url, style })
  })
  return buttons
}

export function normalizeNavLinks(raw: unknown): NavItem[] {
  const data = parseMaybeJson(raw)
  const links: NavItem[] = []
  if (Array.isArray(data)) {
    for (const item of data) {
      if (typeof item === 'string') {
        links.push({ label: item, url: normalizeUrl(`/${item.toLowerCase()}`) })
      } else if (isRecord(item)) {
        const label = pickString(item, ['label', 'title', 'name', 'text'])
        if (!label) continue
        links.push({ label, url: normalizeUrl(pickString(item, ['url', 'href', 'link', 'path'])) })
      }
    }
  } else if (isRecord(data)) {
    const label = pickString(data, ['label', 'title', 'name', 'text'])
    if (label) {
      links.push({ label, url: normalizeUrl(pickString(data, ['url', 'href', 'link', 'path'])) })
    } else {
      for (const [k, v] of Object.entries(data)) {
        const url = getMetafieldValue(v)
        if (url) links.push({ label: k, url: normalizeUrl(url) })
      }
    }
  }
  return links
}

function externalUrl(url: string): string {
  const t = url.trim()
  if (!t) return ''
  return /^(https?:|mailto:|tel:)/i.test(t) ? t : `https://${t}`
}

export function normalizeSocialLinks(raw: unknown): SocialItem[] {
  const data = parseMaybeJson(raw)
  const links: SocialItem[] = []
  if (Array.isArray(data)) {
    for (const item of data) {
      if (!isRecord(item)) continue
      const url = externalUrl(pickString(item, ['url', 'href', 'link']))
      const platform = pickString(item, ['platform', 'name', 'label', 'title']) || 'Link'
      if (url) links.push({ platform, url })
    }
  } else if (isRecord(data)) {
    for (const [k, v] of Object.entries(data)) {
      const url = externalUrl(getMetafieldValue(v))
      if (url) links.push({ platform: k, url })
    }
  }
  return links
}

export function normalizeLogos(raw: unknown): LogoItem[] {
  const data = parseMaybeJson(raw)
  const list: unknown[] = Array.isArray(data) ? data : isRecord(data) ? [data] : []
  const logos: LogoItem[] = []
  for (const item of list) {
    if (typeof item === 'string') {
      if (item.trim()) logos.push({ name: item.trim(), imageUrl: '' })
    } else if (isRecord(item)) {
      const params = 'w=240&h=80&fit=max&auto=format,compress'
      if (typeof item['imgix_url'] === 'string') {
        logos.push({
          name: pickString(item, ['original_name', 'name', 'title']),
          imageUrl: imageUrl(item, params),
        })
      } else {
        const name = pickString(item, ['name', 'title', 'company', 'label', 'alt'])
        const img = pickImage(item, ['logo', 'image', 'img', 'file'], params)
        if (name || img) logos.push({ name, imageUrl: img })
      }
    }
  }
  return logos
}

export function normalizeSections(raw: unknown): SectionItem[] {
  const data = parseMaybeJson(raw)
  const list: unknown[] = Array.isArray(data) ? data : isRecord(data) ? [data] : typeof data === 'string' && data.trim() ? [data] : []
  const sections: SectionItem[] = []
  for (const item of list) {
    if (typeof item === 'string') {
      if (item.trim()) sections.push({ heading: '', body: item, imageUrl: '' })
    } else if (isRecord(item)) {
      const heading = pickString(item, ['heading', 'title', 'headline', 'name'])
      const body = pickString(item, ['body', 'content', 'text', 'description'])
      const img = pickImage(item, ['image', 'photo', 'img'], 'w=1200&h=900&fit=crop&auto=format,compress')
      if (heading || body) sections.push({ heading, body, imageUrl: img })
    }
  }
  return sections
}

export function toStringList(raw: unknown): string[] {
  const data = parseMaybeJson(raw)
  if (Array.isArray(data)) {
    return data
      .map((item) => {
        if (typeof item === 'string') return item.trim()
        if (isRecord(item)) {
          return pickString(item, ['feature', 'text', 'label', 'name', 'title', 'value', 'item'])
        }
        return getMetafieldValue(item)
      })
      .filter((s) => s.length > 0)
  }
  if (typeof data === 'string') {
    if (data.includes('<li')) {
      const out: string[] = []
      for (const match of data.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)) {
        const text = (match[1] ?? '').replace(/<[^>]+>/g, '').trim()
        if (text) out.push(text)
      }
      return out
    }
    return data
      .split(/\r?\n/)
      .map((l) => l.replace(/^[\s\-*•]+/, '').trim())
      .filter((l) => l.length > 0)
  }
  return []
}

export function resolveIcon(raw: unknown): { text: string; url: string } {
  const url = imageUrl(raw, 'w=96&h=96&fit=crop&auto=format,compress')
  if (url) return { text: '', url }
  const text = getMetafieldValue(raw).trim()
  if (text && text.length <= 4) return { text, url: '' }
  return { text: '✨', url: '' }
}

export function formatPrice(price: unknown): string {
  const s = getMetafieldValue(price).trim()
  if (!s) return ''
  return /^\d/.test(s) ? `$${s}` : s
}

export function formatDate(input?: string): string {
  if (!input) return ''
  const d = new Date(input)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}