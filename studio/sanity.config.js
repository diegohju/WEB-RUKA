import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'ruka-agency',
  title: 'Ruka Agency · Blog & Contenido',

  // 🔴 IMPORTANTE: Reemplaza con tu Project ID cuando crees el proyecto en sanity.io/manage
  projectId: 'zdwv4tpr',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contenido')
          .items([
            S.listItem()
              .title('📝 Artículos del Blog')
              .child(
                S.documentList()
                  .title('Artículos')
                  .filter('_type == "post"')
              ),
            S.divider(),
            S.listItem()
              .title('🏷️ Categorías')
              .child(
                S.documentList()
                  .title('Categorías')
                  .filter('_type == "category"')
              ),
            S.listItem()
              .title('👤 Autores')
              .child(
                S.documentList()
                  .title('Autores')
                  .filter('_type == "author"')
              ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
