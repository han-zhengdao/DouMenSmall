<template>
  <view class="cart-container">
    <!-- 顶部导航栏 -->
    <page-header title="购物车"></page-header>

    <view class="content" :style="{ paddingTop: `calc(88rpx + ${statusBarHeight}px)` }">
      <!-- 购物车列表 -->
      <view v-if="cartStore.items.length > 0" class="cart-list">
        <view 
          v-for="item in cartStore.items" 
          :key="item.id"
          class="cart-item"
        >
          <!-- 选择框 -->
          <view class="checkbox">
            <uni-icons 
              :type="item.selected ? 'checkbox-filled' : 'circle'"
              size="24" 
              color="#1296db"
              @click="handleSelect(item)"
            ></uni-icons>
          </view>

          <!-- 商品信息 -->
          <image :src="item.image" mode="aspectFill" class="product-image" />
          <view class="product-info">
            <text class="name">{{ item.name }}</text>
            <view class="bottom">
              <text class="price">¥{{ item.price }}</text>
              <!-- 数量控制 -->
              <view class="quantity-control">
                <button 
                  class="btn minus" 
                  @click="handleUpdateQuantity(item, -1)"
                >-</button>
                <text class="quantity">{{ item.quantity }}</text>
                <button 
                  class="btn plus" 
                  @click="handleUpdateQuantity(item, 1)"
                >+</button>
              </view>
            </view>
          </view>

          <!-- 删除按钮 -->
          <view class="delete" @click="handleDelete(item)">
            <uni-icons type="trash" size="20" color="#999"></uni-icons>
          </view>
        </view>
      </view>

      <!-- 空购物车 -->
      <view v-else class="empty-cart">
        <uni-icons type="cart" size="60" color="#ddd"></uni-icons>
        <text>购物车是空的</text>
        <button class="go-shopping" @click="goShopping">去逛逛</button>
      </view>
    </view>

    <!-- 底部结算栏 -->
    <view v-if="cartStore.items.length > 0" class="settlement-bar">
      <view class="left">
        <view class="select-all" @click="cartStore.toggleSelectAll()">
          <uni-icons 
            :type="cartStore.isAllSelected ? 'checkbox-filled' : 'circle'"
            size="24" 
            color="#1296db"
          ></uni-icons>
          <text>全选</text>
        </view>
        <view class="total">
          <text>合计：</text>
          <text class="price">¥{{ cartStore.selectedTotalPrice }}</text>
        </view>
      </view>
      <button 
        class="checkout-btn"
        :disabled="cartStore.selectedCount === 0"
        @click="handleCheckout"
      >
        结算({{ cartStore.selectedCount }})
      </button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCartStore } from '@/stores/cart'
import type { CartItem } from '@/api/types/cart'
import PageHeader from '@/components/page-header/index.vue'

const statusBarHeight = uni.getSystemInfoSync().statusBarHeight
const cartStore = useCartStore()

// 选择商品
const handleSelect = (item: CartItem) => {
  cartStore.toggleSelect(item.id, !item.selected)
}

// 更新数量
const handleUpdateQuantity = (item: CartItem, change: number) => {
  const newQuantity = item.quantity + change
  if (newQuantity < 1 || newQuantity > item.stock) return
  cartStore.updateQuantity(item.id, newQuantity)
}

// 删除商品
const handleDelete = (item: CartItem) => {
  uni.showModal({
    title: '提示',
    content: '确定要删除该商品吗？',
    success: (res) => {
      if (res.confirm) {
        cartStore.removeItem(item.id)
      }
    }
  })
}

// 去购物
const goShopping = () => {
  uni.switchTab({
    url: '/pages/mall/index'
  })
}

// 结算
const handleCheckout = () => {
  uni.navigateTo({
    url: '/pages/order/confirm'
  })
}

onMounted(() => {
  cartStore.fetchCart()
})
</script>

<style lang="scss">
.cart-container {
  min-height: 100vh;
  background-color: #f8f8f8;
  padding-bottom: calc(120rpx + env(safe-area-inset-bottom));
}

.cart-list {
  padding: 20rpx;

  .cart-item {
    display: flex;
    align-items: center;
    background-color: #fff;
    border-radius: 12rpx;
    padding: 20rpx;
    margin-bottom: 20rpx;

    .checkbox {
      margin-right: 20rpx;
    }

    .product-image {
      width: 160rpx;
      height: 160rpx;
      border-radius: 8rpx;
      margin-right: 20rpx;
    }

    .product-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 160rpx;

      .name {
        font-size: 28rpx;
        color: #333;
      }

      .bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .price {
          font-size: 32rpx;
          color: #ff6b6b;
          font-weight: bold;
        }
      }
    }

    .delete {
      padding: 20rpx;
      margin-left: 20rpx;
    }
  }
}

.quantity-control {
  display: flex;
  align-items: center;
  
  .btn {
    width: 60rpx;
    height: 60rpx;
    line-height: 60rpx;
    text-align: center;
    background-color: #f5f5f5;
    border: none;
    border-radius: 4rpx;
    font-size: 28rpx;
    color: #333;
    padding: 0;
    margin: 0;
  }
  
  .quantity {
    min-width: 80rpx;
    text-align: center;
    font-size: 28rpx;
    color: #333;
    margin: 0 20rpx;
  }
}

.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 120rpx 0;

  text {
    font-size: 28rpx;
    color: #999;
    margin: 20rpx 0;
  }

  .go-shopping {
    margin-top: 40rpx;
    background-color: #1296db;
    color: #fff;
    font-size: 28rpx;
    padding: 20rpx 60rpx;
    border-radius: 40rpx;
    border: none;
  }
}

.settlement-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100rpx;
  padding-bottom: env(safe-area-inset-bottom);
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24rpx;
  box-shadow: 0 -2rpx 8rpx rgba(0, 0, 0, 0.04);

  .left {
    display: flex;
    align-items: center;
    gap: 32rpx;

    .select-all {
      display: flex;
      align-items: center;
      gap: 12rpx;

      text {
        font-size: 28rpx;
        color: #333;
      }
    }

    .total {
      font-size: 28rpx;
      color: #333;

      .price {
        color: #ff6b6b;
        font-weight: bold;
      }
    }
  }

  .checkout-btn {
    min-width: 200rpx;
    height: 72rpx;
    line-height: 72rpx;
    background-color: #1296db;
    color: #fff;
    font-size: 28rpx;
    border-radius: 36rpx;
    border: none;
    padding: 0 40rpx;

    &[disabled] {
      background-color: #ccc;
    }
  }
}
</style> 