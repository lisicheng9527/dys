import { getByDictType, getUserInfo, saveUserInfo, getFriendship, saveFriendship } from '../../apis/my'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabIndex: 0,
    dictTypes: {
      gender: [], //性别
      zodiac: [], //星座
      zhZodiac: [], //生肖
    },
    yearRange: [],  //年份
    yearIndex: -1,
    userInfo: {
      gender: '',
      zodiac: '',
      birthYear: '',
      address: '',
      wxNum: '',
      declaration: ''
    },
    isGetedUserInfo: false,
    friendShip: {
      ageRange: {
        begin: '',
        end: ''
      },
      genders: [],
      luckyRange: {
        begin: '',
        end: ''
      },
      meritRange: {
        begin: '',
        end: ''
      },
      zhZodiacs: [],
      zodiacs: []
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if(options.tabIndex == 1) {  // 交友要求
      this.setData({
        tabIndex: 1
      })
      this.getByDictTypeData('zhZodiac');
      this.getFriendshipData()
    } else { // 默认页面-我的信息
      this.setYearRange();
      this.getUserInfoData();
    }
    this.getByDictTypeData('gender');
    this.getByDictTypeData('zodiac');
    
  },
  setYearRange() {
    let years = [];
    for (let i=1950; i <= 2010; i++) {
      years.push(i)
    }
    this.setData({
      yearRange: years
    })
  },
  toggleTab(e) {
    let index = e.currentTarget.dataset.id
    this.setData({
      tabIndex: index
    })
    if(index == 1 && !this.data.dictTypes.zhZodiac.length) {
      this.getByDictTypeData('zhZodiac');
      this.getFriendshipData()
    }else if(index == 0 && !this.data.isGetedUserInfo) {
      this.getUserInfoData()
    }
  },
  async getUserInfoData() {
    let userInfo = await getUserInfo()
    this.setData({
      userInfo,
      isGetedUserInfo: true
    })
  },
  async getByDictTypeData(dictType) {
    let res = await getByDictType({
      data: {
        dictType
      }
    })
    let newDictTypes = this.data.dictTypes;
    newDictTypes[dictType] = res;
    this.setData({
      dictTypes: newDictTypes
    })
    
  },
  yearChange(e) {
    console.log(e.detail)
    let userInfo = this.data.userInfo;
    userInfo.birthYear = this.data.yearRange[e.detail.value];
    this.setData({
      yearIndex: e.detail.value,
      userInfo
    })
    console.log(this.data.yearIndex)
  },
  chooseIt(e){
    let userInfo = this.data.userInfo;
    let data = e.currentTarget.dataset;
    userInfo[data.key] = data.value;
    this.setData({
      userInfo
    })
  },
  updateValue(e){
    let data = e.currentTarget.dataset;
    let userInfo = this.data.userInfo;
    userInfo[data.key]=e.detail.value;
    this.setData({
      userInfo
    })
  },
  async saveUser() {
    let res = await saveUserInfo({
      data: this.data.userInfo
    })
    if(res) {
      wx.showToast({
        title: '保存成功',
        icon: 'success'
      })
    }
  },
  async getFriendshipData() {
    let friendShip = await getFriendship();
    friendShip && this.setData({
      friendShip
    })
  },
  chooseIt1(e) {
    let data = e.currentTarget.dataset;
    let friendShip = this.data.friendShip;
    if(friendShip[data.key].indexOf(data.value) === -1) {
      friendShip[data.key].push(data.value)
    } else {
      friendShip[data.key] = friendShip[data.key].filter(item => item !== data.value)
    }
    this.setData({
      friendShip
    })
    console.log(this.data.friendShip)
  },
  updateValue1(e) {
    let data = e.currentTarget.dataset;
    let friendShip = this.data.friendShip;
    let keys = data.key.split('.');
    friendShip[keys[0]][keys[1]]=e.detail.value;
    console.log(friendShip)
    this.setData({
      friendShip
    })
  },
  async toSaveFriendship() {
    let friendShip = this.data.friendShip;
    let res = await saveFriendship({
      data: {
        ...friendShip,
        ageRange: !friendShip.ageRange.begin && !friendShip.ageRange.end ? null : friendShip.ageRange,
        luckyRange: !friendShip.luckyRange.begin && !friendShip.luckyRange.end ? null:friendShip.luckyRange,
        meritRange: !friendShip.meritRange.begin && !friendShip.meritRange.end ? null:friendShip.meritRange
      }
      
    })
    if(res) {
      wx.showToast({
        title: '保存成功',
        icon: 'success'
      })
    }
  },
  onUnload: function() {
    // 获取上一页实例
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    if (prevPage && prevPage.refreshData) {
        prevPage.refreshData(); // 调用上一页的onLoad方法刷新数据
    }
  }
})