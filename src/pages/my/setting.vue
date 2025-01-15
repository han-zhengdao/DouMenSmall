<template>
  <view class="setting-container">
    <page-header title="系统设置"></page-header>
    <view class="content" :style="{ paddingTop: `calc(88rpx + ${statusBarHeight}px)` }">
      <view class="setting-list">
        <!-- 清除缓存 -->
        <view class="setting-item" @click="handleClearCache">
          <view class="item-left">
            <uni-icons type="trash" size="20" color="#666"></uni-icons>
            <text class="item-text">清除缓存</text>
          </view>
          <view class="item-right">
            <text class="cache-size">{{ cacheSize }}</text>
            <uni-icons type="right" size="16" color="#999"></uni-icons>
          </view>
        </view>

        <!-- 退出登录 -->
        <view class="setting-item" v-if="isLogin" @click="handleLogout">
          <view class="item-left">
            <uni-icons type="close" size="20" color="#ff6b6b"></uni-icons>
            <text class="item-text logout-text">退出登录</text>
          </view>
          <view class="item-right">
            <uni-icons type="right" size="16" color="#999"></uni-icons>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import PageHeader from '@/components/page-header/index.vue'

const userStore = useUserStore()
const statusBarHeight = uni.getSystemInfoSync().statusBarHeight
const isLogin = computed(() => userStore.isLogin)

const cacheSize = ref('0.00MB')

// 获取缓存大小
const getCacheSize = () => {
  // #ifdef APP-PLUS
  const fileManager = plus.io.getStorageManager()
  fileManager.getStorageSize((size) => {
    cacheSize.value = (size / (1024 * 1024)).toFixed(2) + 'MB'
  })
  // #endif
  
  // #ifdef H5
  cacheSize.value = '0.00MB'
  // #endif
}

// 清除缓存
const handleClearCache = () => {
  uni.showModal({
    title: '提示',
    content: '确定要清除缓存吗？',
    success: (res) => {
      if (res.confirm) {
        // #ifdef APP-PLUS
        plus.cache.clear(() => {
          uni.showToast({
            title: '清除成功',
            icon: 'success'
          })
          getCacheSize()
        })
        // #endif
        
        // #ifdef H5
        uni.clearStorageSync()
        uni.showToast({
          title: '清除成功',
          icon: 'success'
        })
        getCacheSize()
        // #endif
      }
    }
  })
}

// 退出登录
const handleLogout = () => {
  uni.showModal({
    title: '提示',
    content: '确定要退出登录吗？',
    success: (res) => {
      if (res.confirm) {
        userStore.logout()
        uni.showToast({
          title: '已退出登录',
          icon: 'success'
        })
        setTimeout(() => {
          uni.switchTab({
            url: '/pages/my/index'
          })
        }, 1500)
      }
    }
  })
}

onMounted(() => {
  getCacheSize()
})
</script>

<style lang="scss">
.setting-container {
  min-height: 100vh;
  background-color: #f8f8f8;

  .setting-list {
    margin-top: 20rpx;
    background-color: #fff;

    .setting-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 32rpx;
      border-bottom: 1px solid #f5f5f5;

      .item-left {
        display: flex;
        align-items: center;
        gap: 12rpx;

        .item-text {
          font-size: 28rpx;
          color: #333;
        }

        .logout-text {
          color: #ff6b6b;
        }
      }

      .item-right {
        display: flex;
        align-items: center;
        gap: 8rpx;

        .cache-size {
          font-size: 26rpx;
          color: #999;
        }
      }

      &:active {
        background-color: #f9f9f9;
      }
    }
  }
}
</style>
