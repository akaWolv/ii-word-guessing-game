import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import mix from 'vite-plugin-mix'

export default defineConfig(({ mode }) => {
  const { PORT } = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [
      react(),
      tsconfigPaths(),
      mix({
        handler: './api/api.js',
      }),
      mix({
        handler: './api/words.js',
      }),
    ],
    build: {
      outDir: 'build',
      rollupOptions: {
        output: {
          manualChunks: undefined,
          entryFileNames: 'assets/[name].js',
          assetFileNames: 'assets/[name].[ext]'
        }
      }
    },
    server: {
      port: Number(PORT),
      host: 'localhost',
    },
  }
})
