import { createCli } from 'fumadb/cli'

import { db } from '.'
import packageJson from '../package.json'

async function main() {
  const cli = createCli({
    db,
    command: packageJson.name,
    version: packageJson.version,
  })

  await cli.main()
}

main().catch((error: unknown) => {
  console.error(error)
  process.exit(1)
})
