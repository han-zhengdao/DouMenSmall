import { defineStore } from 'pinia'
import { cartApi } from '@/api/modules/cart'
import type { CartState, CartItem, AddToCartParams } from '@/api/types/cart'

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    items: [],
    totalPrice: 0,
    totalQuantity: 0
  }),

  getters: {
    // 选中的商品数量
    selectedCount: (state) => state.items.filter(item => item.selected).length,
    
    // 选中的商品总价
    selectedTotalPrice: (state) => {
      return state.items
        .filter(item => item.selected)
        .reduce((total, item) => total + item.price * item.quantity, 0)
    },
    
    // 是否全选
    isAllSelected: (state) => {
      return state.items.length > 0 && state.items.every(item => item.selected)
    }
  },

  actions: {
    // 获取购物车列表
    async fetchCart() {
      try {
        const result = await cartApi.getCart()
        this.items = result.items
        this.totalPrice = result.totalPrice
        this.totalQuantity = result.totalQuantity
      } catch (error) {
        console.error('获取购物车失败:', error)
        uni.showToast({
          title: '获取购物车失败',
          icon: 'none'
        })
      }
    },

    // 添加到购物车
    async addToCart(params: AddToCartParams) {
      try {
        await cartApi.addToCart(params)
        await this.fetchCart() // 重新获取购物车数据
        uni.showToast({
          title: '添加成功',
          icon: 'success'
        })
      } catch (error) {
        console.error('添加到购物车失败:', error)
        uni.showToast({
          title: '添加失败',
          icon: 'none'
        })
      }
    },

    // 更新购物车项数量
    async updateQuantity(id: string, quantity: number) {
      try {
        await cartApi.updateCartItem({ id, quantity })
        await this.fetchCart()
      } catch (error) {
        console.error('更新数量失败:', error)
        uni.showToast({
          title: '更新失败',
          icon: 'none'
        })
      }
    },

    // 选择/取消选择商品
    async toggleSelect(id: string, selected: boolean) {
      try {
        await cartApi.updateCartItem({ id, selected })
        await this.fetchCart()
      } catch (error) {
        console.error('选择商品失败:', error)
        uni.showToast({
          title: '操作失败',
          icon: 'none'
        })
      }
    },

    // 选择/取消选择所有商品
    async toggleSelectAll() {
      try {
        const selected = !this.isAllSelected
        await cartApi.selectAll(selected)
        await this.fetchCart()
      } catch (error) {
        console.error('全选操作失败:', error)
        uni.showToast({
          title: '操作失败',
          icon: 'none'
        })
      }
    },

    // 删除购物车项
    async removeItem(id: string) {
      try {
        await cartApi.removeCartItem(id)
        await this.fetchCart()
        uni.showToast({
          title: '删除成功',
          icon: 'success'
        })
      } catch (error) {
        console.error('删除失败:', error)
        uni.showToast({
          title: '删除失败',
          icon: 'none'
        })
      }
    },

    // 清空购物车
    async clearCart() {
      try {
        await cartApi.clearCart()
        this.items = []
        this.totalPrice = 0
        this.totalQuantity = 0
        uni.showToast({
          title: '已清空购物车',
          icon: 'success'
        })
      } catch (error) {
        console.error('清空购物车失败:', error)
        uni.showToast({
          title: '操作失败',
          icon: 'none'
        })
      }
    }
  }
}) 