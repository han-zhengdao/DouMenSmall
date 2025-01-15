<template>
  <div class="map-wrapper">
    <!-- 地图容器 -->
    <div class="map-container">
      <vc-viewer
        :animation="false"
        :timeline="false"
        :base-layer-picker="false"
        @ready="onViewerReady"
      >
        <vc-layer-imagery>
          <vc-imagery-provider-arcgis
            url="https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer"
          />
        </vc-layer-imagery>
        <!-- 展示标尺 -->
        <vc-distance-legend
          position="top-left"
          :offset="[15, 20]"
          background="none"
          bar-background="#fff"
        />
        <!-- 展示经纬度信息 -->
        <vc-status-bar
          position="top-left"
          :offset="[15, 60]"
          background="none"
          :show-mouse-info="true"
          :show-performance-info="false"
          :show-camera-info="false"
          :use-projection="false"
          :mouse-info="{
            lng: '经度',
            lat: '纬度',
            height: '高度'
          }"
          text-color="#ffffff"
        />
        <!-- 罗盘组件 -->
        <vc-compass
          v-if="isCompassVisible"
          ref="compassRef"
          :teleportToViewer="false"
          customClass="compass-container"
          :outer-options="{
            icon: 'svguse:#vc-icons-compass-outer',
            background: 'url(/public/lp.svg)',
            size: '300px'
          }"
          :inner-options="{
            icon: 'fa fa-compass',
            size: '50px',
            background: 'rgba(0, 0, 0, 0.3)',
            tooltip: {
              show: false
            }
          }"
        >
          <img
            class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-999"
            src="/public/Rectangle4.svg"
            alt="天心线"
          />
          <img
            class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-999"
            src="/public/Rectangle5.svg"
            alt="天心线"
          />
        </vc-compass>
        <!-- 展示缩放组件 -->
        <vc-zoom-control
          :teleportToViewer="false"
          customClass="zoom-control"
          background="rgba(0, 0, 0, 0.6)"
          borderRadius="6px"
          border="none"
          :enable-reset-button="false"
          :zoomInOptions="{ size: '40px', tooltip: 'none' }"
          :zoomOutOptions="{ size: '40px', tooltip: 'none' }"
        />
        <!-- 定位按钮 -->
        <button class="location-btn" @click="handleLocation">
          <svg
            class="location-icon"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3A8.994 8.994 0 0 0 13 3.06V1h-2v2.06A8.994 8.994 0 0 0 3.06 11H1v2h2.06A8.994 8.994 0 0 0 11 20.94V23h2v-2.06A8.994 8.994 0 0 0 20.94 13H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"
              fill="currentColor"
            />
          </svg>
        </button>
        <!-- 罗盘控制按钮 -->
        <button class="compass-btn" @click="toggleCompass">
          <div class="compass-text-wrapper">{{ isCompassVisible ? '隐藏' : '显示' }}罗盘</div>
        </button>
      </vc-viewer>
    </div>
    <!-- 底部信息栏 -->
    <div class="bottom-bar">
      <span class="bottom-text">{{ isCompassVisible ? '隐藏罗盘' : '显示罗盘' }}</span>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  // 保存 Cesium 实例
  let Cesium = null

  const isCompassVisible = ref(false)
  const compassRef = ref(null)
  const viewer = ref(null)
  const position = ref({ lng: 0, lat: 0 }) // 保存经纬度信息

  // 定义自定义定位 API
  function customLocationAPI(errorCallback) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { longitude, latitude } = pos.coords
          position.value = { lng: longitude, lat: latitude }
          // 定位成功后移动相机
          if (viewer.value && Cesium) {
            viewer.value.camera.setView({
              destination: Cesium.Cartesian3.fromDegrees(longitude, latitude, 20000)
            })
          }
        },
        (err) => {
          // 根据错误类型显示不同提示
          const errorMessages = {
            1: '请允许浏览器获取位置信息',
            2: '无法获取位置信息',
            3: '获取位置信息超时'
          }
          console.warn(errorMessages[err.code] || '定位失败')

          // 无论什么错误，都移动到默认位置
          position.value = { lng: 114.06, lat: 22.54 } // 设置默认经纬度（深圳）
          // 定位失败时移动到默认位置
          if (viewer.value && Cesium) {
            viewer.value.camera.setView({
              destination: Cesium.Cartesian3.fromDegrees(114.06, 22.54, 20000)
            })
          }
          if (errorCallback) errorCallback(err)
        }
      )
    } else {
      const error = new Error('浏览器不支持 Geolocation API')
      if (errorCallback) errorCallback(error)
      position.value = { lng: 114.06, lat: 22.54 } // 设置默认经纬度
    }
    return position.value
  }

  // 处理定位
  const handleLocation = async () => {
    customLocationAPI((error) => {
      console.error('定位失败:', error)
    })
  }

  // 切换罗盘显示和隐藏
  const toggleCompass = async () => {
    if (isCompassVisible.value) {
      const result = await compassRef.value?.unload()
      if (result) {
        isCompassVisible.value = false
      }
    } else {
      isCompassVisible.value = true
      await compassRef.value?.load()
    }
  }

  const onViewerReady = (readyObj) => {
    const { Cesium: CesiumInstance, viewer: v } = readyObj
    Cesium = CesiumInstance
    viewer.value = v

    // 设置默认视角
    viewer.value.camera.setView({
      destination: Cesium.Cartesian3.fromDegrees(114.06, 22.54, 20000)
    })
    // 隐藏版权信息
    viewer.value._cesiumWidget._creditContainer.style.display = 'none'
  }
