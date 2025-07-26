import baseConfig, { restrictEnvAccess } from '@oguri/eslint-config/base'
import reactConfig from '@oguri/eslint-config/react'

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: ['.react-router/**', 'build/**'],
  },
  ...baseConfig,
  ...reactConfig,
  ...restrictEnvAccess,
]
