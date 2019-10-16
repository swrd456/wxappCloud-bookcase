Component({
  properties: {
    tabbar_data: {
      type: Object,
      value: {}
    },
    book_data: {
      type: Array,
      value: []
    }
  },
  /**
 * 组件的初始数据
 */
  data: {
    index: 0
  },
  methods: {
    change: function (e) {
      var index = e.currentTarget.dataset.index * 1
      var item = this.data.tabbar_data.list[index]
      // console.info(item)
      var choose = item.choose

      let _this = this;
      if (choose != 'disable') {
        this.setData({
          index: index
        })
      } else {
        wx.scanCode({
          onlyFromCamera: true,
          scanType: ['barCode'],
          success: res => {
            // res样例:
            // { charSet: "utf-8", result: "9787508643762", errMsg: "scanCode:ok", rawData: "OTc4NzUwODY0Mzc2Mg==", scanType: "EAN_13" }
            console.log("scan result: " +　res.result);
            wx.cloud.callFunction({
              name: 'bookinfo',
              data: {
                isbn: res.result
              },
              success: res => {
                // console.log(res.result);
                // console.log(res.result.data);
                let resultData = JSON.parse(res.result);
                console.log(resultData);
                const db = wx.cloud.database();
                const book = db.collection('mybook');
                db.collection('mybook').add({
                  data: resultData
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
            _this.triggerEvent('change', {
              key: 'home',
              index: 0
            })
          }
        })
      }

      this.triggerEvent('change', {
        key: item.key,
        index: index
      })
    }
  }
})