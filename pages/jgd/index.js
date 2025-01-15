import { getList, getRanking, wish, forward } from '../../apis/jgd'
import { getMeritCount } from '../../apis/my'
Page({
  data: {
    tabs:["祈福榜", "功德榜"],
    tabIndex: 0,
    meritCount: 0,
    list: [],
    sorts: [],
    rankings: [],
    sortType: 1,
    sortName: {
      1: '综合排序',
      2: '最新'
    },
    sortList: [
      {id: 1, name: '综合排序'},
      {id: 2, name: '最新'}
    ],
    isShowSorts: false,
    isEnd: false,
    rankSorts:[],
    isEnd1: false
  },
  onLoad() {
    this.getMeritCountData()
    this.getListData()

  },
  refreshData() {
    this.setData({
      list: [],
      sorts: [],
      isEnd: false
    })
    this.getListData();
  },
  onReady() {
    // wx.setNavigationBarTitle({
    //   title: '德运社',
    // })
  },
  async getMeritCountData() {
    let meritCount = await getMeritCount()
    this.setData({
      meritCount
    })
  },
  async getListData() {
    let { results, sorts } = await getList({data: {
      sortType: this.data.sortType,
      sorts: this.data.sorts
    }});
    this.setData({
      list: this.data.list.concat(results),
      sorts,
      isEnd: results?.length < 10
    })
  },
  toggleTab(e) {
    console.log(e);
    let tabIndex = e.currentTarget.dataset.index;
    this.setData({
      tabIndex,
      sorts: [],
      rankSorts: [],
      list: [],
      rankings: [],
      isEnd: false,
      isEnd1: false
    })
    tabIndex === 0 ? this.getListData():this.getRankingData()
  },
  toggleSort() {
    this.setData({
      isShowSorts: !this.data.isShowSorts
    })
  },
  chooseSort(e) {
    this.setData({
      sortType: e.currentTarget.dataset.id,
      sorts: [],
      list: [],
      isEnd: false
    })
    this.getListData()
  },
  async toWish(e) {
    let index = e.currentTarget.dataset.index;
    if(this.data.list[index].wishStatus == 1) {
      wx.showToast({
        title: '已经送出了祝福哦',
        icon: 'none'
      })
      return false;
    } 
    let blessingId = e.currentTarget.dataset.id;
    
    await wish({
      data: {
        blessingId
      }
    })
    let newList = this.data.list;
    newList[index].wishStatus = 1;
    newList[index].wishCount++
    newList[index].wishCountAdd=1;
    this.setData({
      list: newList
    })
  },
  onReachBottom() {
    console.log('触底了')
    console.log(this.data.isEnd)
    if(this.data.tabIndex === 0 && !this.data.isEnd) {
      this.getListData();
    }else if(this.data.tabIndex === 1 && !this.data.isEnd1){
      this.getRankingData();
    }
  },
  toComment(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/blessing/index?isComment=1&id='+id,
    })
  },
  onShareAppMessage(e) {
    if(e.from == 'button'){
    let data = e.target.dataset;
    let item = this.data.list[data.index];
    this.toForward(item.blessingId, data.index);
      return {
        title: item.title,
        path: '/pages/blessing/index?id='+item.blessingId,
        imageUrl: item.imageUrls && item.imageUrls.length ? item.imageUrls[0]:''
      }
    }
  },
  async toForward(blessingId, index) {
    await forward({
      data: {
        blessingId
      }
    })
    let newList = this.data.list;
    newList[index].forwardCount++;
    this.setData({
      list: newList
    })
  },
  toDetail(e) {wx.navigateTo({
    url: '/pages/blessing/index?id='+e.currentTarget.dataset.id,
  })
    wx.navigateTo({
      url: '/pages/blessing/index?id='+e.currentTarget.dataset.id,
    })
  },
  toCreate() {
    wx.navigateTo({
      url: '/pages/createBlessing/index'
    })
  },
  async getRankingData() {
    let { results, sorts } = await getRanking({
      data: {
        sorts: this.data.rankSorts
      }
    })
    this.setData({
      rankings: this.data.rankings.concat(results),
      rankSorts: sorts,
      isEnd1: results.length < 10
    })
  },
  onUnload: function() {
    // 移除监听器
    this.selectComponent('#list').removeEventListener('refreshData', this.onRefreshData);
  }
});
