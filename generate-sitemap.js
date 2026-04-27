/**
 * ─── RUKA AGENCY · Sitemap Generator ────────────────────────────────────────
 *
 * Consulta Sanity para obtener todos los artículos publicados y genera
 * automáticamente public/sitemap.xml con páginas estáticas + artículos del blog.
 *
 * Se ejecuta automáticamente con: npm run build
 */

import { createClient } from '@sanity/client'
import { writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// ─── Configuración Sanity ─────────────────────────────────────────────────────
const client = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID || 'zdwv4tpr',
  dataset: 'production',
  useCdn: false,       // false para obtener datos en tiempo real al hacer build
  apiVersion: '2024-01-01',
})

// ─── URL base del sitio ───────────────────────────────────────────────────────
const SITE_URL = 'https://www.rukaa.es'

// ─── Páginas estáticas ────────────────────────────────────────────────────────
const STATIC_PAGES = [
  { path: '/',               priority: '1.0', changefreq: 'weekly'  },
  { path: '/servicios',      priority: '0.9', changefreq: 'monthly' },
  { path: '/contacto',       priority: '0.9', changefreq: 'monthly' },
  { path: '/blog',           priority: '0.9', changefreq: 'weekly'  },
  { path: '/proceso',        priority: '0.8', changefreq: 'monthly' },
  { path: '/sobre-nosotros', priority: '0.8', changefreq: 'monthly' },
  { path: '/especializacion',priority: '0.7', changefreq: 'monthly' },
  { path: '/recursos',       priority: '0.7', changefreq: 'monthly' },
]

// ─── Query Sanity: todos los posts publicados ─────────────────────────────────
const POSTS_QUERY = `
  *[_type == "post" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
    "slug": slug.current,
    publishedAt,
    "categorySlug": categories[0]->slug.current
  }
`

// ─── Helper: formatear fecha para sitemap ────────────────────────────────────
const formatDate = (dateStr) => {
  if (!dateStr) return new Date().toISOString().split('T')[0]
  return new Date(dateStr).toISOString().split('T')[0]
}

// ─── Helper: construir URL del artículo (con categoría si existe) ─────────────
const buildPostUrl = (post) => {
  const base = `${SITE_URL}/blog`
  return post.categorySlug
    ? `${base}/${post.categorySlug}/${post.slug}`
    : `${base}/${post.slug}`
}

// ─── Generar XML ──────────────────────────────────────────────────────────────
const buildSitemap = (posts) => {
  const today = new Date().toISOString().split('T')[0]

  const staticUrls = STATIC_PAGES.map(page => `
  <url>
    <loc>${SITE_URL}${page.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('')

  const postUrls = posts.map(post => `
  <url>
    <loc>${buildPostUrl(post)}</loc>
    <lastmod>${formatDate(post.publishedAt)}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls}
${postUrls}
</urlset>`
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('🗺️  Generando sitemap...')

  let posts = []
  try {
    posts = await client.fetch(POSTS_QUERY)
    console.log(`   ✅ ${posts.length} artículo(s) encontrado(s) en Sanity`)
  } catch (err) {
    console.warn('   ⚠️  No se pudo conectar con Sanity. El sitemap solo incluirá páginas estáticas.')
    console.warn('   Error:', err.message)
  }

  const xml = buildSitemap(posts)
  const outputPath = resolve(__dirname, 'public/sitemap.xml')
  writeFileSync(outputPath, xml, 'utf-8')

  console.log(`   ✅ sitemap.xml generado → ${posts.length} artículos + ${STATIC_PAGES.length} páginas estáticas`)
  console.log(`   📄 Guardado en: ${outputPath}`)
}

main().catch(err => {
  console.error('❌ Error al generar el sitemap:', err)
  process.exit(1)
})
