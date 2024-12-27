// pages/blessing/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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
  toggleTab(e) {
    let index = e.currentTarget.dataset.id
    this.setData({
      tabIndex: index
    })
    this.scrollToAnchor(index)
  },
  scrollToAnchor: function(index) {
    const query = wx.createSelectorQuery()
    query.select('#index'+index).boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(function(res) {
      wx.pageScrollTo({
        scrollTop: res[0].top + res[1].scrollTop
      })
    })
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