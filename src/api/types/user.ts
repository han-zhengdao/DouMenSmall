// 用户信息
export interface User {
  id: string
  nickname: string
  avatar: string
  phone?: string
  gender?: 0 | 1 // 0-女 1-男
  birthday?: string
  createdAt: string
}

// 登录参数
export interface LoginParams {
  code: string // 微信登录code
}

// 登录结果
export interface LoginResult {
  token: string
  user: User
}

// 用户地址
export interface Address {
  id: string
  name: string
  phone: string
  province: string
  city: string
  district: string
  address: string
  isDefault: boolean
}

// 更新用户信息参数
export interface UpdateUserParams {
  nickname?: string
  avatar?: string
  gender?: 0 | 1
  birthday?: string
} 