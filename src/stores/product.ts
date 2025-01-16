import { defineStore } from 'pinia'
import { productApi, type Product, type ProductQuery } from '@/api'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [] as Product[],
    loading: false,
    currentPage: 1,
    totalPages: 1
  }),
  
  actions: {
    async fetchProducts(params?: ProductQuery) {
      this.loading = true
      try {
        const result = await productApi.getProducts(params)
        this.products = result.products
        this.currentPage = result.currentPage
        this.totalPages = result.totalPages
      } catch (error) {
        console.error(error)
        uni.showToast({
          title: '获取商品列表失败',
          icon: 'none'
        })
      } finally {
        this.loading = false
      }
    }
  }
}) 