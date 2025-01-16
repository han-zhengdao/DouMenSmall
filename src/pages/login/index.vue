<template>
  <view class="login-container">
    <!-- 顶部返回 -->
    <view class="header">
      <view class="back-btn" @click="handleBack">
        <text class="back-text">暂不登录</text>
      </view>
    </view>

    <!-- 登录内容 -->
    <view class="content">
      <!-- Logo -->
      <view class="logo-section">
        <image src="/static/images/logo.png" mode="aspectFit" class="logo-img" />
        <text class="app-name">电子罗盘</text>
      </view>

      <!-- 登录按钮 -->
      <view class="login-section">
        <button class="login-btn" @click="handleLogin">
          <uni-icons type="weixin" size="24" color="#fff"></uni-icons>
          <text>一键登录/注册</text>
        </button>
        <view class="agreement">
          <checkbox :checked="isAgree" @click="isAgree = !isAgree" color="#1296db" />
          <text class="agreement-text">
            登录即代表同意
            <text class="link" @click="handleAgreement('user')">《用户协议》</text>
            和
            <text class="link" @click="handleAgreement('privacy')">《隐私政策》</text>
          </text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { mockUser } from '@/mock/user'

const userStore = useUserStore()
const isAgree = ref(false)

// 返回上一页
const handleBack = () => {
  uni.navigateBack()
}

// 处理登录
const handleLogin = () => {
  if (!isAgree.value) {
    uni.showToast({
      title: '请先同意用户协议和隐私政策',
      icon: 'none'
    })
    return
  }

  // 模拟登录成功
  userStore.setToken('test-token')
  userStore.setUserInfo(mockUser)

  uni.showToast({
    title: '登录成功',
    icon: 'success'
  })

  setTimeout(() => {
    uni.navigateBack()
  }, 1500)
}

// 查看协议
const handleAgreement = (type: 'user' | 'privacy') => {
  uni.navigateTo({
    url: `/pages/agreement/index?type=${type}`
  })
}
</script>

<style lang="scss">
.login-container {
  min-height: 100vh;
  background-color: #fff;
  padding-top: var(--status-bar-height);

  .header {
    padding: 0 32rpx;
    height: 88rpx;
    display: flex;
    align-items: center;

    .back-btn {
      height: 64rpx;
      padding: 0 24rpx;
      display: flex;
      align-items: center;
      border-radius: 32rpx;
      background-color: #f5f5f5;
      margin-top: 28rpx;

      .back-text {
        font-size: 28rpx;
        color: #666;
      }

      &:active {
        opacity: 0.8;
      }
    }
  }

  .content {
    padding: 120rpx 60rpx;

    .logo-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 120rpx;

      .logo-img {
        width: 160rpx;
        height: 160rpx;
        margin-bottom: 24rpx;
      }

      .app-name {
        font-size: 36rpx;
        color: #333;
        font-weight: 600;
      }
    }

    .login-section {
      .login-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12rpx;
        height: 88rpx;
        background-color: #1296db;
        color: #fff;
        font-size: 32rpx;
        border-radius: 44rpx;
        border: none;
        margin-bottom: 32rpx;

        &:active {
          opacity: 0.9;
        }
      }

      .agreement {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8rpx;

        .agreement-text {
          font-size: 24rpx;
          color: #666;
        }

        .link {
          color: #1296db;
        }
      }
    }
  }
}
</style> 