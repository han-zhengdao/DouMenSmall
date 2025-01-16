import axios, { AxiosError, AxiosResponse } from 'axios'
import { createUniAppAxiosAdapter } from '@uni-helper/axios-adapter'
import { API_CONFIG } from './config'

interface ApiResponse<T> {
  code?: number
  message?: string
  data: T
}

// 错误处理
const handleHttpError = (error: AxiosError) => {
  const status = error.response?.status
  const url = error.response?.config?.url
  let message = ''

  switch (status) {
    case undefined:
    case null:
      message = '网路错误或跨域'
      break
    case 400:
      message = '请求错误'
      break
    case 401:
      message = '未授权，请登录'
      throttleToLogin()
      break
    case 403:
      message = '拒绝访问'
      break
    case 404:
      message = `请求地址出错: ${url || '未知'}`
      break
    case 408:
      message = '请求超时'
      break
    case 500:
      message = '服务器内部错误'
      break
    case 501:
      message = '服务未实现'
      break
    case 502:
      message = '网关错误'
      break
    case 503:
      message = '服务不可用'
      break
    case 504:
      message = '网关超时'
      break
    case 505:
      message = 'HTTP版本不受支持'
      break
    default:
      message = '请求错误'
  }

  uni.showToast({
    title: message,
    icon: 'error',
    duration: 2000
  })
  return Promise.reject(error)
}

// 处理业务错误
const handleBusinessError = (response: AxiosResponse<ApiResponse<unknown>>) => {
  const { data } = response
  const message = `请求失败：${data.message}`
  
  uni.showToast({
    title: message,
    icon: 'error',
    duration: 2000
  })
  return Promise.reject(data)
}

// 登录失效处理（防抖）
let isRedirecting = false
const throttleToLogin = () => {
  if (isRedirecting) return
  isRedirecting = true
  
  uni.showToast({
    title: '登录已失效，请重新登录',
    icon: 'none',
    duration: 2000,
    complete: () => {
      // 清除token等登录信息
      uni.removeStorageSync('token')
      // 跳转登录页
      setTimeout(() => {
        uni.redirectTo({
          url: '/pages/login/index',
          complete: () => {
            isRedirecting = false
          }
        })
      }, 1000)
    }
  })
}

// 创建axios实例
export function createService() {
  const service = axios.create({
    adapter: createUniAppAxiosAdapter(),
    baseURL: API_CONFIG.baseURL,
    timeout: API_CONFIG.timeout,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  // 请求拦截器
  service.interceptors.request.use(
    (config) => {
      const token = uni.getStorageSync('token')
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
      }
      return config
    },
    (error) => Promise.reject(error)
  )

  // 响应拦截器
  service.interceptors.response.use(
    <T>(response: AxiosResponse<ApiResponse<T>>) => {
      const { data, status } = response
      
      // 如果是直接返回的数据
      if (status >= 200 && status < 300 && !data.code) {
        return data.data as T
      }

      // 处理业务状态码
      switch (data.code) {
        case 200:
          return data.data as T
        case 401:
          throttleToLogin()
          return Promise.reject(data)
        default:
          return handleBusinessError(response)
      }
    },
    handleHttpError
  )

  return service
}

export const service = createService() 