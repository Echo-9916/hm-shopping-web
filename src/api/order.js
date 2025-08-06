import request from '@/utils/request'

export const checkOrder = (mode, obj) => {
  return request.get('/checkout/order', {
    params: {
      mode,
      delivery: 10,
      couponId: 0,
      isUsePoints: 0,
      ...obj
    }
  })
}
// 提交订单
export const submitOrder = (mode, obj) => {
  return request.get('/checkout/submit', {
    params: {
      mode,
      delivery: 10,
      couponId: 0,
      isUsePoints: 0,
      payType: 10,
      ...obj
    }
  })
}
// 订单列表
export const getMyOrderList = (dataType, page) => {
  return request.get('/order/list', {
    params: {
      dataType,
      page
    }
  })
}
