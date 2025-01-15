// components/bottom-modal/index.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    isShow: {
      type: Boolean,
      value: false,
      observer: function(newVal, oldVal) {
        // 监听isShow属性的变化，可以进行额外的处理
      }
    },
    title: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    close() {
      this.triggerEvent('closeModal')
    }
  }
})