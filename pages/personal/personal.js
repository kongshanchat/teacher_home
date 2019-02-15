//index.js
//获取应用实例
var network = require("../../utils/network.js")
const app = getApp()

Page({
  data: {
    coach_info: {},
    color1: '#FF604B',
    color2: '#000',
    catalogSelect: 0
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  makePhoneCall: function () {
    var that = this
    wx.makePhoneCall({
      phoneNumber: '400 - 0166 - 123'
    })
  },
  onLoad: function () {
    var that = this;
    network.GET({
      url: '/user/center',
      // header:
      success: function (res) {
        // console.log(res)
        that.setData({
          coach_info: res.data.data
        })
      },
      fail: function () {
        //失败后的逻辑  
      },
    })
  },
  showTimetable:function(){
    wx.navigateTo({
      url: '../chour/chour'
    })
  },
  showmyVideo:function(){
    wx.navigateTo({
      url: '../myvideo/myvideo'
    })
  }
})






