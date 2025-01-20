import { getWxUrl } from '../../apis/jhy'
Page({
  data: {
    wxCode: 'haoyunwu168',
    wxUrl: ''
  },
  onLoad() {
    this.getWxUrlData()
  },
  onReady() {
  },
  onShow() {
    
  },
  saveCode() {
    wx.saveImageToPhotosAlbum({
      filePath: this.data.wxUrl,
      success(res) {
        wx.showToast({
          title: '保存成功',
          icon: 'success',
        });
      },
      fail(err) {
        wx.showToast({
          title: '保存失败',
          icon: 'error',
        });
      }
  });
  },
  async getWxUrlData() {
    let { url } = await getWxUrl({data: {
      type: 'groupChat'
    }})
    this.setData({
      wxUrl: url
    })
  },
  toEdit() {
    wx.navigateTo({
      url: '/pages/editUser/index?tabIndex=1',
    })
  },
  copy() {
    wx.setClipboardData({
      data: this.data.wxCode, // 确保是字符串类型
      success: function(res) {
        wx.showToast({
          title: '复制成功',
          icon: 'success',
        });
      },
      fail: function(err) {
        wx.showToast({
          title: '复制失败',
          icon: 'none',
        });
      }
    });
  }

});
