import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      vue({
        refTransform:true,
        reactivityTransform:true,
      })
  ],
  base:"./",
  server:{
    proxy:{
      '/list':{
        target:"http://127.0.0.1:8080"
      }
    }
  }


})
