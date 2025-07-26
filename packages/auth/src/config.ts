import { db } from '@oguri/db'
import { env } from '@oguri/validators/env'

import type { AuthOptions } from './core/types'
import { encodeHex, hashSecret } from './core/crypto'
import Discord from './providers/discord'

const adapter = getAdapter()
export const authOptions = {
  adapter,
  session: {
    expiresIn: 60 * 60 * 24 * 30, // 30 days
    expiresThreshold: 60 * 60 * 24 * 7, // 7 days
  },
  providers: {
    discord: new Discord({
      clientId: env.AUTH_DISCORD_ID,
      clientSecret: env.AUTH_DISCORD_SECRET,
    }),
  },
} satisfies AuthOptions

export type Providers = keyof typeof authOptions.providers

export async function validateSessionToken(token: string) {
  const hashToken = encodeHex(await hashSecret(token))
  return await adapter.getSessionAndUser(hashToken)
}

export async function invalidateSessionToken(token: string) {
  const hashToken = encodeHex(await hashSecret(token))
  await adapter.deleteSession(hashToken)
}

function getAdapter(): AuthOptions['adapter'] {
  return {
    getUserByEmail: async (email) => {
      const orm = db.abstract

      const user = await orm.findFirst('users', {
        where: (b) => b('email', '=', email),
      })
      return user ?? null
    },
    createUser: async (data) => {
      const orm = db.abstract
      const user = await orm.create('users', data)
      return user
    },
    getAccount: async (provider, accountId) => {
      const orm = db.abstract
      const account = await orm.findFirst('accounts', {
        where: (b) =>
          b.and(b('provider', '=', provider), b('accountId', '=', accountId)),
      })
      return account ?? null
    },
    createAccount: async (data) => {
      const orm = db.abstract
      const account = await orm.create('accounts', data)
      return account
    },
    getSessionAndUser: async (token) => {
      const orm = db.abstract
      const session = await orm.findFirst('sessions', {
        where: (b) => b('token', '=', token),
        join: (b) => b.user(),
        select: ['expires'],
      })
      return session ?? null
    },
    createSession: async (data) => {
      const orm = db.abstract
      const session = await orm.create('sessions', data)
      return session
    },
    updateSession: async (token, data) => {
      const orm = db.abstract
      await orm.updateMany('sessions', {
        set: data,
        where: (b) => b('token', '=', token),
      })
      return null
    },
    deleteSession: async (token) => {
      const orm = db.abstract
      await orm.deleteMany('sessions', { where: (b) => b('token', '=', token) })
    },
  }
}
