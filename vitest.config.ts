import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: [],
    include: ['tests/**/*.test.ts'],
  },
  plugins: [
    tsconfigPaths({
      projects: ['./tsconfig.dev.json'],
    }),
  ],
})
