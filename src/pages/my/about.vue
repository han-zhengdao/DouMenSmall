<template>
  <view class="about-container">
    <page-header title="关于我们"></page-header>
    <view class="content" :style="{ paddingTop: `calc(88rpx + ${statusBarHeight}px)` }">
      <!-- Logo区域 -->
      <view class="logo-section">
        <image src="/static/images/logo.png" mode="aspectFit" class="logo-img" />
        <text class="app-name">电子罗盘</text>
        <text class="version">Version {{ version }}</text>
      </view>

      <!-- 功能列表 -->
      <view class="menu-list">
        <!-- 版本检查 -->
        <view class="menu-item" @click="handleCheckUpdate">
          <view class="item-left">
            <uni-icons type="refresh" size="20" color="#666"></uni-icons>
            <text class="item-text">检查更新</text>
          </view>
          <view class="item-right">
            <text class="current-version">当前版本 {{ version }}</text>
            <uni-icons type="right" size="16" color="#999"></uni-icons>
          </view>
        </view>

        <!-- 意见反馈 -->
        <view class="menu-item" @click="handleFeedback">
          <view class="item-left">
            <uni-icons type="chat" size="20" color="#666"></uni-icons>
            <text class="item-text">意见反馈</text>
          </view>
          <view class="item-right">
            <uni-icons type="right" size="16" color="#999"></uni-icons>
          </view>
        </view>

        <!-- 联系我们 -->
        <view class="menu-item" @click="handleContact">
          <view class="item-left">
            <uni-icons type="phone" size="20" color="#666"></uni-icons>
            <text class="item-text">联系我们</text>
          </view>
          <view class="item-right">
            <text class="contact-info">{{ contactInfo }}</text>
            <uni-icons type="right" size="16" color="#999"></uni-icons>
          </view>
        </view>
      </view>

      <!-- 底部版权信息 -->
      <view class="copyright">
        <text class="copyright-text">Copyright © 2024 电子罗盘</text>
        <text class="copyright-text">All Rights Reserved</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import PageHeader from '@/components/page-header/index.vue'

const statusBarHeight = uni.getSystemInfoSync().statusBarHeight
const version = ref('1.0.0')
const contactInfo = ref('service@example.com')

// 检查更新
const handleCheckUpdate = () => {
  uni.showLoading({ title: '检查更新中...' })
  setTimeout(() => {
    uni.hideLoading()
    uni.showToast({
      title: '已是最新版本',
      icon: 'none'
    })
  }, 1500)
}

// 意见反馈
const handleFeedback = () => {
  uni.navigateTo({
    url: '/pages/my/feedback'
  })
}

// 联系我们
const handleContact = () => {
  // #ifdef H5
  uni.setClipboardData({
    data: contactInfo.value,
    success: () => {
      uni.showToast({
        title: '邮箱已复制',
        icon: 'success'
      })
    }
  })
  // #endif

  // #ifdef APP-PLUS
  plus.runtime.openURL(`mailto:${contactInfo.value}`)
  // #endif
}
</script>

<style lang="scss">
.about-container {
  min-height: 100vh;
  background-color: #f8f8f8;

  .logo-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 60rpx 0;
    background-color: #fff;

    .logo-img {
      width: 160rpx;
      height: 160rpx;
      margin-bottom: 24rpx;
    }

    .app-name {
      font-size: 36rpx;
      color: #333;
      font-weight: 600;
      margin-bottom: 12rpx;
    }

    .version {
      font-size: 24rpx;
      color: #999;
    }
  }

  .menu-list {
    margin-top: 20rpx;
    background-color: #fff;

    .menu-item {
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
      }

      .item-right {
        display: flex;
        align-items: center;
        gap: 8rpx;

        .current-version,
        .contact-info {
          font-size: 26rpx;
          color: #999;
        }
      }

      &:active {
        background-color: #f9f9f9;
      }

      &:last-child {
        border-bottom: none;
      }
    }
  }

  .copyright {
    padding: 60rpx 32rpx;
    text-align: center;

    .copyright-text {
      display: block;
      font-size: 24rpx;
      color: #999;
      line-height: 1.8;
    }
  }
}
</style>
