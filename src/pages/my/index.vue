<template>
  <view class="my-container">
    <!-- 头像和昵称区域 -->
    <view class="user-info">
      <image class="avatar" :src="userInfo.avatar" mode="aspectFill" />
      <text class="nickname">{{ userInfo.nickname }}</text>
    </view>

    <!-- 菜单列表 -->
    <view class="menu-list">
      <view class="menu-item" @click="handleSetting">
        <text class="menu-text">设置</text>
        <text class="arrow">></text>
      </view>
      <view class="menu-item" @click="handleAbout">
        <text class="menu-text">关于</text>
        <text class="arrow">></text>
      </view>
    </view>
  </view>
</template>

<script setup>
  import { ref } from 'vue'

  const userInfo = ref({
    avatar: '/static/images/default-avatar.png',
    nickname: '未登录'
  })

  const handleSetting = () => {
    uni.navigateTo({
      url: '/pages/my/setting'
    })
  }

  const handleAbout = () => {
    uni.navigateTo({
      url: '/pages/my/about'
    })
  }
</script>

<style lang="scss">
  .my-container {
    min-height: 100vh;
    background-color: #f5f5f5;
  }

  .user-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40rpx;
    background-color: #fff;

    .avatar {
      width: 150rpx;
      height: 150rpx;
      border-radius: 75rpx;
      margin-bottom: 20rpx;
    }

    .nickname {
      font-size: 32rpx;
      color: #333;
    }
  }

  .menu-list {
    margin-top: 20rpx;
    background-color: #fff;

    .menu-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 30rpx;
      border-bottom: 1rpx solid #eee;

      .menu-text {
        font-size: 28rpx;
        color: #333;
      }

      .arrow {
        color: #999;
        font-size: 28rpx;
      }
    }
  }
</style>
