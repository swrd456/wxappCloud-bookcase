Page({
  /**
   * 页面的初始数据
   */
  data: {
    choose_index: 0,
    tabbar_data: {
      "color": "#999999",
      "selectedColor": "#7788dd",
      "borderStyle": "#dcdcdc",
      "backgroundColor": "#ffffff",
      "list": [{
        "key": "home",
        "iconPath": "/images/icon_home.png",
        "selectedIconPath": "/images/icon_home_active.png",
        "text": "首页"
      },
      {
        "key": "new",
        "iconPath": "/images/icon_plus_big.png",
        "iconType": "big overflow circle shadow",
        "choose": "disable",
        "text": "扫码加书"
      },
      {
        "key": "me",
        "iconPath": "/images/icon_me.png",
        "selectedIconPath": "/images/icon_me_active.png",
        "text": "我的"
      }
      ]
    },
    book_data:[
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 查询数据库
    const db = wx.cloud.database()
    db.collection('mybook').where({
      _openid: '' // 填入当前用户 openid
    }).get().then(res => {
      this.setData({
        book_data: res.data
      })
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
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  onTabChange(event) {
    // console.info(event)
    if ('home' == event.detail.key) {
      // console.info('************')
      // 查询数据库
      const db = wx.cloud.database()
      db.collection('mybook').where({
        _openid: '' // 填入当前用户 openid
      }).get({
        success: function (res) {
          // console.log(res.data);
          this.setData({
            book_data: res.data
          })
        }
      })
    }

    // console.info(event.detail.index);
    this.setData({
      choose_index: event.detail.index
    })
  }
})