const env = process.env.NODE_ENV

interface ApiConfig {
  baseURL: string
  timeout: number
}

interface ConfigType {
  development: ApiConfig
  production: ApiConfig
}

const config: ConfigType = {
  development: {
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
    timeout: 10000
  },
  production: {
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000
  }
}

export const API_CONFIG = config[env as keyof ConfigType] 