import { login, toRefreshToken } from "../apis/login"

// 封装微信登录函数
function wxLogin() {
  return new Promise((resolve, reject) => {
    wx.login({
      success(res) {
        resolve(res)
      },
      fail(err) {
        reject(err)
      }
    })
  })
  
}

// 封装微信获取用户信息函数
function wxGetUserInfo() {
  return new Promise((resolve, reject) => {
    // 必须是在用户已经授权的情况下调用
    wx.getUserInfo({
      success(res) {
        console.log('getUserInfo success', res)
        resolve(res)
      },
      fail(err) {
        reject(err)
      }
    })
  })
  
}

function saveTokenInfo(token, refreshToken) {
  token && wx.setStorageSync('loginToken', 'Bearer '+token);
  refreshToken && wx.setStorageSync('refreshToken', refreshToken);
  wx.setStorageSync('tokenStartTimeStamp', Date.now());
}
export function removeTokenInfo() {
  wx.removeStorageSync('loginToken');
  wx.removeStorageSync('refreshToken');
  wx.removeStorageSync('tokenStartTimeStamp');
}

export async function logining() {
  let { code } = await wxLogin();
  if(!code) return false;
  let { encryptedData,iv } = await wxGetUserInfo();
  let { token, refreshToken } = await login({ data: {
    code,
    encryptedData,
    iv,
    wxAppCode: 'hfqdk-app'
  }});
  saveTokenInfo(token, refreshToken);
  
}

export async function refreshTokening () {
  removeTokenInfo();
  let { token, refreshToken } = await toRefreshToken({ data: {
    refreshToken: wx.getStorageSync('refreshToken')
  }});
  saveTokenInfo(token, refreshToken)
}