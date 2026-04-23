export const authorSchema = {
  name: 'author',
  title: 'Autor',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nombre completo',
      type: 'string',
      validation: (R) => R.required(),
    },
    {
      name: 'role',
      title: 'Cargo / Rol',
      type: 'string',
      description: 'Ej: "Estrategia y Analítica" o "Comunicación Internacional"',
    },
    {
      name: 'image',
      title: 'Foto del autor',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'ALT TEXT',
        },
      ],
    },
    {
      name: 'bio',
      title: 'Biografía corta',
      type: 'text',
      rows: 3,
    },
    {
      name: 'linkedin',
      title: 'URL de LinkedIn',
      type: 'url',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'image',
    },
  },
}

export const categorySchema = {
  name: 'category',
  title: 'Categoría',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Nombre de la categoría',
      type: 'string',
      validation: (R) => R.required(),
    },
    {
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title' },
      validation: (R) => R.required(),
    },
    {
      name: 'description',
      title: 'Descripción',
      type: 'text',
      rows: 2,
    },
    {
      name: 'color',
      title: 'Color de etiqueta',
      type: 'string',
      options: {
        list: [
          { title: 'Azul Ruka', value: '#6599CB' },
          { title: 'Naranja Acento', value: '#F2994B' },
          { title: 'Verde Menta', value: '#96D9CC' },
          { title: 'Marino', value: '#4F7B8C' },
        ],
      },
    },
  ],
}
