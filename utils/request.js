// 接口请求封装

import { apiBaseUrl } from "./env"
import { logining, refreshTokening } from "./auth"

const defaultConfig = {
    baseUrl: apiBaseUrl, // api基础url
    isShowLoading: true,  // 接口请求时默认显示loading
    loadingText: "加载中", // 默认加载文案
    headers: {
        'Content-Type': 'application/json'
    },
    checkLogin: true, // 默认需要检查登录态
    showError: true
};
  
// 同时发送异步代码的次数
let ajaxTimes = 0;
export const myRequest = async (api = '', method = 'POST', params = {}) => {
    let config = {
        ...defaultConfig,
        ...params
    }
    console.log('config=======', config)
    if(config.checkLogin && (!wx.getStorageSync('loginToken') || !wx.getStorageSync('refreshToken'))) {  // 接口请求前检查是否需要登录
        await logining();
        if(!wx.getStorageSync('loginToken')) {
          wx.showToast({
            title: '授权失败，请稍后重试',
            icon: 'error'
          })
          return false;
        }
    } else if(config.checkLogin && !config.refreshToken && Date.now() - wx.getStorageSync('tokenStartTimeStamp') >= 60 * 60 * 1000) { // 判断token是否过期，token有效期1个小时
        await refreshTokening();
        if(!wx.getStorageSync('loginToken')) {
          wx.showToast({
            title: '网络异常，请稍后重试',
            icon: 'error'
          })
          return false;
        }
    }
    
    ajaxTimes++;

    config.isShowLoading && wx.showLoading({
        title: "加载中",
        mask: true  //开启蒙版遮罩
    });

    let url = /^https?:\/\//i.test(api) ? api : config.baseUrl + api;

    let data = {
      ...params.data || {}
    }
    
    return new Promise((resolve, reject) => {
        wx.request({
            url,
            method,
            data,
            header: { 
              ...config.headers,
              'Authorization': wx.getStorageSync("loginToken"),
            },
            success: (result) => {
                // 请求成功，就将成功的数据返回出去
                console.log('success------', result)
                if(result?.data.code === 10000) {
                  resolve(result.data?.data)
                } else if (result.statusCode === 401 || result?.data?.code === 10002) {
                  // 刷新接口401 需要重新走微信登录授权，其余接口只需要调用刷新接口获取新token
                  wx.redirectTo({
                    url: 'pages/login/index',
                    needWxLogin: config.refreshToken ? 1:0
                  })
                }
                reject({
                  statusCode: result.statusCode,
                  code: result?.data?.code,
                  message: result?.data?.message,
                  data: {}
                })
                if(result?.data.code !== 10000 && config.showError) {
                  wx.showToast({
                    title: result?.data?.message || result?.data?.error || '网络异常，请稍后重试',
                    icon: 'error'
                  })
                }
            },
            fail: (err) => {
                console.log('fail------', err)
                reject({
                  message: err?.errMsg || '网络异常'
                })
            },
            // 不管请求成功还是失败，都会触发
            complete: (err) => {
                ajaxTimes--;
                // 此时就可以关闭loading效果了
                if (ajaxTimes === 0) {
                    //  关闭正在等待loading效果
                    wx.hideLoading();
                }
                console.log('complete------', err)
 
            }
        });
 
    })
}