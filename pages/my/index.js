// pages/my/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: wx.statusBarHeight,
    clickCount: 0, // 记录点击次数
    lastClickTime: 0 // 记录上次点击的时间
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  touch() {

  },
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

  },
  touch() {
    // 测试页面隐藏入口
    var now = Date.now(); // 获取当前时间
    var interval = now - this.data.lastClickTime; // 计算与上次点击的时间间隔
    this.data.lastClickTime = now; // 更新上次点击时间
 
    if (interval > 0 && interval < 1000) { // 如果小于1000毫秒，则认为是连续点击
      this.setData({
        clickCount: this.data.clickCount + 1
      });
      // 当连续点击5次时，执行需要的操作
      if (this.data.clickCount >= 5) {
        console.log('连续点击了5次');
        // 执行连续点击5次后的操作
        wx.navigateTo({
          url: '/pages/test/index',
        })
      }
    } else {
      this.setData({
        clickCount: 1, // 重置点击次数
        lastClickTime: now // 更新上次点击时间
      });
    }
  }
})