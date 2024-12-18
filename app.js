App({
  onLaunch: function () {
    console.log('onLaunch--------',wx.getWindowInfo().statusBarHeight)
    wx.statusBarHeight = wx.getWindowInfo().statusBarHeight;
    console.log(wx.statusBarHeight)
  }
})
