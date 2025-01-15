import { myRequest } from '../utils/request'

//获取微信二维码
export const getWxUrl = params => myRequest('/api/qr/getWxUrl', 'POST', {isShowLoading: false, ...params})



