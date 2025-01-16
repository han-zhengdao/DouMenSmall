// 分类数据
export const mockCategories = [
  { 
    id: '0', 
    name: '精选', 
    icon: 'star',
    image: '/static/images/category/selected.png'
  },
  { 
    id: '1', 
    name: '开运饰品',
    icon: 'gift',
    image: '/static/images/category/jewelry.png'
  },
  // ... 其他分类
]

// 商品数据
export const mockProducts = {
  '0': [
    {
      id: '1',
      name: '天然紫水晶手链',
      description: '采用天然紫水晶制作，具有开运招财功效',
      price: 299.00,
      category: {
        id: '1',
        name: '开运饰品'
      },
      stock: 100,
      images: ['/static/images/products/crystal-1.png'],
      sales: 1000,
      isActive: true
    },
    // ... 更多商品
  ],
  '1': [
    // 开运饰品分类的商品
  ]
}

// 商品详情数据
export const mockProductDetail = {
  id: '1',
  name: '天然紫水晶手链',
  description: '采用天然紫水晶制作，具有开运招财、化解小人、提升桃花运等功效。',
  price: 299.00,
  category: {
    id: '1',
    name: '开运饰品'
  },
  stock: 100,
  images: [
    '/static/images/products/crystal-1.png',
    '/static/images/products/crystal-2.png'
  ],
  detailImages: [
    '/static/images/products/crystal-detail-1.png',
    '/static/images/products/crystal-detail-2.png'
  ],
  sales: 1000,
  isActive: true,
  specifications: [
    {
      name: '材质',
      value: '天然紫水晶'
    },
    {
      name: '尺寸',
      value: '6mm/8mm可选'
    }
  ]
} 