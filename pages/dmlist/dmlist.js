let totalNum = -1
Page({
  data: {
    list: []
  },
  //加载数据
  getDataList() {
    let len = this.data.list.length
    if (totalNum == len) {
      wx.showToast({
        title: '全部在这了',
      })
      return
    }
    wx.showLoading({
      title: '加载中',
    })
    console.log("biaodan的长度", len)
    wx.cloud.database().collection('biaodan').orderBy('shijian', 'desc') //"shijian"是字段，'desc'排序
      .skip(len)
      .limit(50)
      .get()
      .then(res => {
        console.log('获取成功', res)
        this.setData({
          list: this.data.list.concat(res.data)
        })
        wx.hideLoading()
      })
      .catch(res => {
        console.log('获取失败', res)
        wx.hideLoading()
        wx.showToast({
          title: '加载失败',
        })
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.database().collection('biaodan').count()
      .then(res => {
        console.log("数据总条数", res)
        totalNum = res.total
      })
    this.getDataList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getDataList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('加载更多。。。。')
    this.getDataList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})