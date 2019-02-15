// pages/login.js
var network = require("../../utils/network.js")
Page({
  data: {
    showModal: false,
    showEmpty: false,
    showPassward: false,
    phone_focus: false,
    passward_focus: false,
    userName: '',
    userPwd: '',
    userPhone: '',
    password: true,
    next: true,
    reply: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  showDialogBtn: function () {
    this.setData({
      showModal: true
    })
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () {
  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },

  inputPhone: function () {
    this.setData({
      phone_focus: true,
      showEmpty: true
    })
  },
  inputPwd: function () {
    this.setData({
      passward_focus: true,
      showPassward: true
    })
  },
  userNameInput: function (e) {
    this.setData({
      userName: e.detail.value
    })
    if (this.data.userName.length == 11 && this.data.userPwd) {
      this.setData({
        next: false
      })
    }
  },
  passWdInput: function (e) {
    this.setData({
      userPwd: e.detail.value
    })
    if (this.data.userName.length == 11 && this.data.userPwd) {
      this.setData({
        next: false
      })
    }
  },
  emptyValue: function (e) {
    this.setData({
      userPhone: '',
      showEmpty: false
    })
  },
  eyeClose: function () {
    this.setData({
      password: false
    })
  },
  eyeOpen: function () {
    this.setData({
      password: true
    })
  },
  onCancel: function () {
    this.hideModal();
  },
  loginBtnClick: function () {
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          var that = this
          var params = new Object()
          params.mobile = that.data.userName;
          params.password = that.data.userPwd;
          params.code = res.code;
          network.POST({
            url: '/login',
            params: params,
            success: function (res) {
              // console.log(res)
              if (res.data.ret == true) {
                var token = res.data.data.token
                wx.setStorageSync('token', token);
                wx.switchTab({
                  url: '../klass/klass'
                })
              } else {
                that.setData({
                  reply: false
                })
              }
            },
            fail: function () {
              //失败后的逻辑  
            },
          })
        }
      }
    })
  }
})