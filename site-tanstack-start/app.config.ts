import { defineConfig } from '@tanstack/react-start/config'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  tsr: {
    routeFileIgnorePattern: '.generated.ts'
  },
  react: {
    babel: {
      plugins: [
        ['babel-plugin-styled-components', { displayName: true, ssr: true }]
      ],
  }
  },
  vite: {
    plugins: [
      tsConfigPaths({
        projects: ['./tsconfig.json'],
      }),
    ],
  },
})
