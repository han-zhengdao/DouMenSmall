export interface Category {
  id: string
  name: string
  description: string
  image: string
  createdAt: string
}

export interface CategoryResponse {
  message: string
  category: Category
}

export interface CategoryList extends Array<Category> {} 