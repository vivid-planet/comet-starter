import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from "vite-tsconfig-paths";
import { envOnlyMacros } from "vite-env-only"
import babel from 'vite-plugin-babel';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    babel({
      exclude: 'node_modules/**',
      filter: /\.tsx?$/,
      babelConfig: {
        presets: ["@babel/preset-typescript"],
        plugins: [
          ['babel-plugin-styled-components', { displayName: true, ssr: true }]
        ],
      }
    }),
    react(),
    tsconfigPaths(),
    envOnlyMacros()
  ],
})
