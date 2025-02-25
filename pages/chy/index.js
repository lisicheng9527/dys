import { getDailyFortune, getOne, like, unlike, getSignStatus, userSignIn, share, getList, receive} from '../../apis/chy'
import { formatTime, getWeek } from '../../utils/common'
Page({
  data: {
    date: '',
    week: '',
    fortuneScore: 0,
    scores: [
      { name: "健康", bg: "#859669", icon: 'icon-love', score: 0 },
      { name: "事业", bg: "#DA8532", icon: 'icon-enterprise', score: 0 },
      { name: "爱情", bg: "#B94433", icon: 'icon-amour', score: 0 },
      { name: "财富", bg: "#F1D84A", icon: 'icon-money', score: 0 }
    ],
    motto: {
      likeCount: 0,
      likeStatus: 0,
      mottoAuthor: "",
      mottoContent: ""
    },
    coupons: [
      { text: "美团 外卖红包", bgColor: "#ffe0b2" },
      { text: "饿了么 外卖红包", bgColor: "#bbdefb" }
    ],
    value: 78.4, // 当前得分
    signed: false,
    shared: false,
    rights:[],
    rightsType: {
      'meituan': {
        bg: '#FFC300',
        icon: 'icon-mt'
      },
      'elm': {
        bg: '#0196FF',
        icon: 'icon-elm'
      },
      'taobao': {
        bg: '#FC5E01',
        icon: 'icon-tb'
      },
      'didi': {
        bg: '#FD9C0A',
        icon: 'icon-dd'
      },
      'pdd': {
        bg: '#F20002',
        icon: 'icon-pdd'
      },
      'pdd-a': {
        bg: '#F20002',
        icon: 'icon-pdd'
      }
    }
  },
  toTouch() {
    wx.navigateTo({
      url: '/pages/mjl/index'
    })
  },
  async onLoad() {
    await this.getDailyFortuneData();
    this.getOneData();
    this.getSignStatusData();
    this.getListData();
  },
  onShow() {
    this.setData({
      date: formatTime(),
      week: getWeek()
    })
  },
  receiveRights(e) {
    let item = e.currentTarget.dataset.item;
    let index = e.currentTarget.dataset.index;
    item.forwardUrl && wx.navigateTo({ url: '/pages/redPacket/index?src='+item.forwardUrl})
    receive({
      data: {
        rightsType: item.rightsType
      }
    })
    let newRights = this.data.rights;
    newRights[index].received = true;
    this.setData({
      rights: newRights
    })
  },
  onShareAppMessage(res) {
    // if(res.from == 'button'){
    //   return {
    //     title: '德运社',
    //     path: '/pages/chy/index'
    //   }
    // }
    console.log('onShareAppMessage----')
    if(!this.data.shared) {
      this.reportShare();
    }
  },
  async getDailyFortuneData() {
    let { fortuneScore, fortunes } = await getDailyFortune();
    let scores = this.mergeArrays(this.data.scores, fortunes);
    this.setData({
      fortuneScore,
      scores
    })
  },
  async getOneData() {
    let motto = await getOne();
    this.setData({
      motto
    })
  },
  async likeMotto() {
    let res = like({data: {
      mottoId: this.data.motto.mottoId
    }})
    if(res) {
      this.setData({
        motto: {...this.data.motto, likeCount: this.data.motto.likeCount+1,likeStatus: 1}
      })
    }
  },
  async unlikeMotto() {
    let res = unlike({data: {
      mottoId: this.data.motto.mottoId
    }})
    if(res) {
      this.setData({
        motto: {...this.data.motto, likeCount: this.data.motto.likeCount-1,likeStatus: 0}
      })
    }
  },
  async getSignStatusData() {
    let { shared, signed } = await getSignStatus();
    this.setData({
      signed,
      shared
    })
  },
  async toSigninToday() {
    let res = await userSignIn();
    if(res) {
      this.setData({
        signed: true
      })
    }
  },
  async reportShare() {
    await share();
    this.setData({
      shared: true
    })
  },
  async getListData() {
    let rights = await getList();
    if(rights) {
      this.setData({
        rights
      })
    }
  },
  mergeArrays(arr1, arr2) {
    const merged = {};
    // 辅助函数，用于将数组中的对象添加到merged中
    const addToMerged = (array) => {
      array.forEach(item => {
        if (merged[item.name]) {
          Object.assign(merged[item.name], item);
        } else {
          merged[item.name] = { ...item };
        }
      });
    };
    // 将两个数组中的对象添加到merged中
    addToMerged(arr1);
    addToMerged(arr2);
    // 将merged对象的值转换为数组
    return Object.values(merged);
  }


});
