import { myRequest } from '../utils/request'

// 登录
export const login = (params) => myRequest('/api/wx/app/login', 'POST', {checkLogin: false, loadingText: '登录授权中', ...params}) 

//刷新token
export const toRefreshToken = (params) => myRequest('/api/auth/refreshToken', 'POST', {showError: false, checkLogin: false, loadingText: '登录授权中', refreshTokenApi: true, ...params}) 