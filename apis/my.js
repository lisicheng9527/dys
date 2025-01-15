import { myRequest } from '../utils/request'

//获取简单信息
export const getSimple = params => myRequest('/api/user/getSimple', 'POST', {isShowLoading: false, ...params})

//获取详情
export const getUserInfo = params => myRequest('/api/user/get', 'POST', params)

//保存用户信息
export const saveUserInfo = params => myRequest('/api/user/save', 'POST', params)

//获取交友要求
export const getFriendship = params => myRequest('/api/user/getFriendship', 'POST', params)
//保存交友要求
export const saveFriendship = params => myRequest('/api/user/saveFriendship', 'POST', params)

//获取用户邀请码
export const getInviteCode = params => myRequest('/api/user/getInviteCode', 'POST', params)
//获取用户祈福列表
export const getBlessingList = params => myRequest('/api/user/getBlessingList', 'POST', params)

//获取字典信息
export const getByDictType = params => myRequest('/api/dict/getByDictType', 'POST', params)

//获取用户功德数量
export const getMeritCount = params => myRequest('/api/user/getMeritCount', 'POST', params)


