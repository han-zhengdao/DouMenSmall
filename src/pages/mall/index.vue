<template>
  <view class="mall-container">
    <!-- 顶部搜索栏 -->
    <view class="search-bar">
      <view class="search-input-wrapper">
        <uni-icons type="search" size="20" color="#666"></uni-icons>
        <input 
          v-model="searchKeyword"
          type="text" 
          placeholder="搜索商品" 
          class="search-input"
          @confirm="handleSearch"
        />
        <uni-icons 
          v-if="searchKeyword"
          type="clear" 
          size="20" 
          color="#999"
          @click="clearSearch"
        ></uni-icons>
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
            v-for="item in currentProducts" 
            :key="item.id"
            @click="goToDetail(item)"
          >
            <image 
              :src="item.images[0]" 
              mode="aspectFill" 
              class="product-image" 
            />
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

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { productApi } from '@/api/modules/product'
import type { Category, Product } from '@/api/types/product'
import { mockCategories, mockProducts } from '@/mock/mall'
import MescrollBody from '@/uni_modules/mescroll-uni/components/mescroll-body/mescroll-body.vue'

// 状态管理
const categories = ref<Category[]>([])
const currentCategory = ref(0)
const products = ref<Product[]>([])
const loading = ref(false)
const searchKeyword = ref('')

// 计算属性：当前显示的商品列表
const currentProducts = computed(() => {
  if (!searchKeyword.value) {
    return products.value
  }
  // 搜索过滤
  return products.value.filter(product => 
    product.name.toLowerCase().includes(searchKeyword.value.toLowerCase()) ||
    product.description.toLowerCase().includes(searchKeyword.value.toLowerCase())
  )
})

// 获取分类列表
const fetchCategories = async () => {
  try {
    const result = await productApi.getCategories()
    categories.value = result
  } catch (error) {
    console.error('获取分类失败:', error)
    categories.value = mockCategories
  }
}

// 获取商品列表
const fetchProducts = async (categoryId: number) => {
  loading.value = true
  try {
    const result = await productApi.getProducts({ categoryId: String(categoryId) })
    products.value = result.items
  } catch (error) {
    console.error('获取商品列表失败:', error)
    products.value = mockProducts[categoryId] || []
  } finally {
    loading.value = false
  }
}

// 搜索商品
const handleSearch = async () => {
  if (!searchKeyword.value.trim()) {
    return fetchProducts(currentCategory.value)
  }
  
  loading.value = true
  try {
    const result = await productApi.searchProducts(searchKeyword.value)
    products.value = result.items
  } catch (error) {
    console.error('搜索商品失败:', error)
    uni.showToast({
      title: '搜索失败',
      icon: 'none'
    })
  } finally {
    loading.value = false
  }
}

// 清除搜索
const clearSearch = () => {
  searchKeyword.value = ''
  fetchProducts(currentCategory.value)
}

// 选择分类
const selectCategory = (index: number) => {
  currentCategory.value = index
  searchKeyword.value = '' // 切换分类时清除搜索关键词
  fetchProducts(index)
}

// mescroll 相关
const mescrollRef = ref(null)

const mescrollInit = (mescroll) => {
  mescrollRef.value = mescroll
}

const downCallback = async () => {
  await fetchProducts(currentCategory.value)
  mescrollRef.value.endSuccess()
}

const upCallback = async (page) => {
  // 这里可以实现加载更多的逻辑
  mescrollRef.value.endSuccess(products.value.length)
}

// 跳转到商品详情
const goToDetail = (item: Product) => {
  uni.navigateTo({
    url: `/pages/mall/detail?id=${item.id}`
  })
}

// 初始化
onMounted(() => {
  fetchCategories()
  fetchProducts(0)
})
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

        &:last-child {
          margin-left: 16rpx;
        }
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