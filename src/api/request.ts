import { service } from './service'

export interface BaseResponse<T = any> {
  code?: number
  message?: string
  data: T
}

export interface RequestOptions {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  data?: any
  params?: any
  headers?: Record<string, string>
}

// 统一请求方法
export const request = async <T = any>(options: RequestOptions): Promise<T> => {
  const { url, method = 'GET', data, params, headers = {} } = options

  try {
    const response = await service({
      url,
      method,
      data,
      params,
      headers
    })
    return response as T
  } catch (error) {
    return Promise.reject(error)
  }
} 