</script>

<style scoped>
  .map-wrapper {
    width: 100%;
    height: 100vh;
    position: relative;
    overflow: hidden;
  }

  .map-container {
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
  }

  .compass-container {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
  }

  .compass-btn {
    position: absolute;
    left: 20px;
    bottom: 80px;
    z-index: 101;
    padding: 8px;
    background: rgba(0, 0, 0, 0.6);
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.3s ease;
    backdrop-filter: blur(4px);
    width: 64px;
    height: 64px;
  }

  .compass-btn:hover {
    background: rgba(0, 0, 0, 0.8);
  }

  .location-btn {
    position: absolute;
    right: 20px;
    bottom: 80px;
    padding: 8px;
    border-radius: 6px;
    transition: all 0.3s ease;
    width: 43px;
    height: 43px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.6);
    color: white;
    border: none;
    cursor: pointer;
    z-index: 101;
  }

  .location-icon {
    width: 18px;
    height: 18px;
    transition: transform 0.3s ease;
  }

  .location-btn:hover .location-icon {
    transform: scale(1.1);
  }

  .bottom-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20px 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0.4) 30%,
      rgba(0, 0, 0, 0.7)
    );
    color: white;
    text-align: center;
    z-index: 102;
    backdrop-filter: blur(2px);
  }

  .bottom-text {
    font-size: 13px;
    color: #ffffff;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    letter-spacing: 1px;
  }

  .compass-text-wrapper {
    color: white;
    text-align: center;
    font-size: 16px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    white-space: pre-line;
    line-height: 20px;
  }

  :deep(.vc-distance-legend) {
    background: transparent !important;
    padding: 4px 8px;
    border-radius: 4px;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
    color: #ffffff;
  }

  :deep(.vc-distance-legend div) {
    color: white !important;
  }

  :deep(.vc-status-bar) {
    background: transparent !important;
    padding: 4px 8px;
    border-radius: 4px;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  }

  :deep(.vc-status-bar span) {
    color: white !important;
  }

  .zoom-control {
    position: absolute;
    right: 20px;
    bottom: 150px;
    backdrop-filter: blur(4px);
  }

  :deep(.zoom-control .vc-btn) {
    color: white !important;
    transition: all 0.3s ease;
    width: 40px !important;
    height: 40px !important;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 !important;
    min-width: 40px !important;
  }

  :deep(.zoom-control .vc-btn:hover) {
    background: rgba(0, 0, 0, 0.8) !important;
  }

  :deep(.zoom-control .vc-btn i) {
    font-size: 14px;
    line-height: 40px !important;
    width: 40px !important;
    height: 40px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
  }

  :deep(.zoom-control .vc-btn i::before) {
    font-size: 14px;
    transform: scale(1.6);
  }

  :deep(.zoom-control .vc-btn:first-child) {
    margin-bottom: 1px;
  }
</style>
