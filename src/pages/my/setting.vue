<template>
  <view class="setting-container">
    <view class="setting-list">
      <view class="setting-item">
        <text class="item-text">清除缓存</text>
        <text class="arrow">></text>
      </view>
      <view class="setting-item">
        <text class="item-text">检查更新</text>
        <text class="arrow">></text>
      </view>
      <view class="setting-item">
        <text class="item-text">退出登录</text>
        <text class="arrow">></text>
      </view>
    </view>
  </view>
</template>

<style lang="scss">
  .setting-container {
    min-height: 100vh;
    background-color: #f5f5f5;

    .setting-list {
      margin-top: 20rpx;
      background-color: #fff;

      .setting-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 30rpx;
        border-bottom: 1rpx solid #eee;

        .item-text {
          font-size: 28rpx;
          color: #333;
        }

        .arrow {
          color: #999;
          font-size: 28rpx;
        }
      }
    }
  }
</style>
