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
      this.triggerEvent('changeTab', event.detail)
    }
  }
})