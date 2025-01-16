<template>
  <view class="address-edit-container">
    <page-header :title="id ? '编辑地址' : '新增地址'"></page-header>

    <view class="content" :style="{ paddingTop: `calc(88rpx + ${statusBarHeight}px)` }">
      <!-- 表单内容 -->
      <view class="form-section">
        <view class="form-item">
          <text class="label">收货人</text>
          <input 
            type="text"
            v-model="form.name"
            placeholder="请输入收货人姓名"
            class="input"
          />
        </view>
        <view class="form-item">
          <text class="label">手机号码</text>
          <input 
            type="number"
            v-model="form.phone"
            placeholder="请输入手机号码"
            maxlength="11"
            class="input"
          />
        </view>
        <view class="form-item">
          <text class="label">所在地区</text>
          <picker 
            mode="multiSelector" 
            :range="[provinces, cities, districts]"
            :value="regionValue"
            @change="handleRegionChange"
            @columnchange="handleColumnChange"
            class="region-picker"
          >
            <view class="picker-content">
              <text class="picker-text" :class="{ placeholder: !form.province }">
                {{ form.province ? `${form.province} ${form.city} ${form.district}` : '请选择所在地区' }}
              </text>
              <uni-icons type="right" size="16" color="#999"></uni-icons>
            </view>
          </picker>
        </view>
        <view class="form-item">
          <text class="label">详细地址</text>
          <textarea
            v-model="form.address"
            placeholder="请输入详细地址"
            class="textarea"
          />
        </view>
        <view class="form-item">
          <text class="label">设为默认地址</text>
          <switch 
            :checked="form.isDefault"
            @change="e => form.isDefault = e.detail.value"
            color="#1296db"
          />
        </view>
      </view>

      <!-- 保存按钮 -->
      <view class="btn-section">
        <button class="save-btn" @click="handleSave">保存</button>
      </view>
    </view>

    <!-- 地区选择器 -->
    <uni-popup ref="popup" type="bottom">
      <view class="region-popup">
        <view class="popup-header">
          <text class="cancel" @click="showRegionPicker = false">取消</text>
          <text class="title">选择地区</text>
          <text class="confirm" @click="handleConfirmRegion">确定</text>
        </view>
        <picker-view
          :indicator-style="'height: 44px;'"
          :value="regionValue"
          @change="handleRegionChange"
          class="picker-view"
        >
          <picker-view-column>
            <view class="picker-item" v-for="(item, index) in regions" :key="index">
              {{ item }}
            </view>
          </picker-view-column>
        </picker-view>
      </view>
    </uni-popup>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { userApi } from '@/api/modules/user'
import type { Address } from '@/api/types/user'
import PageHeader from '@/components/page-header/index.vue'

const statusBarHeight = uni.getSystemInfoSync().statusBarHeight

// 表单数据
const form = ref({
  name: '',
  phone: '',
  province: '',
  city: '',
  district: '',
  address: '',
  isDefault: false
})

// 地区选择器数据
const provinces = ref(['广东省', '北京市', '上海市'])
const cities = ref(['深圳市', '广州市', '珠海市'])
const districts = ref(['南山区', '福田区', '罗湖区'])
const regionValue = ref([0, 0, 0])

// 获取页面参数
const pages = getCurrentPages()
const currentPage = pages[pages.length - 1]
const { id } = currentPage.$page?.options || {}

// 获取地址详情
const fetchAddressDetail = async () => {
  if (!id) return
  
  try {
    // 这里应该调用获取地址详情的 API
    // const result = await userApi.getAddressDetail(id)
    // form.value = result
  } catch (error) {
    console.error('获取地址详情失败:', error)
  }
}

// 处理地区选择列变化
const handleColumnChange = (e: any) => {
  const { column, value } = e.detail
  const currentValue = [...regionValue.value]
  currentValue[column] = value
  
  // 根据选择的省份更新城市列表
  if (column === 0) {
    // 这里应该根据选择的省份获取对应的城市列表
    // 示例数据
    if (value === 0) {
      cities.value = ['深圳市', '广州市', '珠海市']
    } else if (value === 1) {
      cities.value = ['东城区', '西城区', '朝阳区']
    } else {
      cities.value = ['黄浦区', '徐汇区', '长宁区']
    }
    currentValue[1] = 0
    
    // 根据选择的城市更新区域列表
    if (currentValue[1] === 0) {
      districts.value = ['南山区', '福田区', '罗湖区']
    } else {
      districts.value = ['区域1', '区域2', '区域3']
    }
    currentValue[2] = 0
  }
  
  // 根据选择的城市更新区域列表
  if (column === 1) {
    // 这里应该根据选择的城市获取对应的区域列表
    // 示例数据
    if (value === 0) {
      districts.value = ['南山区', '福田区', '罗湖区']
    } else {
      districts.value = ['区域1', '区域2', '区域3']
    }
    currentValue[2] = 0
  }
  
  regionValue.value = currentValue
}

