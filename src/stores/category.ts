import { defineStore } from 'pinia'
import { categoryApi, type Category } from '@/api'

export const useCategoryStore = defineStore('category', {
  state: () => ({
    categories: [] as Category[],
    loading: false
  }),
  
  actions: {
    async fetchCategories() {
      this.loading = true
      try {
        const result = await categoryApi.getCategories()
        this.categories = result
      } catch (error) {
        console.error(error)
        uni.showToast({
          title: '获取分类列表失败',
          icon: 'none'
        })
      } finally {
        this.loading = false
      }
    }
  }
}) 