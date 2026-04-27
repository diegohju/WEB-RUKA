const supportedLanguages = [
  { id: 'es', title: 'Español', isDefault: true },
  { id: 'en', title: 'Inglés' }
];

export const localeString = {
  title: 'Texto Traducible',
  name: 'localeString',
  type: 'object',
  fieldsets: [
    {
      title: 'Traducciones',
      name: 'translations',
      options: { collapsible: true }
    }
  ],
  fields: supportedLanguages.map(lang => ({
    title: lang.title,
    name: lang.id,
    type: 'string',
    fieldset: lang.isDefault ? null : 'translations'
  }))
};

export const localeText = {
  title: 'Texto Largo Traducible',
  name: 'localeText',
  type: 'object',
  fieldsets: [
    {
      title: 'Traducciones',
      name: 'translations',
      options: { collapsible: true }
    }
  ],
  fields: supportedLanguages.map(lang => ({
    title: lang.title,
    name: lang.id,
    type: 'text',
    rows: 3,
    fieldset: lang.isDefault ? null : 'translations'
  }))
};

export const localeBlock = {
  title: 'Contenido Traducible',
  name: 'localeBlock',
  type: 'object',
  fieldsets: [
    {
      title: 'Traducciones',
      name: 'translations',
      options: { collapsible: true }
    }
  ],
  fields: supportedLanguages.map(lang => ({
    title: lang.title,
    name: lang.id,
    type: 'array',
    of: [
      {
        type: 'block',
        styles: [
          { title: 'Párrafo', value: 'normal' },
          { title: 'H2', value: 'h2' },
          { title: 'H3', value: 'h3' },
          { title: 'H4', value: 'h4' },
          { title: 'Cita destacada', value: 'blockquote' },
        ],
        marks: {
          decorators: [
            { title: 'Negrita', value: 'strong' },
            { title: 'Cursiva', value: 'em' },
            { title: 'Código', value: 'code' },
          ],
          annotations: [
            {
              name: 'link',
              type: 'object',
              title: 'Enlace',
              fields: [
                {
                  name: 'href',
                  type: 'url',
                  title: 'URL',
                },
                {
                  name: 'blank',
                  type: 'boolean',
                  title: 'Abrir en nueva pestaña',
                  initialValue: true,
                },
              ],
            },
          ],
        },
      },
      {
        type: 'image',
        options: { hotspot: true },
        fields: [
          {
            name: 'alt',
            type: 'localeString',
            title: '🖼️ Texto Alternativo (ALT TEXT)',
            description: 'Obligatorio para SEO',
          },
          {
            name: 'caption',
            type: 'localeString',
            title: 'Leyenda / Pie de foto',
          },
        ],
      },
    ],
    fieldset: lang.isDefault ? null : 'translations'
  }))
};
