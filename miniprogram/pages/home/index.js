Component({
  properties: {
    book_data: {
      type: Array,
      value: []
    }
  },
  methods: {
    viewDetail(event) {
      // console.log(event.currentTarget.id);
      wx.navigateTo({
        url: '/pages/bookDetail/index?id=' + event.currentTarget.id
      })
    }
  }
})