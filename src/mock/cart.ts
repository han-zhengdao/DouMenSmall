import type { CartState, CartItem } from '@/api/types/cart'

// 购物车商品数据
export const mockCartItems: CartItem[] = [
  {
    id: '1',
    productId: '1',
    name: '天然紫水晶手链',
    price: 299.00,
    image: '/static/images/products/crystal-1.png',
    quantity: 1,
    selected: true,
    stock: 100
  }
]

// 购物车状态数据
export const mockCartState: CartState = {
  items: mockCartItems,
  totalPrice: 299.00,
  totalQuantity: 1
} 