<template>
  <view class="order-container">
    <page-header title="我的订单"></page-header>
    <view class="content" :style="{ paddingTop: `calc(88rpx + ${statusBarHeight}px)` }">
      <!-- 订单状态标签 -->
      <view class="order-tabs">
        <view 
          class="tab-item" 
          v-for="(tab, index) in tabs" 
          :key="index"
          :class="{ active: currentTab === index }"
          @click="handleTabChange(index)"
        >
          <text class="tab-text">{{ tab.name }}</text>
          <text class="tab-badge" v-if="tab.count > 0">{{ tab.count }}</text>
        </view>
      </view>

      <!-- 订单列表 -->
      <view class="order-list" v-if="currentOrders.length > 0">
        <view class="order-item" v-for="(order, index) in currentOrders" :key="index">
          <!-- 订单头部 -->
          <view class="order-header">
            <text class="order-time">{{ order.createTime }}</text>
            <text class="order-status" :class="order.status">{{ getStatusText(order.status) }}</text>
          </view>
          <!-- 订单商品 -->
          <view class="order-goods">
            <image :src="order.goodsImage" mode="aspectFill" class="goods-image" />
            <view class="goods-info">
              <text class="goods-name">{{ order.goodsName }}</text>
              <view class="goods-price">
                <text class="price">¥{{ order.price }}</text>
                <text class="count">x{{ order.count }}</text>
              </view>
            </view>
          </view>
          <!-- 订单底部 -->
          <view class="order-footer">
            <text class="total-text">共{{ order.count }}件商品 合计：</text>
            <text class="total-price">¥{{ order.totalPrice }}</text>
            <view class="action-buttons">
              <button 
                class="action-btn" 
                :class="btn.type" 
                v-for="(btn, idx) in getActionButtons(order.status)" 
                :key="idx"
                @click="handleAction(btn.action, order)"
              >{{ btn.text }}</button>
            </view>
          </view>
        </view>
      </view>

      <!-- 空状态 -->
      <view class="empty-state" v-else>
        <uni-icons type="shop" size="60" color="#ddd"></uni-icons>
        <text class="empty-text">暂无相关订单</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import PageHeader from '@/components/page-header/index.vue'

const statusBarHeight = uni.getSystemInfoSync().statusBarHeight

// 订单状态标签
const tabs = ref([
  { name: '全部', count: 5 },
  { name: '待付款', count: 1 },
  { name: '待发货', count: 2 },
  { name: '待收货', count: 1 },
  { name: '已完成', count: 1 }
])

const currentTab = ref(0)

// 模拟订单数据
const orderList = ref([
  {
    id: 1,
    createTime: '2024-01-20 12:30:45',
    status: 'unpaid',
    goodsName: '天然紫水晶手链',
    goodsImage: '/static/images/crystal-1.png',
    price: '299.00',
    count: 1,
    totalPrice: '299.00'
  },
  {
    id: 2,
    createTime: '2024-01-19 15:20:30',
    status: 'shipped',
    goodsName: '开光铜葫芦摆件',
    goodsImage: '/static/images/gourd-1.png',
    price: '588.00',
    count: 1,
    totalPrice: '588.00'
  }
])

// 根据当前标签筛选订单
const currentOrders = computed(() => {
  if (currentTab.value === 0) return orderList.value
  const statusMap = ['', 'unpaid', 'unshipped', 'shipped', 'completed']
  return orderList.value.filter(order => order.status === statusMap[currentTab.value])
})

// 切换标签
const handleTabChange = (index) => {
  currentTab.value = index
}

// 获取状态文本
const getStatusText = (status) => {
  const statusMap = {
    unpaid: '待付款',
    unshipped: '待发货',
    shipped: '待收货',
    completed: '已完成',
    cancelled: '已取消'
  }
  return statusMap[status]
}

