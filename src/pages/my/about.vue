<template>
  <view class="about-container">
    <page-header title="关于我们"></page-header>
    <view class="content" :style="{ paddingTop: `calc(88rpx + ${statusBarHeight}px)` }">
      <!-- 关于页内容 -->
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import PageHeader from '@/components/page-header/index.vue'

const statusBarHeight = uni.getSystemInfoSync().statusBarHeight
</script>

<style lang="scss">
  .about-container {
    min-height: 100vh;
    background-color: #f5f5f5;
    padding: 40rpx;

    .logo {
      text-align: center;
      margin-bottom: 40rpx;

      image {
        width: 200rpx;
        height: 200rpx;
      }
    }

    .version {
      text-align: center;
      margin-bottom: 60rpx;
      color: #666;
      font-size: 28rpx;
    }

    .info-list {
      background-color: #fff;
      border-radius: 12rpx;
      padding: 20rpx;

      .info-item {
        display: flex;
        justify-content: space-between;
        padding: 20rpx;
        border-bottom: 1rpx solid #eee;

        .label {
          color: #333;
          font-size: 28rpx;
        }

        .value {
          color: #666;
          font-size: 28rpx;
        }

        &:last-child {
          border-bottom: none;
        }
      }
    }
  }
</style>
