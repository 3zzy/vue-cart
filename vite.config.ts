const path = require('path')
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/embed.js'),
      name: 'EmbeddedApp',
      fileName: (format) => `index.${format}.js`
    },
    sourcemap: true,
    target: "esnext"
  }
})
