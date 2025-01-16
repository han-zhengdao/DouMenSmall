// 商品分类
export interface Category {
  id: string
  name: string
  icon: string
  image?: string
}

// 商品信息
export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: Category
  stock: number
  images: string[]
  sales: number
  isActive: boolean
}

// 商品详情
export interface ProductDetail extends Product {
  detailImages: string[]
  specifications: Array<{
    name: string
    value: string
  }>
}

// 商品查询参数
export interface ProductQuery {
  categoryId?: string
  keyword?: string
  page?: number
  pageSize?: number
}

// 商品列表响应
export interface ProductListResponse {
  total: number
  items: Product[]
} 