import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: 'test-token',
    userInfo: {}
  }),
  getters: {
    isLogin: (state) => !!state.token
  },
  actions: {
    setToken(token: string) {
      this.token = token
    },
    setUserInfo(info: any) {
      this.userInfo = info
    },
    logout() {
      this.token = ''
      this.userInfo = {}
    }
  },
  persist: {
    enabled: true
  }
}) 