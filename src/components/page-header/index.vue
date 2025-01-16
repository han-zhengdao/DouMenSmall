<template>
  <view class="page-header">
    <view class="header-content">
      <view class="left-area" @click="handleBack">
        <uni-icons type="left" size="20" color="#333"></uni-icons>
      </view>
      <text class="title">{{ title }}</text>
      <view class="right-area"></view>
    </view>
  </view>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()

const handleBack = () => {
  uni.navigateBack()
}
</script>

<style lang="scss">
.page-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: #fff;
  padding-top: var(--status-bar-height);
  border-bottom: 1px solid #f5f5f5;

  .header-content {
    height: 88rpx;
    display: flex;
    align-items: center;
    padding: 0 32rpx;

    .left-area {
      width: 88rpx;
      height: 88rpx;
      display: flex;
      align-items: center;
      margin-left: -32rpx;
      padding: 0 32rpx;

      &:active {
        opacity: 0.7;
      }
    }

    .title {
      flex: 1;
      text-align: center;
      font-size: 32rpx;
      color: #333;
      font-weight: 500;
    }

    .right-area {
      width: 88rpx;
    }
  }
}
</style> 