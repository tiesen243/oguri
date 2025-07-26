import { column, idColumn, schema, table } from 'fumadb/schema'

export const users = table('user', {
  id: idColumn('id', 'varchar(255)', { default: 'auto' }),
  name: column('name', 'varchar(255)'),
  email: column('email', 'varchar(255)', { unique: true }),
  image: column('image', 'varchar(255)'),
  createdAt: column('created_at', 'timestamp', { default: 'now' }),
  updatedAt: column('updated_at', 'timestamp', { default: 'now' }),
})

export const accounts = table('account', {
  id: idColumn('id', 'varchar(255)', { default: 'auto' }),
  provider: column('provider', 'varchar(255)'),
  accountId: column('account_id', 'varchar(255)'),
  userId: column('user_id', 'varchar(255)'),
  password: column('password', 'varchar(255)', { nullable: true }),
})

export const sessions = table('session', {
  token: idColumn('token', 'varchar(255)'),
  expires: column('expires', 'timestamp'),
  userId: column('user_id', 'varchar(255)'),
})

export const posts = table('post', {
  id: idColumn('id', 'varchar(255)', { default: 'auto' }),
  title: column('title', 'varchar(255)'),
  content: column('content', 'varchar(255)'),
  userId: column('user_id', 'varchar(255)'),
})

export const v1 = schema({
  version: '1.0.0',
  tables: {
    users,
    accounts,
    sessions,
    posts,
  },
  relations: {
    users: (rel) => ({
      sessions: rel.many(sessions),
      accounts: rel.many(accounts),
      posts: rel.many(posts),
    }),
    accounts: (rel) => ({
      user: rel.one(users, ['userId', 'id']).foreignKey(),
    }),
    sessions: (rel) => ({
      user: rel.one(users, ['userId', 'id']).foreignKey(),
    }),
    posts: (rel) => ({
      user: rel.one(users, ['userId', 'id']).foreignKey(),
    }),
  },
})
