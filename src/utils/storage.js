// 约定一个通用的键名
const INFO_KEY = 'hm_shopping_Info'
const HISTORY_KEY = 'hm_shopping_History'

// 获取个人信息
export const getInfo = () => {
  const defaultObj = {
    token: '',
    userId: ''
  }
  const result = localStorage.getItem(INFO_KEY)
  return result ? JSON.parse(result) : defaultObj
}
// 设置个人信息
export const setInfo = (info) => {
  localStorage.setItem(INFO_KEY, JSON.stringify(info))
}
// 移除个人信息
export const removeInfo = () => {
  localStorage.removeItem(INFO_KEY)
}

// 获取搜索历史
export const getHistoryList = () => {
  const result = localStorage.getItem(HISTORY_KEY)
  return result ? JSON.parse(result) : []
}
// 设置搜索历史
export const setHistoryList = (history) => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
}
// 移除搜索历史
export const removeHistoryList = () => {
  localStorage.removeItem(HISTORY_KEY)
}
