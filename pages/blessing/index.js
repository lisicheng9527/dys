import { getBlessing, issueComment, likeComment, getCommentList, wish, replyComment, getCommentDetail} from '../../apis/jgd'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabIndex: 0,
    detail: {},
    comments: [],
    sorts: [],
    commentValue: "",
    placeholder: "“赠人玫瑰，手有余香”",
    isFocus: false,
    isEnd: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    this.blessingId = options.id;
    await this.getBlessingData()
    this.getRootCommentListData()
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
      this.getReplyCommentListData(data.id, index)
    } else {
      let newComments = this.data.comments;
      newComments[index].isShowReplys=true;
      this.setData({
        comments: newComments
      })
    }
  },
  getMoreReplys() {
    let data = e.currentTarget.dataset;
    let index = data.index;
    this.getReplyCommentListData(data.id, index)
  },
  onShareAppMessage(res) {
    return {
      title: this.detail.title
    }
  },
  async getRootCommentListData() {
    let { results, sorts } = await getCommentList({
      data: {
        blessingId: this.blessingId,
        sorts: this.data.sorts
      }
    })
    this.setData({
      comments: this.data.comments.concat(results),
      sorts,
      isEnd: results.length < 20
    })
  },
  async getReplyCommentListData(rootCommentId, index) {
    let newComments = this.data.comments;
    let { results, sorts } = await getCommentList({
      data: {
        blessingId: this.blessingId,
        rootCommentId: rootCommentId,
        sorts: newComments[index].sorts
      }
    })
      newComments[index].replys = (newComments[index].replys || []).concat(results);
      newComments[index].sorts = sorts;
      newComments[index].isShowReplys = true;
      this.setData({
        comments: newComments
      })
  },
  async sendComment() {
    if(this.rootCommentId) {
      await this.toReplyComment()
    } else {
      await this.toIssueComment()
    }
    this.setData({
      commentValue: '',
      placeholder: '“赠人玫瑰，手留余香”'
    })
    
  },
  async toIssueComment(){
    let { commentId } = await issueComment({
      data: {
        blessingId: this.blessingId,
        content: this.data.commentValue,
      }
    })
    // 更新评论列表
    let item = await this.toGetCommentDetail(commentId)
    let comments = this.data.comments;
    comments.unshift(item)
    let detail = this.data.detail;
    detail.commentCount++;
    this.setData({
      comments,
      detail
    })
  },
  async toReplyComment(){
    let { commentId } = await replyComment({
      data: {
        blessingId: this.blessingId,
        content: this.data.commentValue,
        replyUserId: this.userId,
        rootCommentId: this.rootCommentId,
        commentId: this.rootCommentId
      }
    })
    let item = await this.toGetCommentDetail(commentId)
    let comments = this.data.comments;
    comments[this.parentIndex].replyCount++;
    comments[this.parentIndex].replys.unshift(item)
    this.setData({
      comments
    })
    this.rootCommentId = null;
    this.parentIndex = null;
    this.userId = null;
  },
  async toGetCommentDetail(commentId) {
    let res = await getCommentDetail({
      data: {
        blessingId: this.blessingId,
        commentId
      }
    })
    return res
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
  onReachBottom() {
    console.log('触底了')
    console.log(this.data.isEnd)
    if(!this.data.isEnd) {
      this.getRootCommentListData();
    }
  }
})