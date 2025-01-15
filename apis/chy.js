import { myRequest } from '../utils/request'

//获取用户每日运势
export const getDailyFortune = params => myRequest('/api/fortune/getDailyFortune', 'POST', params)

//获取命运箴言
export const getOne = params => myRequest('/api/motto/getOne', 'POST', params)

//点赞命运箴言
export const like = params => myRequest('/api/motto/like', 'POST', {isShowLoading:false, ...params})

//取消点赞命运箴言
export const unlike = params => myRequest('/api/motto/unlike', 'POST', {isShowLoading:false, ...params})

// 获取签到状态
export const getSignStatus = params => myRequest('/api/sign/getSignStatus', 'POST', {isShowLoading:false, ...params})

//签到
export const userSignIn = params => myRequest('/api/sign/userSignIn', 'POST', params)

//分享
export const share = params => myRequest('/api/sign/share', 'POST', params)

//权益列表
export const getList = params => myRequest('/api/rights/getList', 'POST', params)

//领取权益
export const receive = params => myRequest('/api/rights/receive', 'POST', params)
