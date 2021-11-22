var appDatas = getApp()

Page({
  data: {
    openid: "",
    userInfo: ""
  },
  //获取openid
  onLoad: function () {
    wx.cloud.callFunction({
      name: 'openid'
    }).then(res => {
      this.setData({
        openid: res.result.openid
      })
      console.log("openid", res.result.openid)
    }).catch(err => {
      console.log(err)
    })
  },
  //获取openid end
  todaoru(){
    wx.navigateTo({
      url: '/pages/tiaozhuan/tiaozhuan',
    })
  },

todianmin(){
  wx.navigateTo({
    url: '/pages/dianmin/dianmin',
  })
},

todmlist(){
  wx.navigateTo({
    url: '/pages/dmlist/dmlist',
  })
},
  //1.选择Excel表格
  chooseExcel() {

    let that = this
    wx.chooseMessageFile({
      count: 1,
      type: "file",
      success(res) {
        let path = res.tempFiles[0].path;
        console.log("选择成功", path);
        that.uploadExce(path);
      }
    })
  },
  // 2。上传Excel表格
  uploadExce(path) {
    let that = this
    wx.cloud.uploadFile({
      cloudPath: new Date().getTime() + ".xls",
      filePath: path,
      success: res => {
        // 加载等待
        wx.showLoading({
          title: '上传中。。。',
        });
        // 加载等待
        console.log("上传成功 ", res.fileID)
        that.jiexi(res.fileID)
      },
      fail: err => {
        console.log(" 上传失败", err)
      }
    })
  },

  jiexi(fileID) {
    //删除原名单
    wx.cloud.callFunction({
      name: 'shangchu',
      data: {
        openid: openid
      },
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
    //删除原名单end
    //解析表
    let openid = this.data.openid
    wx.cloud.callFunction({
      name: "excel",
      data: {
        openid: openid,
        fileID: fileID
      },
      success(res) {
        console.log("解析成功", res);
        // 解除加载等待
        wx.hideLoading();
        // 解除加载等待
        wx.showToast({
          title: '上传完成',
        })
        wx.navigateTo({
          url: '/pages/dianmin/dianmin',
        })
      },

      fail(res) {
        console.log("解析失败", res);
      },
    })
  },
  //解析表end
  //复制excel文件下载链接
  copyFileUrl() {
    wx.setClipboardData({
      data: "https://6469-dianm-nmv75-1302740949.tcb.qcloud.la/TEST/TEST.xls?sign=10b7fc71441e9a16480d1d7a34ba9797&t=1595910622",
      success(res) {
        wx.getClipboardData({
          success(res) {
            console.log("复制成功", res.data) // data
          }
        })
      }
    })
  }
})