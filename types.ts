export interface CosmicImage {
  url: string;
  imgix_url: string;
}

export interface CosmicObject<M> {
  id: string;
  slug: string;
  title: string;
  type: string;
  content?: string;
  created_at: string;
  modified_at: string;
  published_at?: string;
  metadata: M;
}

export interface SiteSettingsMeta {
  site_name?: string;
  tagline?: string;
  logo?: CosmicImage;
  nav_links?: unknown;
  footer_text?: string;
  social_links?: unknown;
  contact_email?: string;
  contact_phone?: string;
  address?: string;
}

export interface FeatureMeta {
  summary?: string;
  details?: string;
  icon?: unknown;
  image?: CosmicImage;
  sort_order?: number | string;
}

export interface TestimonialMeta {
  quote?: string;
  customer_name?: string;
  role?: string;
  company?: string;
  avatar?: CosmicImage;
  rating?: number | string;
}

export interface TeamMemberMeta {
  role?: string;
  bio?: string;
  photo?: CosmicImage;
  linkedin_url?: string;
}

export interface PricingPlanMeta {
  price?: string | number;
  billing_period?: unknown;
  description?: string;
  plan_features?: unknown;
  cta_label?: string;
  most_popular?: unknown;
  sort_order?: number | string;
}

export interface FaqMeta {
  question?: string;
  answer?: string;
  group?: unknown;
}

export interface AuthorMeta {
  bio?: string;
  avatar?: CosmicImage;
}

export interface CategoryMeta {
  description?: string;
}

export type Author = CosmicObject<AuthorMeta>;
export type Category = CosmicObject<CategoryMeta>;

export interface BlogPostMeta {
  excerpt?: string;
  content?: string;
  featured_image?: CosmicImage;
  author?: Author;
  category?: Category;
  publish_date?: string;
}

export interface PageMeta {
  page_type?: unknown;
  hero_headline?: string;
  hero_subheadline?: string;
  hero_image?: CosmicImage;
  cta_buttons?: unknown;
  logo_strip?: unknown;
  sections?: unknown;
  featured_features?: unknown;
  featured_testimonials?: unknown;
  team_members?: unknown;
}

export type SiteSettings = CosmicObject<SiteSettingsMeta>;
export type Feature = CosmicObject<FeatureMeta>;
export type Testimonial = CosmicObject<TestimonialMeta>;
export type TeamMember = CosmicObject<TeamMemberMeta>;
export type PricingPlan = CosmicObject<PricingPlanMeta>;
export type Faq = CosmicObject<FaqMeta>;
export type BlogPost = CosmicObject<BlogPostMeta>;
export type PageObject = CosmicObject<PageMeta>;