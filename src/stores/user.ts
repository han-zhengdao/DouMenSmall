import { defineStore } from 'pinia'
import { userApi } from '@/api/modules/user'
import type { User, Address, UpdateUserParams } from '@/api/types/user'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: uni.getStorageSync('token') || '',
    userInfo: null as User | null,
    addresses: [] as Address[]
  }),

  getters: {
    isLogin: (state) => !!state.token,
    defaultAddress: (state) => state.addresses.find(addr => addr.isDefault)
  },

  actions: {
    // 设置token
    setToken(token: string) {
      this.token = token
      uni.setStorageSync('token', token)
    },

    // 设置用户信息
    setUserInfo(userInfo: User) {
      this.userInfo = userInfo
    },

    // 登录
    async login(code: string) {
      try {
        const result = await userApi.login({ code })
        this.setToken(result.token)
        this.setUserInfo(result.user)
        return result
      } catch (error) {
        console.error('登录失败:', error)
        throw error
      }
    },

    // 获取用户信息
    async fetchUserInfo() {
      try {
        const userInfo = await userApi.getUserInfo()
        this.setUserInfo(userInfo)
        return userInfo
      } catch (error) {
        console.error('获取用户信息失败:', error)
        throw error
      }
    },

    // 更新用户信息
    async updateUserInfo(data: UpdateUserParams) {
      try {
        const userInfo = await userApi.updateUserInfo(data)
        this.setUserInfo(userInfo)
        return userInfo
      } catch (error) {
        console.error('更新用户信息失败:', error)
        throw error
      }
    },

    // 获取地址列表
    async fetchAddresses() {
      try {
        const addresses = await userApi.getAddressList()
        this.addresses = addresses
        return addresses
      } catch (error) {
        console.error('获取地址列表失败:', error)
        throw error
      }
    },

    // 退出登录
    logout() {
      this.token = ''
      this.userInfo = null
      this.addresses = []
      uni.removeStorageSync('token')
    }
  }
}) 