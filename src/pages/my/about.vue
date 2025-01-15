<template>
  <view class="about-container">
    <view class="logo">
      <image src="/static/images/logo.png" mode="aspectFit" />
    </view>
    <view class="version">
      <text>版本号：1.0.0</text>
    </view>
    <view class="info-list">
      <view class="info-item">
        <text class="label">官方网站</text>
        <text class="value">www.example.com</text>
      </view>
      <view class="info-item">
        <text class="label">联系我们</text>
        <text class="value">contact@example.com</text>
      </view>
    </view>
  </view>
</template>

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
