//index.js
//获取应用实例
var network = require("../../utils/network.js")
const app = getApp()

Page({
  data: {
    
  },
  //事件处理函数
  onLoad: function () {
    var that = this;
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var that = this
        var params = new Object()
        params.code = res.code;
        network.POST({
          url: '/checkbind',
          params: params,
          success: function (res) {
            // console.log(res)
            if (res.data.data.is_bind == false){
              wx.redirectTo({
                url: '../login/login'
              })
            }else{
              var token = res.data.data.token
              wx.setStorageSync('token', token);
              wx.switchTab({
                url: '../klass/klass'
              })
            }
          },
          fail: function () {
            //失败后的逻辑  
          },
        })
      }
    })
  }
})






