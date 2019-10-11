Component({
  properties: {
    book_data: {
      type: Array,
      value: []
    }
  },
  methods: {
    viewDetail(event) {
      console.log(event);
    }
  }
})