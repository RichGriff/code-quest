import { type SchemaTypeDefinition } from 'sanity'
import questions from './questions'
import categories from './categories'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [questions, categories],
}