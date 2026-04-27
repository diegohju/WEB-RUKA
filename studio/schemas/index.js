import { postSchema } from './post.js'
import { authorSchema, categorySchema } from './author-category.js'
import { localeString, localeText, localeBlock } from './locale.js'

export const schemaTypes = [localeString, localeText, localeBlock, postSchema, authorSchema, categorySchema]
