var network = require("../../utils/network.js")
var util = require('../../utils/util.js');  
Page({
  /**
   * 页面的初始数据
   */
  data: {
    weekday: [
      { day: '一' },
      { day: '二' },
      { day: '三' },
      { day: '四' },
      { day: '五' },
      { day: '六' },
      { day: '日' }
    ],
    chours: [],
    weeklist: [
      {
        time: '7:00 7:30'
      },
      {
        time: '7:30 8:00'
      },
      {
        time: '8:00 8:30'
      },
      {
        time: '8:30 9:00'
      },
      {
        time: '9:00 9:30'
      },
      {
        time: '9:30 10:00'
      },
      {
        time: '10:00 10:30'
      },
      {
        time: '10:30 11:00'
      },
      {
        time: '11:00 11:30'
      },
      {
        time: '11:30 12:00'
      },
      {
        time: '12:00 12:30'
      },
      {
        time: '12:30 13:00'
      },
      {
        time: '13:00 13:30'
      },
      {
        time: '13:30 14:00'
      },
      {
        time: '14:00 14:30'
      },
      {
        time: '14:30 15:00'
      },
      {
        time: '15:00 15:30'
      },
      {
        time: '15:30 16:00'
      },
      {
        time: '16:00 16:30'
      }, 
      {
        time: '16:30 17:00'
      },
      {
        time: '17:00 17:30'
      },
      {
        time: '17:30 18:00'
      },
      {
        time: '18:00 18:30'
      },
      {
        time: '18:30 19:00'
      },
      {
        time: '19:00 19:30'
      },
      {
        time: '19:30 20:00'
      },
      {
        time: '20:00 20:30'
      },
      {
        time: '20:30 21:00'
      },
      {
        time: '21:00 11:30'
      },
      {
        time: '21:30 22:00'
      },
      {
        time: '22:00 22:30'
      },
      {
        time: '22:30 23:00'
      },
      {
        time: '23:00 23:30'
      },
      {
        time: '23:30 24:00'
      },
    ]
  },
  onLoad: function (options) {
    var time = util.formatTime(new Date());
    this.setData({
      time:time
    })
    var weekDay = ["日", "一", "二", "三", "四", "五", "六"];  
    var date = new Date();
    var Day = date.getDay();
    var week = weekDay[Day];
    this.setData({
      day:week
    })
    console.log(this.data.day)
    var that = this;
    network.GET({
        url: '/chours',
        success: function (res) {
          that.setData({
            chours: res.data.data
          })
        },
        fail: function () {
          //失败后的逻辑  
        },
    })
  },
})