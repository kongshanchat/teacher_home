//index.js
//获取应用实例
var network = require("../../utils/network.js")
const app = getApp()

Page({
  data: {
    current_date: {},
    calendar: [],
    lists: [],
    currentItem: null
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  toKlass: function () {
    this.setData({
      paraKlass: 'block',
      paraPersonal: 'none'
    })
  },
  toPersonal: function () {
    this.setData({
      paraPersonal: 'block',
      paraKlass: 'none',
      color2: '#FF604B',
      color1: '#000'
    })
  },
  klass: function (date) {
    var that = this;
    var params = new Object()
    params.start_date = date
    network.GET({
      url: '/klasses',
      params: params,
      success: function (res) {
        that.setData({
          lists: res.data.data
        })
      },
      fail: function () {
        //失败后的逻辑  
      },
    })
  },
  showklass: function (e) {
    var dataset = e.currentTarget.dataset;
    this.setData({
      currentItem: dataset.select
    })
    this.klass(dataset.select);
  },
  onLoad: function () { 
    var that = this;
    network.GET({
      url: '/calendar',
      success: function (res) {
        that.setData({
          current_date: res.data.data.current_date,
          calendar: res.data.data.calendar,
          currentItem: res.data.data.calendar[0].date
        })

        network.GET({
          url: '/klasses',
          success: function (res) {
            that.setData({
              lists: res.data.data
            })
          },
          fail: function () {
            //失败后的逻辑  
          },
        })
        // that.showklass()
      },
      fail: function () {
        //失败后的逻辑  
      },
    })
  }
})






