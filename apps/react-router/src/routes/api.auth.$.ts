import { handlers } from '@oguri/auth'

import type { Route } from './+types/api.auth.$'

const { GET, POST } = handlers

export const loader = async ({ request }: Route.LoaderArgs) => GET(request)
export const action = async ({ request }: Route.ActionArgs) => POST(request)
