import { logining, refreshToken } from '../../utils/auth'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let needWxLogin = options.needWxLogin;
    if(needWxLogin) {
      this.login();
    } else { // 只需要刷新token
      this.refreshToken();
    }
  },
  async login() {
    await logining();
    if(wx.getStorageSync('loginToken')){
      wx.navigateTo({
        url: 'pages/chy/index',
      })
    }
  },
  async refreshToken() {
    await refreshToken();
    wx.navigateTo({
      url: 'pages/chy/index',
    })
  }
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})