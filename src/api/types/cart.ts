// 购物车商品项
export interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  image: string
  quantity: number
  selected: boolean
  stock: number
}

// 购物车状态
export interface CartState {
  items: CartItem[]
  totalPrice: number
  totalQuantity: number
}

// 添加到购物车的参数
export interface AddToCartParams {
  productId: string
  quantity: number
}

// 更新购物车项的参数
export interface UpdateCartParams {
  id: string
  quantity?: number
  selected?: boolean
} 