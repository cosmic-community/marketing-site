# Marketing Site
![App Preview](https://imgix.cosmicjs.com/459d8970-e2bb-11f1-9b92-01463bcd4d3a-autopilot-photo-1519389950473-47ba0277781c-1794942937983.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A modern, responsive marketing website for a startup product. All content (pages, features, pricing, team, blog, testimonials, FAQs and site settings) is managed in [Cosmic](https://www.cosmicjs.com).

## Features

- Home page with hero, CTA buttons, logo strip, feature highlights, testimonials and a final CTA
- About page with flexible story/mission sections and a team grid
- Features page with detailed, alternating sections with icons and images
- Pricing page with 3 tiers, feature lists and grouped FAQs
- Blog list, blog detail, category and author pages
- Contact page with contact details and a validated form
- Shared header and footer powered by Site Settings
- Draft preview support, SEO metadata and image optimization via imgix

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6afca75cf3a10241a632c995&clone_repository=6afca8fbf3a10241a632ca2f)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for a startup product website with features, pricing tiers, team members, blog posts, and customer testimonials.
>
> User instructions: A modern marketing website for a company/product with sample pages and content managed in Cosmic. Pages: Home (hero with headline, subheadline, CTA buttons, feature highlights, testimonials, logo strip, final CTA), About (company story, mission, team members grid), Features/Services (detailed feature sections with icons and images), Pricing (3-tier pricing plans with feature lists and FAQ), Blog (list and detail pages with author, category, featured image), and Contact (contact info and form). Content types should include Pages (with flexible sections), Features, Testimonials, Team Members, Pricing Plans, FAQs, Blog Posts, Authors, Categories, and Site Settings (logo, nav links, footer, social links). Seed realistic sample content for every page. Clean, responsive, professional design with a shared header and footer."

### Code Generation Prompt

> Build a Next.js application for a company website called "Marketing Site". The content is managed in Cosmic CMS with the following object types: site-settings, features, testimonials, team-members, pricing-plans, faqs, authors, categories, blog-posts, pages. Create a beautiful, modern, responsive design with a homepage and pages for each content type.
>
> User instructions: A modern marketing website for a company/product with sample pages and content managed in Cosmic. Pages: Home (hero with headline, subheadline, CTA buttons, feature highlights, testimonials, logo strip, final CTA), About (company story, mission, team members grid), Features/Services (detailed feature sections with icons and images), Pricing (3-tier pricing plans with feature lists and FAQ), Blog (list and detail pages with author, category, featured image), and Contact (contact info and form). Content types should include Pages (with flexible sections), Features, Testimonials, Team Members, Pricing Plans, FAQs, Blog Posts, Authors, Categories, and Site Settings (logo, nav links, footer, social links). Seed realistic sample content for every page. Clean, responsive, professional design with a shared header and footer.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org) (App Router, Server Components)
- React 19 and TypeScript (strict mode)
- Tailwind CSS 3 with the Typography plugin
- [Cosmic](https://www.cosmicjs.com/docs) headless CMS via `@cosmicjs/sdk`
- Bun for package management

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) installed
- A Cosmic bucket with the content model described above

### Installation

```bash
bun install
```

Set these environment variables (for example in your hosting dashboard or a local, git-ignored env file):

- `COSMIC_BUCKET_SLUG`
- `COSMIC_READ_KEY`
- `COSMIC_WRITE_KEY`

```bash
bun run dev
```

## Cosmic SDK Examples

```typescript
// Fetch published blog posts with author and category resolved
const { objects } = await cosmic.objects
  .find({ type: 'blog-posts' })
  .depth(1)

// Query posts by author id (always query relationships by id)
const { objects: posts } = await cosmic.objects
  .find({ type: 'blog-posts', 'metadata.author': authorId })
  .depth(1)
```

All content reads go through `getCosmic()` so draft content can be previewed in the Cosmic dashboard, while public visitors only ever see published content.

## Cosmic CMS Integration

| Object type | Used for |
| --- | --- |
| `site-settings` | Logo, navigation, footer text, social links, contact details |
| `pages` | Hero content, CTA buttons, logo strip, flexible sections, featured items |
| `features` | Home highlights and Features page |
| `testimonials` | Home testimonials |
| `team-members` | About page team grid |
| `pricing-plans` | Pricing tiers |
| `faqs` | Pricing page FAQ, grouped by `group` |
| `blog-posts`, `authors`, `categories` | Blog, author and category pages |

The contact form validates input on the server at `/api/contact`. Connect it to an email service (such as Resend) to deliver messages.

## Deployment Options

- **Vercel**: import the repository, add the three Cosmic environment variables, and deploy.
- **Netlify**: use the Next.js runtime, add the environment variables, and deploy.

Set `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY` and `COSMIC_WRITE_KEY` in your hosting platform's dashboard.
<!-- README_END -->