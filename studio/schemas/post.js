// Esquema del Artículo del Blog - Con pestaña SEO completa
export const postSchema = {
  name: 'post',
  title: 'Artículo del Blog',
  type: 'document',
  groups: [
    {
      name: 'content',
      title: '✍️ Contenido',
      default: true,
    },
    {
      name: 'seo',
      title: '🔍 SEO',
    },
    {
      name: 'settings',
      title: '⚙️ Configuración',
    },
  ],
  fields: [
    // ─── PESTAÑA: CONTENIDO ───────────────────────────────────────────────────
    {
      name: 'title',
      title: 'Título del Artículo',
      type: 'localeString',
      group: 'content',
      description: 'El título principal que verán los lectores.',
    },
    {
      name: 'excerpt',
      title: 'Resumen / Introducción',
      type: 'localeText',
      group: 'content',
      description: 'Un párrafo breve que resume el artículo. Aparece en la lista del Blog.',
    },
    {
      name: 'mainImage',
      title: 'Imagen Principal',
      type: 'image',
      group: 'content',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'localeString',
          title: '🖼️ Texto Alternativo (ALT TEXT)',
          description: 'Describe la imagen para Google y para accesibilidad. Ej: "Agente inmobiliario mostrando villa de lujo en Costa Brava"',
        },
      ],
      validation: (R) => R.required(),
    },
    {
      name: 'body',
      title: 'Contenido del Artículo',
      type: 'localeBlock',
      group: 'content',
    },

    // ─── PESTAÑA: SEO ─────────────────────────────────────────────────────────
    {
      name: 'seoTitle',
      title: 'Título SEO',
      type: 'localeString',
      group: 'seo',
      description: 'El título que verá Google (diferente al título del artículo si quieres). Máximo 60 caracteres.',
    },
    {
      name: 'seoDescription',
      title: 'Meta-Descripción',
      type: 'localeText',
      group: 'seo',
      description: 'Resumen que aparece debajo del título en Google. Entre 140 y 160 caracteres es lo óptimo.',
    },
    {
      name: 'focusKeyword',
      title: '🎯 Focus Keyword (Palabra clave principal)',
      type: 'localeString',
      group: 'seo',
      description: 'La palabra o frase por la que quieres posicionarte. Ej: "marketing inmobiliario lujo Costa Brava"',
    },
    {
      name: 'secondaryKeywords',
      title: 'Palabras Clave Secundarias',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'seo',
      description: 'Otras palabras relacionadas que refuerzan el posicionamiento.',
      options: { layout: 'tags' },
    },
    {
      name: 'canonicalUrl',
      title: 'URL Canónica',
      type: 'url',
      group: 'seo',
      description: 'Solo rellena esto si el artículo existe también en otra web y quieres indicarle a Google cuál es el original.',
    },
    {
      name: 'ogImage',
      title: '📸 Imagen OG (Open Graph / Redes Sociales)',
      type: 'image',
      group: 'seo',
      description: 'Imagen que se ve cuando compartes el artículo en LinkedIn, WhatsApp o Instagram. Tamaño recomendado: 1200x630px.',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'localeString',
          title: 'ALT TEXT de la imagen OG',
        },
      ],
    },
    {
      name: 'noIndex',
      title: '🚫 No indexar en Google',
      type: 'boolean',
      group: 'seo',
      description: 'Activa esto si NO quieres que Google indexe este artículo (borradores, pruebas…).',
      initialValue: false,
    },

    // ─── PESTAÑA: CONFIGURACIÓN ────────────────────────────────────────────────
    {
      name: 'slug',
      title: 'URL del Artículo (Slug)',
      type: 'slug',
      group: 'settings',
      description: 'La dirección web del artículo. Ej: "marketing-inmobiliario-lujo-costa-brava"',
      options: {
        source: 'title.es',
        maxLength: 96,
      },
      validation: (R) => R.required(),
    },
    {
      name: 'author',
      title: 'Autor',
      type: 'reference',
      to: { type: 'author' },
      group: 'settings',
    },
    {
      name: 'categories',
      title: 'Categorías',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
      group: 'settings',
    },
    {
      name: 'publishedAt',
      title: 'Fecha de publicación',
      type: 'datetime',
      group: 'settings',
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'featured',
      title: '⭐ Artículo Destacado',
      type: 'boolean',
      group: 'settings',
      description: 'Los artículos destacados aparecen primero y con mayor tamaño en el Blog.',
      initialValue: false,
    },
    {
      name: 'readTime',
      title: 'Tiempo de lectura (minutos)',
      type: 'number',
      group: 'settings',
      description: 'Calculado automáticamente, pero puedes ajustarlo.',
    },
  ],

  // Vista previa en el panel de Sanity
  preview: {
    select: {
      title: 'title.es',
      author: 'author.name',
      media: 'mainImage',
      featured: 'featured',
    },
    prepare(selection) {
      const { author, featured } = selection
      return {
        ...selection,
        subtitle: `${featured ? '⭐ ' : ''}${author ? `por ${author}` : 'Sin autor asignado'}`,
      }
    },
  },
}
