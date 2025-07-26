import { createId } from '@paralleldrive/cuid2'
import { relations } from 'drizzle-orm'
import { foreignKey, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core'

export const users = pgTable('user', {
  id: varchar('id', { length: 255 })
    .primaryKey()
    .$defaultFn(() => createId())
    .notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  image: varchar('image', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => new Date()),
})

export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(sessions, {
    relationName: 'sessions_users',
  }),
  accounts: many(accounts, {
    relationName: 'accounts_users',
  }),
  posts: many(posts, {
    relationName: 'posts_users',
  }),
}))

export const accounts = pgTable(
  'account',
  {
    id: varchar('id', { length: 255 })
      .primaryKey()
      .$defaultFn(() => createId())
      .notNull(),
    provider: varchar('provider', { length: 255 }).notNull(),
    accountId: varchar('account_id', { length: 255 }).notNull(),
    userId: varchar('user_id', { length: 255 }).notNull(),
    password: varchar('password', { length: 255 }),
  },
  (table) => [
    foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
      name: 'user_fk',
    })
      .onUpdate('restrict')
      .onDelete('restrict'),
  ],
)

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    relationName: 'accounts_users',
    fields: [accounts.userId],
    references: [users.id],
  }),
}))

export const sessions = pgTable(
  'session',
  {
    token: varchar('token', { length: 255 }).primaryKey().notNull(),
    expires: timestamp('expires').notNull(),
    userId: varchar('user_id', { length: 255 }).notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
      name: 'user_fk',
    })
      .onUpdate('restrict')
      .onDelete('restrict'),
  ],
)

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    relationName: 'sessions_users',
    fields: [sessions.userId],
    references: [users.id],
  }),
}))

export const posts = pgTable(
  'post',
  {
    id: varchar('id', { length: 255 })
      .primaryKey()
      .$defaultFn(() => createId())
      .notNull(),
    title: varchar('title', { length: 255 }).notNull(),
    content: varchar('content', { length: 255 }).notNull(),
    userId: varchar('user_id', { length: 255 }).notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
      name: 'user_fk',
    })
      .onUpdate('restrict')
      .onDelete('restrict'),
  ],
)

export const postsRelations = relations(posts, ({ one }) => ({
  user: one(users, {
    relationName: 'posts_users',
    fields: [posts.userId],
    references: [users.id],
  }),
}))
