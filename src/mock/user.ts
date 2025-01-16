import type { User, Address } from '@/api/types/user'

// 用户信息
export const mockUser: User = {
  id: '1',
  nickname: '测试用户',
  avatar: '/static/images/default-avatar.png',
  phone: '13800138000',
  gender: 1,
  birthday: '1990-01-01',
  createdAt: '2024-01-01'
}

// 地址列表
export const mockAddresses: Address[] = [
  {
    id: '1',
    name: '张三',
    phone: '13800138000',
    province: '广东省',
    city: '深圳市',
    district: '南山区',
    address: '科技园1号',
    isDefault: true
  },
  {
    id: '2',
    name: '李四',
    phone: '13800138001',
    province: '广东省',
    city: '深圳市',
    district: '福田区',
    address: '福田中心区2号',
    isDefault: false
  }
] 