import { request } from '../request'
import type { CartState, CartItem, AddToCartParams, UpdateCartParams } from '../types/cart'
import { mockCartState, mockCartItems } from '@/mock/cart'

// 模拟延迟
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const cartApi = {
  // 获取购物车列表
  async getCart() {
    await delay(500) // 模拟网络延迟
    return mockCartState
  },

  // 添加到购物车
  async addToCart(data: AddToCartParams) {
    await delay(500)
    const newItem: CartItem = {
      id: String(mockCartItems.length + 1),
      productId: data.productId,
      name: '新增商品', // 实际应该从商品数据中获取
      price: 299.00,
      image: '/static/images/products/crystal-1.png',
      quantity: data.quantity,
      selected: true,
      stock: 100
    }
    mockCartItems.push(newItem)
    return newItem
  },

  // 更新购物车项
  updateCartItem(data: UpdateCartParams) {
    return request<CartItem>({
      url: `/cart/items/${data.id}`,
      method: 'PUT',
      data
    })
  },

  // 删除购物车项
  removeCartItem(id: string) {
    return request<void>({
      url: `/cart/items/${id}`,
      method: 'DELETE'
    })
  },

  // 清空购物车
  clearCart() {
    return request<void>({
      url: '/cart/clear',
      method: 'DELETE'
    })
  },

  // 选择/取消选择所有商品
  selectAll(selected: boolean) {
    return request<void>({
      url: '/cart/select-all',
      method: 'PUT',
      data: { selected }
    })
  }
} 