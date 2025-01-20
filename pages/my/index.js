import { getSimple } from '../../apis/my'
import { getWxUrl } from '../../apis/jhy'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      headImgUrl: "",
      nickname: "",
      userTags: []
    },
    tagColors: {
      gender: '#A6CBE1',
      zodiac: '#EBCF81',
      birthYear: '#EB8183',
      zhZodiac: '#EBBA81'
    },
    isShowFollowModal: false,
    isShowProposalModal: false,
    wxCode: 'xwill007',
    url: {
      officialAccount: '',
      groupChat: '',
    },
    clickCount: 0, // 记录点击次数
    lastClickTime: 0 // 记录上次点击的时间
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getSimpleData()
  },
  refreshData() {
    this.getSimpleData()
  },
  toEdit() {
    wx.navigateTo({
      url: '/pages/editUser/index',
    })
  },
  async getSimpleData() {
    let userInfo = await getSimple();
    this.setData({
      userInfo
    })
  },
  toMyBlessing() {
    wx.navigateTo({
      url: '/pages/myBlessing/index',
    })
  },
  async getWxUrlData(type) {
    let { url } = await getWxUrl({data: {
      type
    }})
    let newUrl = this.data.url;
    newUrl[type] = url;
    this.setData({
      url: newUrl
    })
  },
  toFollow() {
    if(!this.data.url.officialAccount){
      this.getWxUrlData('officialAccount');
    }
    this.setData({
      isShowFollowModal: true
    })
  },
  closeFollow() {
    this.setData({
      isShowFollowModal: false
    })
  },
  toProposal() {
    if(!this.data.url.groupChat){
      this.getWxUrlData('groupChat');
    }
    this.setData({
      isShowProposalModal: true
    })
  },
  closeProposal() {
    this.setData({
      isShowProposalModal: false
    })
  },
  saveCode() {
    wx.saveImageToPhotosAlbum({
      filePath: this.data.url.officialAccount,
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
  saveCode1() {
    wx.saveImageToPhotosAlbum({
      filePath: this.data.url.groupChat,
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