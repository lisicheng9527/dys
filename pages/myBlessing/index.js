import { getBlessingList } from '../../apis/my'
import { wish, forward, deleteBlessing } from '../../apis/jgd'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    sorts: [],
    isEnd: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getBlessingListData()
  },
  toComment(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/blessing/index?isComment=1&id='+id,
    })
  },
  toDetail(e) {
    wx.navigateTo({
      url: '/pages/blessing/index?id='+e.currentTarget.dataset.id,
    })
  },
  toCreate() {
    wx.navigateTo({
      url: '/pages/createBlessing/index'
    })
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
  onReachBottom() {
    console.log('触底了')
    console.log(this.data.isEnd)
    if(!this.data.isEnd) {
      this.getBlessingListData();
    }
  },
  async getBlessingListData() {
    let { results, sorts } = await getBlessingList({
      data: {
        sortType: 1,
        sorts: this.data.sorts
      }
    })
    this.setData({
      list: this.data.list.concat(results),
      sorts,
      isEnd: results.length < 10
    })
  },
  del(e) {
    let index = e.currentTarget.dataset.index;
    let _this = this;
    wx.showModal({
      title: '确定删除',
      content: ' 确定删除这条许愿内容吗？删除后不可恢复。',
      success (res) {
        if (res.confirm) {
          _this.toDeleteBlessing(index)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
  },
  async toDeleteBlessing(index) {
    await deleteBlessing({
      data: {
        blessingId: this.data.list[index].blessingId
      }
    })
    let newList = this.data.list;
    newList.splice(index, 1);
    this.setData({
      list: newList
    })
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

  }
})