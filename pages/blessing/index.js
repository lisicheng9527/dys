import { getBlessing, issueComment, likeComment, getCommentList, wish, replyComment } from '../../apis/jgd'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabIndex: 0,
    detail: {},
    comments: [],
    commentValue: "",
    placeholder: "“赠人玫瑰，手有余香”",
    isFocus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    this.blessingId = options.id;
    await this.getBlessingData()
    this.getCommentListData()
    if(options.isComment == 1) {
      this.setData({
        tabIndex: 1,
      })
      this.firstIndex = 1;  // 图片加载完成后再次滚动表示
      if(!this.data.detail?.imageUrls?.length){
        this.scrollToAnchor(1)
      }
    }
  },
  lastImgLoaded(e) {
    let index = e.currentTarget.dataset.index;
    if(index == this.data.detail.imageUrls.length - 1 && this.firstIndex == 1) {
      this.scrollToAnchor(1)
    }
  },
  toReply(e) {
    let index = e.currentTarget.dataset.index;
    let item = this.data.comments[index];
    this.setData({
      placeholder: '回复@'+item.userInfo.nickname,
      isFocus: true
    })
    this.rootCommentId = item.commentId;
    this.parentIndex = index;
    this.userId = item.userInfo.userId;
  },
  onInput: function(e) {
    // 从事件对象中获取输入的值
    this.setData({
      commentValue: e.detail.value
    });
  },
  async toWish() {
    // let f = this.detail.wishStatus == 1 ？ 'wish':''
    if(this.data.detail.wishStatus === 1) {
      wx.showToast({
        title: '已经送出了祝福哦',
        icon: 'none'
      })
      return false
    }
    await wish({
      data: {
        blessingId: this.blessingId
      }
    })
    let newDetail = this.data.detail;
    newDetail.wishStatus = 1;
    newDetail.wishCount ++;
    newDetail.wishCountAdd = 1;
    this.setData({
      detail: newDetail
    })
  },
  packReplys(e) {
    let index = e.currentTarget.dataset.index;
    let newComments = this.data.comments;
    newComments[index].isShowReplys = false;
    this.setData({
      comments: newComments
    })
  },
  getReply(e) {
    let data = e.currentTarget.dataset;
    let index = data.index;
    if(!this.data.comments[data.index].replys?.length) {
      this.getCommentListData(data.id, index)
    } else {
      let newComments = this.data.comments;
      newComments[index].isShowReplys=true;
      this.setData({
        comments: newComments
      })
    }
    
  },
  onShareAppMessage(res) {
    return {
      title: this.detail.title
    }
  },
  async getCommentListData(rootCommentId, index) {
    let { results } = await getCommentList({
      data: {
        blessingId: this.blessingId,
        rootCommentId: rootCommentId || -1,
        sorts: []
      }
    })
    if(!rootCommentId) {
      this.setData({
        comments: results
      })
    } else {
      let newComments = this.data.comments;
      newComments[index].replys = results;
      newComments[index].isShowReplys = true;
      this.setData({
        comments: newComments,
        placeholder: "“赠人玫瑰，手有余香”"
      })
    }
  },
  async sendComment() {
    if(this.rootCommentId) {
      await this.toReplyComment()
    } else {
      await this.toIssueComment()
    }
    this.setData({
      commentValue: ''
    })
    
  },
  async toIssueComment(){
    await issueComment({
      data: {
        blessingId: this.blessingId,
        content: this.data.commentValue,
      }
    })
    this.getCommentListData();
  },
  async toReplyComment(){
    await replyComment({
      data: {
        blessingId: this.blessingId,
        content: this.data.commentValue,
        replyUserId: this.userId,
        rootCommentId: this.rootCommentId,
        commentId: this.rootCommentId

      }
    })
    this.getCommentListData(this.rootCommentId, this.parentIndex);
    this.rootCommentId = null;
    this.parentIndex = null;
    this.userId = null;
  },
  async toLikeComment() {
    await likeComment({data: {
      blessingId: this.blessingId,
      commentId: 0
    }})
  },
  async getBlessingData() {
    let detail = await getBlessing({
      data: {
        blessingId: this.blessingId
      }
    })
    this.setData({
      detail
    })
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

  }
})