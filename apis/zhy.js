import { myRequest } from '../utils/request'

//获取用户每日运势
export const getDailyFortune = params => myRequest('/api/fortune/getDailyFortune', 'POST', params)