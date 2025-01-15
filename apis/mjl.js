import { myRequest } from '../utils/request'

//摸鱼
export const touchFish = params => myRequest('/api/touch/touchFish', 'POST', {isShowLoading: false, ...params})

//获取摸鱼统计数据
export const getTouchFishStats = params => myRequest('/api/touch/getTouchFishStats', 'POST', params)
//更新摸鱼时间
export const updateTime = params => myRequest('/api/touch/updateTime', 'POST', params)


