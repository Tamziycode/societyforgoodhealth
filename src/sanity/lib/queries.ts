import { groq } from "next-sanity";

import { client } from "./client";

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

export interface CategoryRef {
  _id: string;
  title: string;
  slug: string;
}

export interface SanityImage {
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}

export interface PostListItem {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  mainImage?: SanityImage;
  publishedAt: string;
  categories: CategoryRef[];
}

export interface PostFull extends PostListItem {
  author?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any[]; // Refined to PortableTextBlock[] once @portabletext/react is installed in Phase 2D
}

export interface ProjectListItem {
  _id: string;
  title: string;
  slug: string;
  summary?: string;
  location?: string;
  status?: "ongoing" | "completed" | "planned";
  mainImage?: SanityImage;
  categories: CategoryRef[];
}

export interface ProjectFull extends ProjectListItem {
  gallery?: SanityImage[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any[];
}

export interface Category {
  _id: string;
  title: string;
  slug: string;
  description?: string;
}

export interface ResearchArea {
  label: string;
  subItems?: string[];
}

export interface ContactDetail {
  label: string;
  value: string;
  isLink?: boolean;
}

export interface Testimonial {
  quote: string;
  authorName: string;
  authorRole?: string;
  photo?: SanityImage;
}

export interface SiteSettings {
  title: string;
  description?: string;
  logo?: SanityImage;
  contactEmail?: string;
  socialLinks?: {
    x?: string;
    instagram?: string;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  aboutContent?: any[];
  researchAreas?: ResearchArea[];
  contactDetails?: ContactDetail[];
  testimonial?: Testimonial;
}

export interface CategoryWithContent {
  category: Category | null;
  posts: PostListItem[];
  projects: ProjectListItem[];
}

/* ------------------------------------------------------------------ */
/* Shared projection fragment                                         */
/* ------------------------------------------------------------------ */

const categoryRefProjection = groq`
  categories[]->{
    _id,
    title,
    "slug": slug.current
  }
`;

/* ------------------------------------------------------------------ */
/* Categories                                                         */
/* ------------------------------------------------------------------ */

const allCategoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    description
  }
`;

export async function getAllCategories(): Promise<Category[]> {
  return client.fetch(allCategoriesQuery, {}, { next: { revalidate: 60 } });
}

/* ------------------------------------------------------------------ */
/* Posts                                                              */
/* ------------------------------------------------------------------ */

const allPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    mainImage,
    publishedAt,
    ${categoryRefProjection}
  }
`;

export async function getAllPosts(): Promise<PostListItem[]> {
  return client.fetch(allPostsQuery, {}, { next: { revalidate: 60 } });
}

const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    mainImage,
    author,
    publishedAt,
    body,
    ${categoryRefProjection}
  }
`;

export async function getPostBySlug(slug: string): Promise<PostFull | null> {
  return client.fetch(postBySlugQuery, { slug }, { next: { revalidate: 60 } });
}

/* ------------------------------------------------------------------ */
/* Projects                                                           */
/* ------------------------------------------------------------------ */

const allProjectsQuery = groq`
  *[_type == "project"] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    summary,
    location,
    status,
    mainImage,
    ${categoryRefProjection}
  }
`;

export async function getAllProjects(): Promise<ProjectListItem[]> {
  return client.fetch(allProjectsQuery, {}, { next: { revalidate: 60 } });
}

const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    summary,
    location,
    status,
    mainImage,
    gallery,
    body,
    ${categoryRefProjection}
  }
`;

export async function getProjectBySlug(
  slug: string,
): Promise<ProjectFull | null> {
  return client.fetch(
    projectBySlugQuery,
    { slug },
    { next: { revalidate: 60 } },
  );
}

/* ------------------------------------------------------------------ */
/* Category archive — the category doc + everything tagged with it    */
/* ------------------------------------------------------------------ */

const categoryWithContentQuery = groq`
  {
    "category": *[_type == "category" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      description
    },
    "posts": *[_type == "post" && $slug in categories[]->slug.current] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      mainImage,
      publishedAt,
      ${categoryRefProjection}
    },
    "projects": *[_type == "project" && $slug in categories[]->slug.current] | order(_createdAt desc) {
      _id,
      title,
      "slug": slug.current,
      summary,
      location,
      status,
      mainImage,
      ${categoryRefProjection}
    }
  }
`;

export async function getCategoryWithContent(
  slug: string,
): Promise<CategoryWithContent> {
  return client.fetch(
    categoryWithContentQuery,
    { slug },
    { next: { revalidate: 60 } },
  );
}

/* ------------------------------------------------------------------ */
/* Site Settings (singleton)                                          */
/* ------------------------------------------------------------------ */

const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    title,
    description,
    logo,
    contactEmail,
    socialLinks,
    aboutContent,
    researchAreas,
    contactDetails,
    testimonial
  }
`;

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return client.fetch(siteSettingsQuery, {}, { next: { revalidate: 60 } });
}
