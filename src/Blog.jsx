import React, { useState, useEffect } from 'react'
import { PortableText } from '@portabletext/react'
import { Helmet } from 'react-helmet-async'
import {
  ArrowLeft, ArrowUpRight, Clock, Calendar, Tag, User,
  Search, ChevronRight, Linkedin, BookOpen, Sparkles,
  Share2, Link2, CheckCircle2
} from 'lucide-react'
import { sanityClient, urlFor, ALL_POSTS_QUERY, POST_BY_SLUG_QUERY, RECENT_POSTS_QUERY } from './lib/sanity.js'
import { useLanguage } from './App.jsx'

// ─── HELPERS ─────────────────────────────────────────────────────────────────

// Construye la ruta completa del post incluyendo categoría (para SEO)
// Resultado: "seo-inmobiliario/mi-articulo" o "mi-articulo" si no hay categoría
const buildBlogPath = (post) => {
  const categorySlug = post.categories?.[0]?.slug?.current
  const postSlug = post.slug?.current
  return categorySlug ? `${categorySlug}/${postSlug}` : postSlug
}

// Extrae solo el slug del post desde un path que puede incluir categoría
// Entrada: "seo-inmobiliario/mi-articulo" → Salida: "mi-articulo"
const extractPostSlug = (path) => {
  if (!path) return path
  return path.includes('/') ? path.split('/').pop() : path
}

// Helper para obtener el campo localizado de Sanity
const getLocalized = (field, lang) => {
  if (!field) return null
  if (typeof field === 'string' || Array.isArray(field)) return field
  return field[lang] || field.es || null
}

const formatDate = (dateString, lang) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// ─── PORTABLE TEXT COMPONENTS (estilo Ruka) ───────────────────────────────────

const portableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-[#64748B] text-lg leading-relaxed mb-6">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold text-[#2C3E50] mt-12 mb-6 tracking-tight">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-bold text-[#4F7B8C] mt-10 mb-4">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-semibold text-[#2C3E50] mt-8 mb-3">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[#6599CB] pl-6 my-8 italic text-xl text-[#4F7B8C] bg-[#6599CB]/5 py-6 pr-6 rounded-r-2xl">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-[#2C3E50]">{children}</strong>
    ),
    em: ({ children }) => <em className="italic text-[#4F7B8C]">{children}</em>,
    code: ({ children }) => (
      <code className="bg-[#6599CB]/10 text-[#4F7B8C] px-2 py-0.5 rounded font-mono text-sm">
        {children}
      </code>
    ),
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target={value?.blank ? '_blank' : '_self'}
        rel="noopener noreferrer"
        className="text-[#6599CB] underline underline-offset-2 hover:text-[#4F7B8C] transition-colors"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => (
      <figure className="my-10">
        <img
          src={urlFor(value).width(800).url()}
          alt={value.alt || ''}
          className="w-full rounded-3xl shadow-xl"
          loading="lazy"
        />
        {value.caption && (
          <figcaption className="text-center text-sm text-[#64748B] mt-3 italic">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
  },
}

// ─── SKELETON LOADER ─────────────────────────────────────────────────────────

const PostCardSkeleton = () => (
  <div className="glass-panel rounded-[2rem] overflow-hidden animate-pulse">
    <div className="h-52 bg-slate-200 rounded-t-[2rem]" />
    <div className="p-6 space-y-4">
      <div className="h-4 bg-slate-200 rounded w-1/3" />
      <div className="h-6 bg-slate-200 rounded w-3/4" />
      <div className="h-4 bg-slate-200 rounded" />
      <div className="h-4 bg-slate-200 rounded w-4/5" />
    </div>
  </div>
)

// ─── POST CARD ────────────────────────────────────────────────────────────────

const PostCard = ({ post, onNavigate, featured = false }) => {
  const { language } = useLanguage();
  if (!post) return null
  const imageUrl = post.mainImage?.asset
    ? urlFor(post.mainImage).width(featured ? 900 : 600).height(featured ? 500 : 350).url()
    : null

  return (
    <article
      onClick={() => onNavigate('blog-post', buildBlogPath(post))}
      className={`group glass-panel rounded-[2rem] overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-2xl hover:bg-white/60 hover:-translate-y-1 flex flex-col ${featured ? 'md:col-span-2 lg:col-span-2' : ''}`}
    >
      {/* Imagen */}
      <div className={`relative overflow-hidden shrink-0 ${featured ? 'h-64 md:h-80' : 'h-48'}`}>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={getLocalized(post.mainImage?.alt, language) || getLocalized(post.title, language)}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#6599CB]/20 to-[#96D9CC]/20 flex items-center justify-center">
            <BookOpen size={40} className="text-[#6599CB]/40" />
          </div>
        )}
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {/* Badge Destacado */}
        {post.featured && (
          <div className="absolute top-4 left-4 bg-[#F2994B] text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <Sparkles size={12} />
            {language === 'es' ? 'Destacado' : 'Featured'}
          </div>
        )}
        {/* Categorías */}
        {post.categories?.length > 0 && (
          <div className="absolute top-4 right-4 flex gap-2">
            {post.categories.slice(0, 1).map((cat) => (
              <span
                key={cat.title}
                className="text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md bg-white/80"
                style={{ color: cat.color || '#6599CB' }}
              >
                {cat.title}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className={`p-5 flex flex-col flex-1 ${featured ? 'md:p-8' : ''}`}>
        {/* Meta Info */}
        <div className="flex items-center gap-4 text-xs text-[#64748B] mb-4 font-medium">
          {post.publishedAt && (
            <span className="flex items-center gap-1.5">
              <Calendar size={13} className="text-[#6599CB]" />
              {formatDate(post.publishedAt, language)}
            </span>
          )}
          {post.readTime && (
            <span className="flex items-center gap-1.5">
              <Clock size={13} className="text-[#6599CB]" />
              {post.readTime} {language === 'es' ? 'min lectura' : 'min read'}
            </span>
          )}
        </div>

        <h2 className={`font-bold text-[#2C3E50] mb-3 group-hover:text-[#4F7B8C] transition-colors tracking-tight leading-tight ${featured ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
          {getLocalized(post.title, language)}
        </h2>
        {getLocalized(post.excerpt, language) && (
          <p className="text-[#64748B] text-sm leading-relaxed mb-5 line-clamp-2">
            {getLocalized(post.excerpt, language)}
          </p>
        )}

        <div className="flex flex-1" />
        {/* Author + CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          {post.author ? (
            <div className="flex items-center gap-2">
              {post.author.image?.asset ? (
                <img
                  src={urlFor(post.author.image).width(32).height(32).url()}
                  alt={post.author.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-[#6599CB]/20 flex items-center justify-center">
                  <User size={14} className="text-[#6599CB]" />
                </div>
              )}
              <span className="text-xs font-semibold text-[#64748B]">{post.author.name}</span>
            </div>
          ) : <div />}
          <span className="text-xs font-bold text-[#6599CB] flex items-center gap-1 group-hover:gap-2 transition-all">
            {language === 'es' ? 'Leer artículo' : 'Read article'} <ArrowUpRight size={14} />
          </span>
        </div>
      </div>
    </article>
  )
}

// ─── BLOG LISTING PAGE ───────────────────────────────────────────────────────

export const BlogPage = ({ onNavigate }) => {
  const { language } = useLanguage()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [visibleCount, setVisibleCount] = useState(8)

  useEffect(() => {
    sanityClient.fetch(ALL_POSTS_QUERY)
      .then((data) => {
        setPosts(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error fetching posts:', err)
        setLoading(false)
      })
  }, [])

  // Extraer categorías únicas
  const categories = [
    { title: language === 'es' ? 'Todos' : 'All', slug: 'all', color: '#6599CB' },
    ...Array.from(
      new Map(
        posts.flatMap((p) => p.categories || []).map((c) => [c.slug?.current, c])
      ).values()
    ),
  ]

  const filtered = posts.filter((post) => {
    const titleText = getLocalized(post.title, language) || ''
    const excerptText = getLocalized(post.excerpt, language) || ''
    const matchSearch =
      titleText.toLowerCase().includes(search.toLowerCase()) ||
      excerptText.toLowerCase().includes(search.toLowerCase())
    const matchCat =
      activeCategory === 'all' ||
      post.categories?.some((c) => c.slug?.current === activeCategory)
    return matchSearch && matchCat
  })

  const featured = filtered.find((p) => p.featured)
  const rest = filtered.filter((p) => !p.featured || filtered.indexOf(p) !== 0)
  const displayedRest = rest.slice(0, visibleCount - (featured ? 1 : 0))
  const hasMore = rest.length > displayedRest.length

  return (
    <>
      <Helmet>
        <title>{language === 'es' ? 'Blog de Marketing Inmobiliario · Ruka Agency' : 'Real Estate Marketing Blog · Ruka Agency'}</title>
        <meta
          name="description"
          content={language === 'es' 
            ? 'Estrategias, tendencias y guías de marketing digital para inmobiliarias boutique. Contenido especializado de Ruka Agency.' 
            : 'Digital marketing strategies, trends, and guides for boutique real estate. Specialized content from Ruka Agency.'}
        />
      </Helmet>

      <div className="pt-36 md:pt-40 pb-24 px-6 page-fade-in relative min-h-screen">
        {/* Background */}
        <div className="grain-overlay" />
        <div className="animated-blob blob-1" />
        <div className="animated-blob blob-3" />

        <div className="container mx-auto max-w-7xl relative z-10">
          {/* Header */}
          <div className="text-center mb-10 page-fade-in">
            <div className="mb-4 inline-flex items-center justify-center">
              <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-[#6599CB]/60 bg-[#6599CB]/5 text-[#4F7B8C] text-xs font-bold tracking-widest uppercase backdrop-blur-sm shadow-sm">
                <BookOpen size={14} className="text-[#F2994B]" />
                {language === 'es' ? 'BLOG · RECURSOS' : 'BLOG · RESOURCES'}
              </div>
            </div>
            <h1 className="mb-4 text-[#4F7B8C]">
              <span className="type-display font-bold uppercase tracking-tight mb-2 !text-4xl sm:!text-5xl md:!text-6xl lg:!text-[72px]">
                {language === 'es' ? 'Estrategias que' : 'Strategies that'}
              </span>
              <br />
              <span className="type-h2-serif text-[#6599CB] !text-4xl sm:!text-5xl md:!text-6xl lg:!text-[72px]">
                {language === 'es' ? 'mueven el mercado' : 'move the market'}
              </span>
            </h1>
            <p className="type-body text-[#64748B] max-w-2xl mx-auto text-lg leading-relaxed mb-6">
              {language === 'es' 
                ? 'Guías prácticas y tendencias de marketing digital para inmobiliarias de alto standing.' 
                : 'Practical guides and digital marketing trends for high-end real estate agencies.'}
            </p>
          </div>

          {/* Search + Filtros (Sticky) */}
          <div className="sticky top-28 md:top-32 z-40 bg-[#F8FAFC]/90 md:bg-transparent backdrop-blur-xl md:backdrop-filter-none py-4 mb-10 -mx-6 px-6 md:mx-0 md:px-0 border-b border-[#6599CB]/10 md:border-transparent rounded-b-[2rem] md:rounded-none transition-all duration-300 shadow-sm md:shadow-none">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B]" />
                <input
                  type="text"
                  placeholder={language === 'es' ? "Buscar artículos..." : "Search articles..."}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 md:py-3.5 bg-white rounded-2xl border border-slate-200 outline-none focus:ring-2 focus:ring-[#6599CB]/40 text-[#2C3E50] placeholder-[#94A3B8] text-sm font-medium shadow-sm transition-all"
                />
              </div>
              <div className="hidden gap-2 flex-wrap">
                {categories.map((cat) => (
                  <button
                    key={cat.slug?.current || cat.slug}
                    onClick={() => setActiveCategory(cat.slug?.current || cat.slug)}
                    className={`px-4 py-3 rounded-2xl text-xs font-bold tracking-wide transition-all duration-300 ${
                      activeCategory === (cat.slug?.current || cat.slug)
                        ? 'bg-[#6599CB] text-white shadow-lg scale-105'
                        : 'bg-white/70 backdrop-blur-md border border-slate-200 text-[#64748B] hover:bg-white'
                    }`}
                  >
                    {cat.title}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => <PostCardSkeleton key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 px-6 glass-panel rounded-3xl max-w-2xl mx-auto shadow-sm">
              <div className="text-6xl mb-6">📭</div>
              <h2 className="text-2xl font-bold text-[#2C3E50] mb-3">{language === 'es' ? 'No encontramos artículos' : 'No articles found'}</h2>
              <p className="text-[#64748B] mb-8">
                {posts.length === 0
                  ? (language === 'es' ? 'Pronto publicaremos el primer artículo. ¡Vuelve pronto!' : 'We will soon publish our first article. Stay tuned!')
                  : (language === 'es' ? 'Intenta con otros términos o explora las categorías disponibles.' : 'Try other terms or explore the available categories.')}
              </p>
              {posts.length > 0 && (
                <button
                  onClick={() => { setSearch(''); setActiveCategory('all'); }}
                  className="bg-[#6599CB] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#4F7B8C] transition-colors shadow-md hover:shadow-lg"
                >
                  {language === 'es' ? 'Ver todos los artículos' : 'View all articles'}
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Artículo destacado ocupa 2 columnas */}
              {featured && (
                <PostCard post={featured} onNavigate={onNavigate} featured={true} />
              )}
              {displayedRest.map((post) => (
                <PostCard key={post._id} post={post} onNavigate={onNavigate} />
              ))}
            </div>
          )}

          {/* Cargar más */}
          {!loading && hasMore && (
            <div className="mt-16 text-center">
              <button
                onClick={() => setVisibleCount((prev) => prev + 4)}
                className="bg-white border-2 border-[#6599CB]/20 text-[#6599CB] px-8 py-3 rounded-xl font-bold hover:bg-[#6599CB]/10 transition-colors shadow-sm"
              >
                {language === 'es' ? 'Cargar más artículos' : 'Load more articles'}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

// ─── SINGLE POST PAGE ─────────────────────────────────────────────────────────

export const BlogPostPage = ({ slug, onNavigate }) => {
  const { language } = useLanguage()
  const [post, setPost] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scroll = `${totalScroll / windowHeight}`
      setScrollProgress(scroll * 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // El slug recibido puede ser "categoria/post-slug" — extraemos solo el slug del post
  const postSlug = extractPostSlug(slug)

  useEffect(() => {
    if (!slug) return
    Promise.all([
      sanityClient.fetch(POST_BY_SLUG_QUERY, { slug: postSlug }),
      sanityClient.fetch(RECENT_POSTS_QUERY, { currentSlug: postSlug }),
    ])
      .then(([postData, relatedData]) => {
        setPost(postData)
        setRelated(relatedData)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error fetching post:', err)
        setLoading(false)
      })
  }, [slug])

  if (loading) {
    return (
      <div className="pt-40 md:pt-48 pb-24 px-6 min-h-screen">
        <div className="container mx-auto max-w-3xl animate-pulse space-y-6">
          <div className="h-8 bg-slate-200 rounded w-2/3" />
          <div className="h-72 bg-slate-200 rounded-3xl" />
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => <div key={i} className="h-4 bg-slate-200 rounded" />)}
          </div>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="pt-40 md:pt-48 pb-24 px-6 min-h-screen text-center">
        <div className="container mx-auto max-w-2xl">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-[#2C3E50] mb-4">{language === 'es' ? 'Artículo no encontrado' : 'Article not found'}</h1>
          <button
            type="button"
            onClick={() => onNavigate('blog')}
            className="text-[#6599CB] font-semibold flex items-center gap-2 mx-auto hover:gap-3 transition-all relative z-50 cursor-pointer"
          >
            <ArrowLeft size={18} /> {language === 'es' ? 'Volver al Blog' : 'Back to Blog'}
          </button>
        </div>
      </div>
    )
  }

  const siteUrl = 'https://rukaa.es'
  // La URL pública usa el path completo (con categoría si existe)
  const postPath = buildBlogPath(post) || slug
  const postUrl = `${siteUrl}/blog/${postPath}`
  const seoTitle = getLocalized(post.seoTitle, language) || getLocalized(post.title, language)
  const seoDesc = getLocalized(post.seoDescription, language) || getLocalized(post.excerpt, language)
  const ogImageUrl = post.ogImage?.asset
    ? urlFor(post.ogImage).width(1200).height(630).url()
    : post.mainImage?.asset
    ? urlFor(post.mainImage).width(1200).height(630).url()
    : null

  const copyUrl = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <Helmet>
        <title>{seoTitle} · Ruka Agency</title>
        <meta name="description" content={seoDesc} />
        {post.noIndex && <meta name="robots" content="noindex, nofollow" />}
        {post.canonicalUrl && <link rel="canonical" href={post.canonicalUrl} />}

        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDesc} />
        <meta property="og:url" content={postUrl} />
        {ogImageUrl && <meta property="og:image" content={ogImageUrl} />}

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDesc} />
        {ogImageUrl && <meta name="twitter:image" content={ogImageUrl} />}

        {/* Schema.org Article */}
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: getLocalized(post.title, language),
          description: seoDesc,
          image: ogImageUrl,
          datePublished: post.publishedAt,
          author: {
            '@type': 'Person',
            name: post.author?.name || 'Ruka Agency',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Ruka Agency',
            url: siteUrl,
          },
        })}</script>
      </Helmet>

      {/* Ruka Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-[4px] md:h-1 bg-transparent z-[9999] pointer-events-none shadow-sm">
        <div 
          className="h-full bg-gradient-to-r from-[#F2994B] to-[#F7B733] transition-all duration-150 ease-out shadow-sm"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="pt-40 md:pt-48 pb-24 px-6 page-fade-in relative">
        <div className="grain-overlay" />

        <div className="container mx-auto max-w-7xl relative z-10">
          {/* Breadcrumb / Back */}
          <button
            type="button"
            onClick={() => onNavigate('blog')}
            className="flex items-center gap-2 text-[#64748B] hover:text-[#6599CB] transition-colors mb-12 text-sm font-semibold group relative z-50 cursor-pointer"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            {language === 'es' ? 'Volver al Blog' : 'Back to Blog'}
          </button>

          <div className="grid lg:grid-cols-[1fr_320px] gap-12 items-start">
            {/* Artículo */}
            <article>
              {/* Categorías */}
              {post.categories?.length > 0 && (
                <div className="flex gap-2 flex-wrap mb-6">
                  {post.categories.map((cat) => (
                    <span
                      key={cat.title}
                      className="text-xs font-bold px-3 py-1.5 rounded-full bg-white/60 backdrop-blur-sm border border-white/40"
                      style={{ color: cat.color || '#6599CB' }}
                    >
                      {cat.title}
                    </span>
                  ))}
                </div>
              )}

              {/* Título */}
              <h1 className="text-4xl md:text-5xl font-black text-[#2C3E50] mb-6 tracking-tight leading-tight">
                {getLocalized(post.title, language)}
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-5 text-sm text-[#64748B] mb-10 pb-10 border-b border-slate-200">
                {post.author && (
                  <div className="flex items-center gap-2">
                    {post.author.image?.asset ? (
                      <img
                        src={urlFor(post.author.image).width(36).height(36).url()}
                        alt={post.author.name}
                        className="w-9 h-9 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-[#6599CB]/20 flex items-center justify-center">
                        <User size={16} className="text-[#6599CB]" />
                      </div>
                    )}
                    <div>
                      <p className="font-bold text-[#2C3E50] text-xs">{post.author.name}</p>
                      {post.author.role && <p className="text-xs text-[#64748B]">{post.author.role}</p>}
                    </div>
                  </div>
                )}
                {post.publishedAt && (
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-[#6599CB]" />
                    {formatDate(post.publishedAt, language)}
                  </span>
                )}
                {post.readTime && (
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} className="text-[#6599CB]" />
                    {post.readTime} {language === 'es' ? 'min lectura' : 'min read'}
                  </span>
                )}
                
                {/* Botones Compartir */}
                <div className="flex gap-3 ml-auto w-full md:w-auto mt-4 md:mt-0">
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0077b5]/10 text-[#0077b5] font-bold hover:bg-[#0077b5]/20 transition-all text-xs whitespace-nowrap"
                  >
                    <Linkedin size={14} /> {language === 'es' ? 'Compartir' : 'Share'}
                  </a>
                  <button
                    onClick={copyUrl}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[#cbd5e1] text-[#64748B] hover:bg-white hover:text-[#4F7B8C] hover:border-[#6599CB]/50 transition-all text-xs font-bold bg-white/50 whitespace-nowrap"
                  >
                    {copied ? <CheckCircle2 size={14} className="text-[#F2994B]" /> : <Link2 size={14} />}
                    {copied ? (language === 'es' ? '¡Copiado!' : 'Copied!') : (language === 'es' ? 'Copiar url' : 'Copy url')}
                  </button>
                </div>
              </div>

              {/* Imagen principal */}
              {post.mainImage?.asset && (
                <figure className="mb-12">
                  <img
                    src={urlFor(post.mainImage).width(840).url()}
                    alt={getLocalized(post.mainImage.alt, language) || getLocalized(post.title, language)}
                    className="w-full rounded-3xl shadow-2xl"
                  />
                </figure>
              )}

              {/* Cuerpo del artículo */}
              <div className="prose-ruka">
                {getLocalized(post.body, language) && (
                  <PortableText value={getLocalized(post.body, language)} components={portableTextComponents} />
                )}
              </div>

              {/* Autor (bio completa al final) */}
              {post.author?.bio && (
                <div className="mt-16 glass-panel p-8 rounded-3xl flex gap-6 items-start">
                  {post.author.image?.asset ? (
                    <img
                      src={urlFor(post.author.image).width(72).height(72).url()}
                      alt={post.author.name}
                      className="w-18 h-18 rounded-2xl object-cover shrink-0"
                      style={{ width: '72px', height: '72px' }}
                    />
                  ) : (
                    <div className="w-18 h-18 rounded-2xl bg-[#6599CB]/20 flex items-center justify-center shrink-0" style={{ width: '72px', height: '72px' }}>
                      <User size={28} className="text-[#6599CB]" />
                    </div>
                  )}
                  <div>
                    <p className="font-black text-[#2C3E50] text-lg">{post.author.name}</p>
                    {post.author.role && <p className="text-[#6599CB] text-sm font-semibold mb-2">{post.author.role}</p>}
                    <p className="text-[#64748B] text-sm leading-relaxed">{post.author.bio}</p>
                    {post.author.linkedin && (
                      <a
                        href={post.author.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[#6599CB] text-sm font-semibold mt-3 hover:underline"
                      >
                        <Linkedin size={14} /> LinkedIn
                      </a>
                    )}
                  </div>
                </div>
              )}
            </article>

            {/* Sidebar */}
            <aside className="space-y-8 lg:sticky lg:top-32">
              {/* Focus Keyword (solo visible si existe) */}
              {post.focusKeyword && (
                <div className="glass-panel p-6 rounded-3xl">
                  <p className="text-xs font-bold tracking-widest uppercase text-[#6599CB] mb-3 flex items-center gap-2">
                    <Tag size={13} /> {language === 'es' ? 'Tema principal' : 'Focus keyword'}
                  </p>
                  <p className="text-[#2C3E50] font-semibold">{getLocalized(post.focusKeyword, language)}</p>
                </div>
              )}

              {/* Artículos relacionados */}
              {related.length > 0 && (
                <div className="glass-panel p-6 rounded-3xl">
                  <p className="text-xs font-bold tracking-widest uppercase text-[#6599CB] mb-5 flex items-center gap-2">
                    <BookOpen size={13} /> {language === 'es' ? 'Artículos relacionados' : 'Related articles'}
                  </p>
                  <div className="space-y-4">
                    {related.map((rel) => (
                      <button
                        key={rel._id}
                        onClick={() => onNavigate('blog-post', buildBlogPath(rel))}
                        className="w-full text-left group"
                      >
                        <div className="flex gap-3 items-start">
                          {rel.mainImage?.asset && (
                            <img
                              src={urlFor(rel.mainImage).width(72).height(72).url()}
                              alt={getLocalized(rel.mainImage.alt, language) || getLocalized(rel.title, language)}
                              className="w-16 h-16 rounded-xl object-cover shrink-0"
                            />
                          )}
                          <div>
                            <p className="text-sm font-bold text-[#2C3E50] group-hover:text-[#6599CB] transition-colors leading-tight mb-1">
                              {getLocalized(rel.title, language)}
                            </p>
                            {rel.readTime && (
                              <p className="text-xs text-[#64748B] flex items-center gap-1">
                                <Clock size={11} /> {rel.readTime} {language === 'es' ? 'min' : 'min'}
                              </p>
                            )}
                          </div>
                          <ChevronRight size={16} className="text-[#6599CB] shrink-0 mt-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA lateral */}
              <div className="bg-gradient-to-br from-[#6599CB] to-[#4F7B8C] p-8 rounded-3xl text-white text-center">
                <Sparkles size={32} className="mx-auto mb-4 text-[#96D9CC]" />
                <h3 className="font-bold text-lg mb-2">{language === 'es' ? '¿Quieres estos resultados?' : 'Want these results?'}</h3>
                <p className="text-white/80 text-sm mb-6 leading-relaxed">
                  {language === 'es' ? 'Pide una auditoría gratuita de tu estrategia digital inmobiliaria.' : 'Request a free audit of your real estate digital strategy.'}
                </p>
                <button
                  onClick={() => onNavigate('contacto')}
                  className="w-full bg-white text-[#4F7B8C] font-bold py-3 rounded-2xl hover:bg-[#F2994B] hover:text-white transition-all duration-300 text-sm"
                >
                  {language === 'es' ? 'Auditoría Gratuita' : 'Free Audit'}
                </button>
              </div>
            </aside>
          </div>

          {/* Artículos relacionados (mobile / bottom) */}
          {related.length > 0 && (
            <div className="mt-24 lg:hidden">
              <h3 className="text-xl font-bold text-[#2C3E50] mb-8">{language === 'es' ? 'Más artículos' : 'More articles'}</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {related.map((rel) => (
                  <PostCard key={rel._id} post={rel} onNavigate={onNavigate} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
