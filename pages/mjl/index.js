import { touchFish, getTouchFishStats, updateTime } from '../../apis/mjl'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: wx.statusBarHeight,
    lucks: {
      "dailyFortunateCount": 0,
      "dailyLuckyCount": 0,
      "dailyMinutes": 0,  // 后端存的是s
      "totalDays": 0,
      "totalFortunateCount": 0,
      "totalLuckyCount": 0
    },
    fortunateCount: 0,
    luckyCount: 0,
    isMove: '',
    touchCount: 0,
  },
  backHome() {
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.startTime = Date.now()
    this.getTouchFishData()
  },
  async toUpdateTime(s) {
    await updateTime({
      data: {
        touchFishMinutes: s
      }
    })
  },
  async getTouchFishData() {
    let lucks = await getTouchFishStats();
    lucks.realDailyMinutes = Math.ceil(lucks.dailyMinutes/60)
    this.setData({
      lucks
    })
    this.dailyMinutes = lucks.dailyMinutes;  // dailyMinutes后端存的是s
  },
  async toTouchFish() {
    if(this.data.isMove) return false;
    this.setData({
      isMove: 'isMove'
    })
    setTimeout(() => {
      this.setData({
        isMove: ''
      })
    }, 2000)
    let res = await touchFish();
    if(res){
      let lucks = this.data.lucks;
      lucks.dailyFortunateCount = lucks.dailyFortunateCount + res.fortunateCount;
      lucks.dailyLuckyCount = lucks.dailyLuckyCount + res.luckyCount;
      let timeStamp = Date.now() - this.startTime;
      this.dailyMinutes = this.dailyMinutes + timeStamp/1000;
      lucks.realDailyMinutes = Math.ceil(this.dailyMinutes/60);
      this.setData({
        fortunateCount: res.fortunateCount,
        luckyCount: res.luckyCount,
        lucks,
      })
      setTimeout(() => {
        this.setData({
          fortunateCount: 0,
          luckyCount: 0
        })
      }, 2000)
    }
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
    let timeStamp = Date.now() - this.startTime;
    this.toUpdateTime(Math.ceil(timeStamp/1000))
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