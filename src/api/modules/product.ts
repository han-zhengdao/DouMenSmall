import { request } from '../request'
import type { 
  Category, 
  Product, 
  ProductDetail,
  ProductQuery, 
  ProductListResponse 
} from '../types/product'

export const productApi = {
  // 获取分类列表
  getCategories() {
    return request<Category[]>({
      url: '/categories',
      method: 'GET'
    })
  },

  // 获取商品列表
  getProducts(params?: ProductQuery) {
    return request<ProductListResponse>({
      url: '/products',
      method: 'GET',
      params
    })
  },

  // 获取商品详情
  getProductDetail(id: string) {
    return request<ProductDetail>({
      url: `/products/${id}`,
      method: 'GET'
    })
  },

  // 搜索商品
  searchProducts(keyword: string) {
    return request<ProductListResponse>({
      url: '/products/search',
      method: 'GET',
      params: { keyword }
    })
  }
} 