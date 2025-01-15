// 接口请求封装

import { apiBaseUrl } from "./env"

export const myUpload= async (api = '', filePath) => {
  wx.showLoading({
    title: "图片上传中",
    mask: true  //开启蒙版遮罩
  });
  let url = /^https?:\/\//i.test(api) ? api : apiBaseUrl + api;
  console.log('filePath-----', filePath)
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url,
      filePath, // 要上传文件资源的路径
      header: {
        'content-type': 'multipart/form-data',
        'Authorization': wx.getStorageSync("loginToken"),
      },
      name: 'file', // 文件对应的key
      formData: {},
      success: function(res) {
        // 上传成功后的操作
        console.log('success-----', res)
        let result = JSON.parse(res?.data);
        if(result.code === 10000) {
          resolve(result.data)
        } else {
          reject({
            statusCode: res.statusCode,
            code: result.code,
            message: result.message,
            data: ''
          })
          wx.showToast({
            title: '图片上传失败',
            icon: 'none'
          })
        }
      },
      fail: function(error) {
        // 上传失败后的操作
        wx.showToast({
          title: '图片上传失败',
          icon: 'none'
        })
        reject({
          message: error?.errMsg || '网络异常',
          icon: 'none'
        })
      },
      complete: function() {
        wx.hideLoading()
      }


    })
  })
}
