import { type SchemaTypeDefinition } from 'sanity'
import { product } from './product'
import { userSchema } from './user'
import { comment } from './comment'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product,userSchema,comment],
}
