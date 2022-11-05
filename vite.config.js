import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require("path")

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.js"),
      name: 'vue-dynamic-form',
      fileName: (format) => `vue-dynamic-form.${format}.js`
    },
    rollupOptions: {
      // Externalize deps that shouldn't be loaded in to library
      external: ["vue"],
      output: {
        // Provide global variables to use in the UMD for externalized deps
        globals: {
          vue: "Vue"
        }
      }
    }
  },
  plugins: [vue()]
})
