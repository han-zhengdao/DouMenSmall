<template>
  <view class="my-container">
    <!-- 用户信息区域 -->
    <view class="user-info-section">
      <view class="user-info" @click="handleLogin">
        <template v-if="isLogin">
          <image :src="userInfo.avatar || defaultAvatar" class="avatar" mode="aspectFill" />
          <view class="info">
            <text class="nickname">{{ userInfo.nickname || '默认昵称' }}</text>
            <text class="uid">ID: {{ userInfo.uid || '--' }}</text>
          </view>
        </template>
        <template v-else>
          <image :src="defaultAvatar" class="avatar" mode="aspectFill" />
          <view class="info">
            <text class="login-tip">点击登录</text>
          </view>
        </template>
        <uni-icons type="right" size="16" color="#999"></uni-icons>
      </view>
    </view>

    <!-- 功能菜单 -->
    <view class="menu-section">
      <view class="menu-group">
        <view class="menu-item" v-for="(item, index) in menuList" :key="index" @click="handleMenu(item)">
          <view class="menu-item-left">
            <uni-icons :type="item.icon" size="20" color="#666"></uni-icons>
            <text class="menu-text">{{ item.name }}</text>
          </view>
          <uni-icons type="right" size="16" color="#999"></uni-icons>
        </view>
      </view>
    </view>

    <!-- 退出登录按钮 -->
    <view class="logout-section" v-if="isLogin">
      <button class="logout-btn" @click="handleLogout">退出登录</button>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const defaultAvatar = '/static/images/default-avatar.png'

// 登录状态
const isLogin = computed(() => userStore.isLogin)
const userInfo = computed(() => userStore.userInfo)

// 菜单列表
const menuList = [
  { name: '我的订单', icon: 'list', path: '/pages/my/order' },
  { name: '收货地址', icon: 'location', path: '/pages/my/address' },
  { name: '系统设置', icon: 'gear', path: '/pages/my/setting' },
  { name: '关于我们', icon: 'info', path: '/pages/my/about' }
]

// 处理登录
const handleLogin = () => {
  if (!isLogin.value) {
    uni.navigateTo({
      url: '/pages/login/index'
    })
  }
}

// 处理菜单点击
const handleMenu = (item) => {
  if (item.path) {
    uni.navigateTo({
      url: item.path
    })
  }
}

// 处理退出登录
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
      }
    }
  })
}
</script>

<style lang="scss">
.my-container {
  min-height: 100vh;
  background-color: #f8f8f8;
}

.user-info-section {
  background-color: #fff;
  padding: 40rpx 32rpx;
  margin-bottom: 20rpx;

  .user-info {
    display: flex;
    align-items: center;
    
    .avatar {
      width: 120rpx;
      height: 120rpx;
      border-radius: 60rpx;
      margin-right: 24rpx;
      background-color: #f5f5f5;
    }

    .info {
      flex: 1;
      
      .nickname {
        font-size: 32rpx;
        color: #333;
        font-weight: 500;
        margin-bottom: 8rpx;
      }

      .uid {
        font-size: 24rpx;
        color: #999;
      }

      .login-tip {
        font-size: 32rpx;
        color: #666;
      }
    }
  }
}

.menu-section {
  background-color: #fff;
  
  .menu-group {
    .menu-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 32rpx;
      border-bottom: 1px solid #f5f5f5;

      &:active {
        background-color: #f9f9f9;
      }

      .menu-item-left {
        display: flex;
        align-items: center;
        
        .menu-text {
          font-size: 28rpx;
          color: #333;
          margin-left: 16rpx;
        }
      }
    }
  }
}

.logout-section {
  padding: 40rpx 32rpx;

  .logout-btn {
    width: 100%;
    height: 88rpx;
    line-height: 88rpx;
    text-align: center;
    background-color: #fff;
    border-radius: 44rpx;
    font-size: 28rpx;
    color: #ff6b6b;
    border: none;

    &:active {
      opacity: 0.8;
    }
  }
}
</style>