// 获取操作按钮
const getActionButtons = (status) => {
  const btnMap = {
    unpaid: [
      { text: '取消订单', type: 'default', action: 'cancel' },
      { text: '立即付款', type: 'primary', action: 'pay' }
    ],
    unshipped: [
      { text: '查看详情', type: 'default', action: 'detail' }
    ],
    shipped: [
      { text: '查看物流', type: 'default', action: 'logistics' },
      { text: '确认收货', type: 'primary', action: 'confirm' }
    ],
    completed: [
      { text: '删除订单', type: 'default', action: 'delete' },
      { text: '再次购买', type: 'primary', action: 'rebuy' }
    ]
  }
  return btnMap[status] || []
}

// 处理按钮点击
const handleAction = (action, order) => {
  switch (action) {
    case 'pay':
      uni.showToast({ title: '跳转支付...', icon: 'none' })
      break
    case 'cancel':
      uni.showModal({
        title: '提示',
        content: '确定要取消订单吗？',
        success: (res) => {
          if (res.confirm) {
            uni.showToast({ title: '已取消订单', icon: 'success' })
          }
        }
      })
      break
    // ... 其他操作处理
  }
}
</script>

<style lang="scss">
.order-container {
  min-height: 100vh;
  background-color: #f8f8f8;

  .order-tabs {
    display: flex;
    background-color: #fff;
    padding: 0 32rpx;
    border-bottom: 1px solid #f5f5f5;

    .tab-item {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      padding: 24rpx 0;

      .tab-text {
        font-size: 28rpx;
        color: #666;
      }

      .tab-badge {
        position: absolute;
        top: 12rpx;
        right: 0;
        min-width: 32rpx;
        height: 32rpx;
        line-height: 32rpx;
        text-align: center;
        background-color: #ff6b6b;
        color: #fff;
        font-size: 20rpx;
        border-radius: 16rpx;
        padding: 0 8rpx;
        transform: translateX(50%);
      }

      &.active {
        .tab-text {
          color: #1296db;
          font-weight: 500;
        }

        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 48rpx;
          height: 4rpx;
          background-color: #1296db;
          border-radius: 2rpx;
        }
      }
    }
  }

  .order-list {
    padding: 20rpx;

    .order-item {
      background-color: #fff;
      border-radius: 12rpx;
      margin-bottom: 20rpx;
      overflow: hidden;

      .order-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 24rpx;
        border-bottom: 1px solid #f5f5f5;

        .order-time {
          font-size: 26rpx;
          color: #666;
        }

        .order-status {
          font-size: 26rpx;
          font-weight: 500;

          &.unpaid { color: #ff6b6b; }
          &.unshipped { color: #ff9f43; }
          &.shipped { color: #1296db; }
          &.completed { color: #2ecc71; }
          &.cancelled { color: #999; }
        }
      }

      .order-goods {
        display: flex;
        padding: 24rpx;
        border-bottom: 1px solid #f5f5f5;

        .goods-image {
          width: 160rpx;
          height: 160rpx;
          border-radius: 8rpx;
          background-color: #f5f5f5;
        }

        .goods-info {
          flex: 1;
          margin-left: 20rpx;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .goods-name {
            font-size: 28rpx;
            color: #333;
            line-height: 1.4;
          }

          .goods-price {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .price {
              font-size: 32rpx;
              color: #ff6b6b;
              font-weight: 500;
            }

            .count {
              font-size: 26rpx;
              color: #999;
            }
          }
        }
      }

      .order-footer {
        padding: 24rpx;
        text-align: right;

        .total-text {
          font-size: 26rpx;
          color: #666;
        }

        .total-price {
          font-size: 32rpx;
          color: #ff6b6b;
          font-weight: 500;
        }

        .action-buttons {
          margin-top: 20rpx;
          display: flex;
          justify-content: flex-end;
          gap: 20rpx;

          .action-btn {
            min-width: 160rpx;
            height: 64rpx;
            line-height: 64rpx;
            font-size: 26rpx;
            border-radius: 32rpx;
            padding: 0 32rpx;
            margin: 0;

            &.default {
              color: #666;
              background-color: #f5f5f5;
              border: none;
            }

            &.primary {
              color: #fff;
              background-color: #1296db;
              border: none;
            }

            &:active {
              opacity: 0.9;
            }
          }
        }
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
}
</style> 