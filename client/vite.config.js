import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

export default defineConfig({
  plugins: [
    uni(),
  ],
  optimizeDeps: {
    include: ['@dcloudio/uni-ui']
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/, /@dcloudio\/uni-ui/]
    }
  }
})
