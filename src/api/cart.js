import request from '@/utils/request'
// 加入购物车
export const addIntoCart = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/add', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}
// 获取购物车商品列表
export const getCartList = () => {
  return request.get('/cart/list')
}
// 更新购物车商品数量
export const changeCount = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/update', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}
// 删除购物车商品
export const deleteCart = (cartIds) => {
  return request.post('/cart/clear', {
    cartIds
  })
}
