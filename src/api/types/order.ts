export interface OrderItem {
  product: {
    id: string
    name: string
    price: number
  }
  quantity: number
  price: number
}

export interface ShippingAddress {
  address: string
  city: string
  postalCode: string
  country: string
}

export interface Order {
  id: string
  items: OrderItem[]
  totalAmount: number
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'
  shippingAddress: ShippingAddress
  paymentMethod: 'wechat'
  createdAt: string
}

export interface CreateOrderData {
  items: Array<{
    product: string
    quantity: number
  }>
  shippingAddress: ShippingAddress
  paymentMethod: 'wechat'
}

export interface OrderQuery {
  page?: number
  limit?: number
  status?: Order['status']
}

export interface OrderList {
  orders: Order[]
  currentPage: number
  totalPages: number
  totalOrders: number
}

export interface OrderResponse {
  message: string
  order: Order
} 