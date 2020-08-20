//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标
      title: '记录', //导航栏 中间的标题
    }
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  }
})
