import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// 🔴 IMPORTANTE: Reemplaza con tu Project ID real
// Lo encontrarás en sanity.io/manage después de crear el proyecto
export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'zdwv4tpr',
  dataset: 'production',
  useCdn: true, // `true` para producción (más rápido), `false` para datos en tiempo real
  apiVersion: '2024-01-01',
})

const builder = imageUrlBuilder(sanityClient)

// Helper para construir URLs de imágenes con Sanity
export function urlFor(source) {
  return builder.image(source)
}

// ─── QUERIES GROQ ────────────────────────────────────────────────────────────

// Todos los artículos (para el listing)
export const ALL_POSTS_QUERY = `
  *[_type == "post" && !(_id in path("drafts.**"))] | order(featured desc, publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage {
      asset->,
      alt
    },
    publishedAt,
    readTime,
    featured,
    "author": author-> { name, role, image { asset->, alt } },
    "categories": categories[]-> { title, color, slug }
  }
`

// Un artículo específico por slug
export const POST_BY_SLUG_QUERY = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    excerpt,
    body,
    mainImage {
      asset->,
      alt
    },
    publishedAt,
    readTime,
    featured,
    "author": author-> { name, role, image { asset->, alt }, bio, linkedin },
    "categories": categories[]-> { title, color, slug },
    seoTitle,
    seoDescription,
    focusKeyword,
    secondaryKeywords,
    canonicalUrl,
    ogImage { asset->, alt },
    noIndex
  }
`

// Artículos recientes para la sección relacionados
export const RECENT_POSTS_QUERY = `
  *[_type == "post" && slug.current != $currentSlug && !(_id in path("drafts.**"))] | order(publishedAt desc)[0..2] {
    _id,
    title,
    slug,
    excerpt,
    mainImage { asset->, alt },
    publishedAt,
    readTime,
    "categories": categories[]-> { title, color }
  }
`
