<template>
  <view class="address-container">
    <page-header title="收货地址"></page-header>
    <view class="content" :style="{ paddingTop: `calc(88rpx + ${statusBarHeight}px)` }">
      <!-- 地址页内容 -->
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import PageHeader from '@/components/page-header/index.vue'

const statusBarHeight = uni.getSystemInfoSync().statusBarHeight
</script> 