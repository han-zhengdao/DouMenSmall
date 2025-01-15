import { createSSRApp } from 'vue'
import App from './App.vue'
import { setupStore } from './store'
import 'virtual:uno.css'
import VueCesium from 'vue-cesium'
import 'vue-cesium/dist/index.css'

export function createApp() {
  const app = createSSRApp(App)
  setupStore(app)

  // 只在 H5 环境下加载 VueCesium
  // #ifdef H5
  app.use(VueCesium, {
    cesiumPath: 'https://cdn.jsdelivr.net/npm/cesium@1.92/Build/Cesium/Cesium.js',
    accessToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2OGE2MjZlOC1mMzhiLTQ3NTQtYTNiOS1iYmZmNzQwZjYwZjkiLCJpZCI6MTc2ODY3LCJpYXQiOjE2OTg5OTg1Nzh9.P9fyB0T60H0HW_nXHtZhhtHsp_RvVEPfA90HJBxbWSs'
  })
  // #endif

  return {
    app
  }
}
