import { request } from '../request'
import type { User, LoginParams, LoginResult, Address, UpdateUserParams } from '../types/user'

export const userApi = {
  // 登录
  login(data: LoginParams) {
    return request<LoginResult>({
      url: '/user/login',
      method: 'POST',
      data
    })
  },

  // 获取用户信息
  getUserInfo() {
    return request<User>({
      url: '/user/info',
      method: 'GET'
    })
  },

  // 更新用户信息
  updateUserInfo(data: UpdateUserParams) {
    return request<User>({
      url: '/user/info',
      method: 'PUT',
      data
    })
  },

  // 获取地址列表
  getAddressList() {
    return request<Address[]>({
      url: '/user/addresses',
      method: 'GET'
    })
  },

  // 添加地址
  addAddress(data: Omit<Address, 'id'>) {
    return request<Address>({
      url: '/user/addresses',
      method: 'POST',
      data
    })
  },

  // 更新地址
  updateAddress(id: string, data: Partial<Address>) {
    return request<Address>({
      url: `/user/addresses/${id}`,
      method: 'PUT',
      data
    })
  },

  // 删除地址
  deleteAddress(id: string) {
    return request<void>({
      url: `/user/addresses/${id}`,
      method: 'DELETE'
    })
  },

  // 设置默认地址
  setDefaultAddress(id: string) {
    return request<void>({
      url: `/user/addresses/${id}/default`,
      method: 'PUT'
    })
  }
} 