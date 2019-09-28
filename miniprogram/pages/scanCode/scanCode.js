// pages/scanCode/scanCode.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  scanCode: function(event){
    wx.scanCode({
      onlyFromCamera: true,
      scanType: ['barCode'],
      success: res => {
        // res样例:
        // { charSet: "utf-8", result: "9787508643762", errMsg: "scanCode:ok", rawData: "OTc4NzUwODY0Mzc2Mg==", scanType: "EAN_13" }
        console.log(res.result);
        wx.cloud.callFunction({
          name: 'bookinfo',
          data:{
            isbn: res.result
          },
          success: res => {
            console.log(res.result);
            // console.log(res.result.data);
            let resultData = JSON.parse(res.result);
            console.log(resultData.data[0]);
            const db = wx.cloud.database();
            const book = db.collection('mybook');
            db.collection('mybook').add({
              data: resultData.data[0]
            }).then(res => {
              console.log(res);
            }).catch(err => {
              console.log(err);
            });
          },
          fail: err => {
            console.error(err);
          }
        });
      },
      fail: err => {
        console.log(err);
      }
    })
  }
})