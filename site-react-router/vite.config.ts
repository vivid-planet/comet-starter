import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import babel from 'vite-plugin-babel';

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
    tailwindcss(), 
    reactRouter(), 
    tsconfigPaths(),
  ],
});
