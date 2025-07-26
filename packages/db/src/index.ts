import { Pool } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-serverless'
import { fumadb } from 'fumadb'
import { drizzleAdapter } from 'fumadb/adapters/drizzle'

import * as schema from './schema'
import { v1 } from './schema/v1'

const _db = fumadb({
  namespace: 'db',
  schemas: [v1],
})

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const client = drizzle({ client: pool, schema, casing: 'snake_case' })

export const db = _db.client(
  drizzleAdapter({ db: client, provider: 'postgresql' }),
)
