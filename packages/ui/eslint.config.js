import baseConfig from '@oguri/eslint-config/base'
import reactConfig from '@oguri/eslint-config/react'

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: ['dist/**'],
  },
  ...baseConfig,
  ...reactConfig,
]
