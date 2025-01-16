<template>
  <view class="mall-container">
    <!-- 顶部搜索栏 -->
    <view class="search-bar">
      <view class="search-input-wrapper">
        <uni-icons type="search" size="20" color="#666"></uni-icons>
        <input type="text" placeholder="搜索商品" class="search-input" />
      </view>
    </view>

    <!-- 金刚区 -->
    <view class="category-grid">
      <view class="category-list">
        <view
          class="category-item"
          v-for="(category, index) in categories"
          :key="index"
          :class="{ active: currentCategory === index }"
          @click="selectCategory(index)"
        >
          <uni-icons 
            :type="category.icon" 
            size="28"
            :color="currentCategory === index ? '#1296db' : '#666'"
          ></uni-icons>
          <text class="category-name" :class="{ 'active-text': currentCategory === index }">
            {{ category.name }}
          </text>
        </view>
      </view>
    </view>

    <!-- 商品列表 -->
    <mescroll-body 
      ref="mescrollRef"
      @init="mescrollInit"
      @down="downCallback" 
      @up="upCallback"
      :down="{ native: true }"
      :up="{ 
        noMoreSize: 5,
        empty: {
          tip: '暂无相关商品~',
          use: false
        },
        loadingTime: 0,
        showLoading: false,
        noMoreLine: false
      }"
    >
      <view class="product-list">
        <template v-if="currentProducts.length > 0">
          <view 
            class="product-item" 
            v-for="(item, index) in currentProducts" 
            :key="index"
            @click="goToDetail(item)"
          >
            <image :src="item.image" mode="aspectFill" class="product-image" />
            <view class="product-info">
              <text class="product-name">{{ item.name }}</text>
              <view class="product-bottom">
                <text class="product-price">¥{{ item.price }}</text>
                <text class="product-sales">已售 {{ item.sales }}</text>
              </view>
            </view>
          </view>
        </template>
        <template v-else>
          <view class="empty-state">
            <uni-icons type="shop" size="60" color="#ddd"></uni-icons>
            <text class="empty-text">暂无相关商品~</text>
          </view>
        </template>
      </view>
    </mescroll-body>
  </view>
</template>

<script setup>
  import { ref, computed } from 'vue'
  import MescrollBody from '@/uni_modules/mescroll-uni/components/mescroll-body/mescroll-body.vue'

  // 分类数据
  const categories = ref([
    { 
      id: '0', 
      name: '精选', 
      icon: 'star'
    },
    { 
      id: '1', 
      name: '开运饰品',
      icon: 'gift'
    },
    { 
      id: '2', 
      name: '风水摆件',
      icon: 'medal'
    },
    { 
      id: '3', 
      name: '香薰用品',
      icon: 'shop'
    },
    { 
      id: '4', 
      name: '玄学书籍',
      icon: 'calendar'
    },
    { 
      id: '5', 
      name: '开运字画',
      icon: 'map'
    },
    { 
      id: '6', 
      name: '风水用品',
      icon: 'heart'
    },
    { 
      id: '7', 
      name: '祭祖代烧',
      icon: 'fire'
    }
  ])

  const currentCategory = ref(0)

  // 商品数据
  const allProducts = ref({
    0: [
      {
        id: 1,
        name: '天然紫水晶手链',
        price: '299.00',
        sales: 1000,
        image: '/static/images/crystal-1.png'
      },
      {
        id: 2,
        name: '开光铜葫芦摆件',
        price: '588.00',
        sales: 500,
        image: '/static/images/gourd-1.png'
      }
    ],
    1: [
      {
        id: 3,
        name: '925纯银转运珠手链',
        price: '168.00',
        sales: 2300,
        image: '/static/images/bracelet-1.png'
      },
      {
        id: 4,
        name: '天然翡翠平安扣项链',
        price: '1288.00',
        sales: 460,
        image: '/static/images/jade-1.png'
      }
    ],
    2: [
      {
        id: 5,
        name: '纯铜五帝钱摆件',
        price: '198.00',
        sales: 1800,
        image: '/static/images/coins-1.png'
      },
      {
        id: 6,
        name: '开光貔貅招财摆件',
        price: '366.00',
        sales: 920,
        image: '/static/images/pixiu-1.png'
      }
    ],
    3: [
      {
        id: 7,
        name: '檀香木安神香薰',
        price: '88.00',
        sales: 3500,
        image: '/static/images/incense-1.png'
      },
      {
        id: 8,
        name: '天然沉香木香炉',
        price: '268.00',
        sales: 760,
        image: '/static/images/censer-1.png'
      }
    ],
    4: [
      {
        id: 10,
        name: '周易全书精装版',
        price: '129.00',
        sales: 2000,
        image: '/static/images/book-zhouyi.png'
      },
      {
        id: 11,
        name: '风水学入门指南',
        price: '99.00',
        sales: 1500,
        image: '/static/images/book-fengshui.png'
      }
    ],
    5: [
      {
        id: 12,
        name: '八卦太极装饰画',
        price: '238.00',
        sales: 680,
        image: '/static/images/painting-1.png'
      },
      {
        id: 13,
        name: '山水福字书法挂画',
        price: '188.00',
        sales: 890,
        image: '/static/images/calligraphy-1.png'
      }
    ],
    6: [
      {
        id: 14,
        name: '专业罗盘风水指南针',
        price: '298.00',
        sales: 1200,
        image: '/static/images/compass-1.png'
      },
      {
        id: 15,
        name: '开光八卦镜挂件',
        price: '108.00',
        sales: 2100,
        image: '/static/images/mirror-1.png'
      }
    ],
    7: [
      {
        id: 16,
        name: '祭祖香烛纸钱套装',
        price: '99.00',
        sales: 3800,
        image: '/static/images/worship-1.png'
      },
      {
        id: 17,
        name: '实木祭祀供奉香炉',
        price: '199.00',
        sales: 960,
        image: '/static/images/burner-1.png'
      }
    ]
  })

  // 当前分类的商品
  const currentProducts = computed(() => {
    return allProducts.value[currentCategory.value] || []
  })

  // 切换分类
  const selectCategory = (index) => {
    currentCategory.value = index
    currentProducts.value = allProducts.value[index] || []
    mescrollRef.value.resetUpScroll(false)
  }

  // 跳转到商品详情
  const goToDetail = (item) => {
    uni.navigateTo({
      url: `/pages/mall/detail?id=${item.id}`
    })
  }

  // 下拉刷新
  const downCallback = async () => {
    mescrollRef.value.endSuccess()
  }

  // 上拉加载
  const upCallback = async (page) => {
    try {
      // 如果是第一页
      if (page.num === 1) {
        // 获取当前分类的商品
        const products = allProducts.value[currentCategory.value] || []
        currentProducts.value = products
        mescrollRef.value.endSuccess(products.length)
      }
    } catch (error) {
      console.error(error)
      mescrollRef.value.endErr()
    }
  }

  const mescrollRef = ref(null)
  const mescrollInit = (mescroll) => {
    mescrollRef.value = mescroll
  }
