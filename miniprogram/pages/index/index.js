Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeTab: 'home',
    panels: [
      { name: 'home', icon: 'home-o', label: '首页' },
      { name: 'category', icon: 'qr', label: '扫码添加' },
      { name: 'my', icon: 'user-o', label: '我的' }
    ],
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
    if ('home' == event.detail) {
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
    this.setData({
      activeTab: event.detail
    })
  }
})