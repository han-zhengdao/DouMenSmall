import { request } from '../request'
import type { 
  Order, 
  OrderList, 
  OrderQuery, 
  CreateOrderData,
  OrderResponse 
} from '../types/order'

export const orderApi = {
  // 创建订单
  createOrder(data: CreateOrderData) {
    return request<OrderResponse>({
      url: '/orders',
      method: 'POST',
      data
    })
  },

  // 获取用户订单列表
  getMyOrders(params: OrderQuery = {}) {
    return request<OrderList>({
      url: '/orders/my-orders',
      method: 'GET',
      params
    })
  },

  // 获取订单详情
  getOrder(id: string) {
    return request<Order>({
      url: `/orders/${id}`,
      method: 'GET'
    })
  },

  // 取消订单
  cancelOrder(id: string) {
    return request<OrderResponse>({
      url: `/orders/${id}/cancel`,
      method: 'PUT'
    })
  }
} 