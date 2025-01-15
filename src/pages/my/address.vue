<template>
  <view class="address-container">
    <page-header title="收货地址"></page-header>
    <view class="content" :style="{ paddingTop: `calc(88rpx + ${statusBarHeight}px)` }">
      <!-- 地址列表 -->
      <view class="address-list" v-if="addressList.length > 0">
        <view class="address-item" v-for="(item, index) in addressList" :key="index">
          <view class="address-info">
            <view class="user-info">
              <text class="name">{{ item.name }}</text>
              <text class="phone">{{ item.phone }}</text>
              <text class="tag" v-if="item.isDefault">默认</text>
            </view>
            <view class="address-detail">{{ item.address }}</view>
          </view>
          <view class="address-action">
            <uni-icons type="compose" size="20" color="#666" @click="handleEdit(item)"></uni-icons>
            <uni-icons type="trash" size="20" color="#666" @click="handleDelete(item)"></uni-icons>
          </view>
        </view>
      </view>

      <!-- 空状态 -->
      <view class="empty-state" v-else>
        <uni-icons type="location" size="60" color="#ddd"></uni-icons>
        <text class="empty-text">暂无收货地址</text>
      </view>

      <!-- 新建地址按钮 -->
      <view class="add-btn-wrapper">
        <button class="add-btn" @click="handleAdd">
          <uni-icons type="plusempty" size="20" color="#fff"></uni-icons>
          <text>新建地址</text>
        </button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import PageHeader from '@/components/page-header/index.vue'

const statusBarHeight = uni.getSystemInfoSync().statusBarHeight

// 地址列表数据
const addressList = ref([
  {
    id: 1,
    name: '张三',
    phone: '13800138000',
    address: '广东省深圳市南山区科技园',
    isDefault: true
  }
])

// 新建地址
const handleAdd = () => {
  uni.navigateTo({
    url: '/pages/my/address-edit'
  })
}

// 编辑地址
const handleEdit = (item) => {
  uni.navigateTo({
    url: `/pages/my/address-edit?id=${item.id}`
  })
}

// 删除地址
const handleDelete = (item) => {
  uni.showModal({
    title: '提示',
    content: '确定要删除该地址吗？',
    success: (res) => {
      if (res.confirm) {
        addressList.value = addressList.value.filter(address => address.id !== item.id)
        uni.showToast({
          title: '删除成功',
          icon: 'success'
        })
      }
    }
  })
}
</script>

<style lang="scss">
.address-container {
  min-height: 100vh;
  background-color: #f8f8f8;

  .address-list {
    padding: 20rpx;

    .address-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #fff;
      border-radius: 12rpx;
      padding: 24rpx;
      margin-bottom: 20rpx;

      .address-info {
        flex: 1;
        margin-right: 20rpx;

        .user-info {
          margin-bottom: 12rpx;
          display: flex;
          align-items: center;
          gap: 16rpx;

          .name {
            font-size: 28rpx;
            color: #333;
            font-weight: 500;
          }

          .phone {
            font-size: 28rpx;
            color: #666;
          }

          .tag {
            font-size: 20rpx;
            color: #1296db;
            border: 1px solid #1296db;
            padding: 2rpx 8rpx;
            border-radius: 4rpx;
          }
        }

        .address-detail {
          font-size: 26rpx;
          color: #666;
          line-height: 1.4;
        }
      }

      .address-action {
        display: flex;
        gap: 32rpx;
      }
    }
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 120rpx 0;

    .empty-text {
      font-size: 28rpx;
      color: #999;
      margin-top: 20rpx;
    }
  }

  .add-btn-wrapper {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 20rpx 32rpx;
    padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
    background-color: #fff;
    box-shadow: 0 -2rpx 8rpx rgba(0, 0, 0, 0.04);

    .add-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8rpx;
      height: 88rpx;
      background-color: #1296db;
      color: #fff;
      font-size: 28rpx;
      border-radius: 44rpx;
      border: none;

      &:active {
        opacity: 0.9;
      }
    }
  }
}
</style> 