</script>

<style lang="scss">
  .mall-container {
    min-height: 100vh;
    background-color: #f8f8f8;
    display: flex;
    flex-direction: column;
  }

  .search-bar {
    padding: 24rpx;
    background-color: #fff;
    z-index: 100;
    border-bottom: 1px solid #f5f5f5;

    .search-input-wrapper {
      display: flex;
      align-items: center;
      background-color: #f5f5f5;
      border-radius: 40rpx;
      padding: 20rpx 32rpx;

      .uni-icons {
        margin-right: 16rpx;
      }

      .search-input {
        flex: 1;
        font-size: 28rpx;
        color: #333;
        
        &::placeholder {
          color: #666;
        }
      }
    }
  }

  .category-grid {
    background-color: #fff;
    padding: 32rpx 24rpx;
    z-index: 99;
    border-bottom: 1px solid #f5f5f5;
    
    .category-list {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 32rpx 20rpx;
      
      .category-item {
        padding: 16rpx;
        font-size: 28rpx;
        color: #666;
        transition: all 0.3s;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .category-name {
          font-weight: 500;
          margin-top: 16rpx;
          font-size: 26rpx;
          
          &.active-text {
            color: #1296db;
          }
        }

        &:active {
          transform: scale(0.95);
          opacity: 0.9;
        }
      }
    }
  }

  .product-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20rpx;
    padding: 24rpx;

    .product-item {
      background-color: #fff;
      border-radius: 16rpx;
      overflow: hidden;
      box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.04);
      transition: all 0.3s;

      &:active {
        transform: scale(0.98);
        box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.02);
      }

      .product-image {
        width: 100%;
        height: 320rpx;
        background-color: #f5f5f5;
      }

      .product-info {
        padding: 20rpx;

        .product-name {
          font-size: 28rpx;
          color: #333;
          margin-bottom: 16rpx;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          overflow: hidden;
        }

        .product-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .product-price {
            font-size: 32rpx;
            color: #ff6b6b;
            font-weight: bold;
          }

          .product-sales {
            font-size: 24rpx;
            color: #999;
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
    padding: 60rpx 0;
    grid-column: span 2;
    
    .uni-icons {
      margin-bottom: 24rpx;
    }
    
    .empty-text {
      font-size: 28rpx;
      color: #999;
    }
  }

  :deep(.mescroll-upwarp) {
    display: none !important;
  }
</style> 