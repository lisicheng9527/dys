Page({
  data: {
    tabs:["祈福榜", "功德榜"],
    tabIndex: 0,
    rankings: [{
      name: '会做放的张张'
    },
    {
      name: '张阿妹'
    },
    {
      name: '希望的阳光'
    },
    {
      name: '张安'
    }]
  },
  onLoad() {
  },
  onReady() {
    wx.setNavigationBarTitle({
      title: '德运社',
    })
  },
  onShow() {
    
  },
  toggleTab(e) {
    console.log(e);
    this.setData({
      tabIndex: e.currentTarget.dataset.index
    })
  },
  toCreate() {
    wx.navigateTo({
      url: '/pages/createBlessing/index'
    })
  }
});
