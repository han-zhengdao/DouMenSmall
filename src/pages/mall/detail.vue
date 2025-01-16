<template>
  <view class="detail-container">
    <!-- 顶部导航栏 -->
    <page-header title="商品详情"></page-header>

    <view class="content" :style="{ paddingTop: `calc(88rpx + ${statusBarHeight}px)` }">
      <!-- 商品图片 -->
      <swiper class="product-swiper" :indicator-dots="true" :autoplay="true" interval="3000" duration="500">
        <swiper-item>
          <image :src="product.image" mode="aspectFill" class="product-image" />
        </swiper-item>
      </swiper>

      <!-- 商品信息 -->
      <view class="product-info">
        <view class="price-section">
          <text class="price">¥{{ product.price }}</text>
          <text class="sales">已售 {{ product.sales }}</text>
        </view>
        <text class="name">{{ product.name }}</text>
      </view>

      <!-- 商品详情 -->
      <view class="detail-section">
        <view class="section-title">
          <text>商品详情</text>
        </view>
        <view class="detail-content">
          <text class="description">{{ product.description || '暂无详细描述' }}</text>
          <image 
            v-for="(img, index) in product.detailImages" 
            :key="index"
            :src="img"
            mode="widthFix"
            class="detail-image"
          />
        </view>
      </view>
    </view>

    <!-- 底部操作栏 -->
    <view class="action-bar">
      <view class="left-actions">
        <view class="action-item" @click="handleService">
          <uni-icons type="headphones" size="24" color="#666"></uni-icons>
          <text>客服</text>
        </view>
        <view class="action-item" @click="handleCart">
          <uni-icons type="cart" size="24" color="#666"></uni-icons>
          <text>购物车</text>
        </view>
      </view>
      <view class="right-actions">
        <button class="action-btn add-cart" @click="handleAddCart">加入购物车</button>
        <button class="action-btn buy-now" @click="handleBuyNow">立即购买</button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import PageHeader from '@/components/page-header/index.vue'

const statusBarHeight = uni.getSystemInfoSync().statusBarHeight

// 商品数据
const product = ref({})

// 获取商品详情
const getProductDetail = (id) => {
  // 模拟获取商品详情
  // 实际开发时应该调用接口获取数据
  product.value = {
    id,
    name: '天然紫水晶手链',
    price: '299.00',
    sales: 1000,
    image: '/static/images/crystal-1.png',
    description: '采用天然紫水晶制作，具有开运招财、化解小人、提升桃花运等功效。',
    detailImages: [
      '/static/images/crystal-detail-1.png',
      '/static/images/crystal-detail-2.png'
    ]
  }
}

// 客服
const handleService = () => {
  uni.showToast({
    title: '正在接入客服...',
    icon: 'none'
  })
}

// 购物车
const handleCart = () => {
  uni.switchTab({
    url: '/pages/cart/index'
  })
}

// 加入购物车
const handleAddCart = () => {
  uni.showToast({
    title: '已加入购物车',
    icon: 'success'
  })
}

// 立即购买
const handleBuyNow = () => {
  uni.navigateTo({
    url: `/pages/order/confirm?id=${product.value.id}`
  })
}

onMounted(() => {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  const { id } = currentPage.$page.options
  getProductDetail(id)
})
</script>

<style lang="scss">
.detail-container {
  min-height: 100vh;
  background-color: #f8f8f8;
  padding-bottom: calc(120rpx + env(safe-area-inset-bottom));

  .product-swiper {
    width: 100%;
    height: 750rpx;

    .product-image {
      width: 100%;
      height: 100%;
      background-color: #fff;
    }
  }

  .product-info {
    margin-top: 20rpx;
    padding: 24rpx;
    background-color: #fff;

    .price-section {
      display: flex;
      align-items: baseline;
      margin-bottom: 16rpx;

      .price {
        font-size: 40rpx;
        color: #ff6b6b;
        font-weight: bold;
      }

      .sales {
        font-size: 24rpx;
        color: #999;
        margin-left: 16rpx;
      }
    }

    .name {
      font-size: 32rpx;
      color: #333;
      font-weight: 500;
      line-height: 1.4;
    }
  }

  .detail-section {
    margin-top: 20rpx;
    background-color: #fff;
    padding: 24rpx;

    .section-title {
      font-size: 28rpx;
      color: #333;
      font-weight: 500;
      margin-bottom: 24rpx;
      padding-left: 16rpx;
      border-left: 4rpx solid #1296db;
    }

    .detail-content {
      .description {
        font-size: 26rpx;
        color: #666;
        line-height: 1.6;
      }

      .detail-image {
        width: 100%;
        margin-top: 24rpx;
      }
    }
  }

  .action-bar {
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

    .left-actions {
      display: flex;
      gap: 48rpx;

      .action-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        text {
          font-size: 20rpx;
          color: #666;
          margin-top: 4rpx;
        }
      }
    }

    .right-actions {
      display: flex;
      gap: 20rpx;

      .action-btn {
        min-width: 180rpx;
        height: 72rpx;
        line-height: 72rpx;
        text-align: center;
        border-radius: 36rpx;
        font-size: 28rpx;
        margin: 0;
        padding: 0 32rpx;

        &.add-cart {
          background-color: #ffeaea;
          color: #ff6b6b;
          border: none;
        }

        &.buy-now {
          background-color: #ff6b6b;
          color: #fff;
          border: none;
        }

        &:active {
          opacity: 0.9;
        }
      }
    }
  }
}
</style> 