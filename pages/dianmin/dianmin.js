let totalNum = -1
const app = getApp()
Page({
  data: {
    CustomBar: app.globalData.CustomBar,
    checkbox: "",
    list: [],
    openid: ""
  },
  //加载数据
  getDataList() {
    let len = this.data.list.length

    if (totalNum == len) {
      wx.showToast({
        title: '加载完毕！',
      })
      return
    }
    wx.showLoading({
      title: '加载中',
    })
    console.log("list的长度", len)
    wx.cloud.database().collection('users')
      .skip(len)
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
  onLoad: function () {
    //获取openid
    wx.cloud.callFunction({
      name: 'openid'
    }).then(res => {
      this.setData({
        openid: res.result.openid
      })
      console.log("openid-res ", res)
      console.log("获取openid", res.result.openid)
    }).catch(err => {
      console.log(err)
    })
    //获取openid-END
  
    wx.cloud.database().collection('users').count()
      .then(res => {
        console.log("数据总条数", res)
        totalNum = res.total
      })
    this.getDataList()

  },
  //多选
  ChooseCheckbox(e) {
    let items = this.data.list;
    let id = e.currentTarget.dataset.value;
    for (let i = 0, lenI = items.length; i < lenI; i++) {
      if (items[i].ID == id) {
        items[i].checked = !items[i].checked;
       
      }
    }
    this.setData({
      list: items

    })
    console.log("选中", items)
  },
  confirm: function () { // 提交
    let list = this.data.list
    let date = app.getNowFormatDate()
    console.log("选择")
    console.log("点击提交list", this.data.list)
    console.log("点击提交时间", app.getNowFormatDate())

    //校验用户名
    if (list.length < 1) {
      wx.showToast({
        icon: 'none',
        title: '还未点名！！',
      })
      return
    }
    wx.showLoading({
      title: '正在提交',
    })
    //注册功能的实现
    wx.cloud.database().collection('biaodan').add({
      data: {
        list: list,
        shijian: date
      },
      success(res) {
        console.log('点名完成', res)
        wx.navigateTo({
          title: '点名完成',
          url: '../dmlist/dmlist',
        })
      }
    })
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