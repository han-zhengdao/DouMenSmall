import { request } from '../request'
import type { LoginResult } from '../types/user'

interface AuthUrlResponse {
  url: string
}

export const authApi = {
  // 获取微信授权URL
  getAuthUrl(redirectUrl?: string) {
    return request<AuthUrlResponse>({
      url: '/wechat/auth-url',
      method: 'GET',
      params: { redirectUrl }
    })
  },

  // 微信登录回调
  wxCallback(code: string) {
    return request<LoginResult>({
      url: '/wechat/callback',
      method: 'GET',
      params: { code }
    })
  }
} 