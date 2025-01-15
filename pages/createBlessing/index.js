import { uploadImage, issue } from '../../apis/jgd'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: "",
    imageUrls: [],
    title: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  updateTitle(e) {
    this.setData({
      title: e.detail.value
    })
  },
  updateContent(e) {
    console.log('blur----')
    this.setData({
      content: e.detail.value
    })
  },
  chooseImage() {
    let _this = this;
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      maxDuration: 30,
      camera: 'back',
      success(res) {
        console.log(res.tempFiles[0].size)
        _this.toUploadImage(res.tempFiles[0].tempFilePath)
      }
    })
  },
  async toUploadImage(file) {
    let url = await uploadImage(file)
    console.log(url)
    let newImageUrls = this.data.imageUrls;
    newImageUrls.push(url)
    this.setData({
      imageUrls: newImageUrls
    })
  },
  del(e) {
    let imgs = this.data.imageUrls;
    let index = e.currentTarget.dataset.index;
    imgs.splice(index, 1);
    this.setData({
      imageUrls: imgs
    })
  },
  async toIssue() {
    if(!this.data.title) {
      return false;
    }
    let { content, imageUrls, title } = this.data;
    await issue({
      data: {
        content,
        imageUrls,
        title
      }
    })
    wx.showToast({
      title: '发布成功',
      icon: 'success',
      duration: 2000
    })
    this.setData({
      title: '',
      content: '',
      imageUrls: []
    })
    
  },
  onUnload: function() {
    console.log('onUnload-------')
    // 获取上一页实例
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    if (prevPage && prevPage.refreshData) {
        prevPage.refreshData(); // 调用上一页的onLoad方法刷新数据
    }
  }
})