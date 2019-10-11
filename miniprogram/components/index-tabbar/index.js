Component({
  properties: {
    active: {
      type: String,
      value: 'home'
    },
    panels: {
      type: Array,
      value: []
    },
    book_data: {
      type: Array,
      value: []
    }
  },
  methods: {
    onChange(event) {
      // console.log(event.detail);
      if (event.detail == 'category') {
        wx.scanCode({
          onlyFromCamera: true,
          scanType: ['barCode'],
          success: res => {
            // res样例:
            // { charSet: "utf-8", result: "9787508643762", errMsg: "scanCode:ok", rawData: "OTc4NzUwODY0Mzc2Mg==", scanType: "EAN_13" }
            console.log(res.result);
            wx.cloud.callFunction({
              name: 'bookinfo',
              data: {
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
      } else {
          this.triggerEvent('changeTab', event.detail)
      }
    }
  }
})