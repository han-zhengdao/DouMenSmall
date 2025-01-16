import { request } from '../request'
import type { Category, CategoryList, CategoryResponse } from '../types/category'

export const categoryApi = {
  // 获取分类列表
  getCategories() {
    return request<CategoryList>({
      url: '/categories',
      method: 'GET'
    })
  },

  // 获取单个分类
  getCategory(id: string) {
    return request<Category>({
      url: `/categories/${id}`,
      method: 'GET'
    })
  },

  // 创建分类（管理员）
  createCategory(data: Partial<Category>) {
    return request<CategoryResponse>({
      url: '/categories',
      method: 'POST',
      data
    })
  }
} 