// 处理地区选择确认
const handleRegionChange = (e: any) => {
  const value = e.detail.value
  form.value.province = provinces.value[value[0]]
  form.value.city = cities.value[value[1]]
  form.value.district = districts.value[value[2]]
}

// 确认地区选择
const handleConfirmRegion = () => {
  form.value.region = regions.value[regionValue.value[0]]
  showRegionPicker.value = false
}

// 保存地址
const handleSave = async () => {
  // 表单验证
  if (!form.value.name) {
    uni.showToast({
      title: '请输入收货人姓名',
      icon: 'none'
    })
    return
  }
  if (!form.value.phone) {
    uni.showToast({
      title: '请输入手机号码',
      icon: 'none'
    })
    return
  }
  if (!form.value.province || !form.value.city || !form.value.district) {
    uni.showToast({
      title: '请选择所在地区',
      icon: 'none'
    })
    return
  }
  if (!form.value.address) {
    uni.showToast({
      title: '请输入详细地址',
      icon: 'none'
    })
    return
  }

  try {
    const addressData = {
      name: form.value.name,
      phone: form.value.phone,
      province: form.value.province,
      city: form.value.city,
      district: form.value.district,
      address: form.value.address,
      isDefault: form.value.isDefault
    }

    if (id) {
      await userApi.updateAddress(id, addressData)
    } else {
      await userApi.addAddress(addressData)
    }
    
    uni.showToast({
      title: '保存成功',
      icon: 'success'
    })
    
    setTimeout(() => {
      uni.navigateBack()
    }, 1500)
  } catch (error) {
    console.error('保存地址失败:', error)
    uni.showToast({
      title: '保存失败',
      icon: 'none'
    })
  }
}

onMounted(() => {
  if (id) {
    fetchAddressDetail()
  }
})
</script>

<style lang="scss">
.address-edit-container {
  min-height: 100vh;
  background-color: #f8f8f8;

  .form-section {
    background-color: #fff;
    margin-top: 20rpx;

    .form-item {
      display: flex;
      align-items: center;
      padding: 24rpx 32rpx;
      border-bottom: 1px solid #f5f5f5;

      .label {
        width: 160rpx;
        font-size: 28rpx;
        color: #333;
      }

      .input {
        flex: 1;
        font-size: 28rpx;
        color: #333;
      }

      .textarea {
        flex: 1;
        height: 160rpx;
        font-size: 28rpx;
        color: #333;
      }

      .region-picker {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .picker-text {
          font-size: 28rpx;
          color: #333;

          &.placeholder {
            color: #999;
          }
        }
      }
    }
  }

  .btn-section {
    padding: 40rpx 32rpx;

    .save-btn {
      width: 100%;
      height: 88rpx;
      line-height: 88rpx;
      background-color: #1296db;
      color: #fff;
      font-size: 32rpx;
      border-radius: 44rpx;
      border: none;

      &:active {
        opacity: 0.9;
      }
    }
  }
}

.region-popup {
  background-color: #fff;
  border-radius: 24rpx 24rpx 0 0;

  .popup-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24rpx 32rpx;
    border-bottom: 1px solid #f5f5f5;

    .title {
      font-size: 32rpx;
      color: #333;
      font-weight: 500;
    }

    .cancel, .confirm {
      font-size: 28rpx;
      color: #666;

      &:active {
        opacity: 0.7;
      }
    }

    .confirm {
      color: #1296db;
    }
  }

  .picker-view {
    width: 100%;
    height: 480rpx;

    .picker-item {
      line-height: 88rpx;
      text-align: center;
      font-size: 32rpx;
      color: #333;
    }
  }
}

.picker-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 88rpx;

  .picker-text {
    font-size: 28rpx;
    color: #333;

    &.placeholder {
      color: #999;
    }
  }
}
</style> 