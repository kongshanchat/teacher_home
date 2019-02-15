import WxValidate from '../../utils/WxValidate.js'
var network = require("../../utils/network.js")
var util = require('../../utils/util.js');  
var interval = null
let app = getApp();
let smsdk = app.SMSdk;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    H:'',
    footer_h:'',
    promoter_id:'',
    form_width:'',
    native_place:0,
    array:[
      '北京市','天津市','上海市','重庆市','河北省','山西省','辽宁省','吉林省','黑龙江省','江苏省','浙江省','安徽省','福建省','江西省','山东省','河南省','湖北省','湖南省','广东省','海南省','四川省','贵州省','云南省','陕西省','甘肃省','青海省','台湾省','内蒙古自治区','广西壮族自治区','西藏自治区','宁夏回族自治区','新疆维吾尔自治区','香港特别行政区','澳门特别行政区'
    ],
    birth_date:'',
    interview_date: '',
    userMobile:'',
    verificationCode:'',
    coach_apply:'coach_apply',
    verification: '获取验证码',
    msg:'验证码错误',
    currentTime: 60,
    reply: true,
    disabled:true,
    disable:false,
    xueli: [
      { name: '中专及以下', value: '0', checked: true },
      { name: '大专', value: '1', checked: false },
      { name: '本科', value: '2', checked: false },
      { name: '研究生及以上', value: '3', checked: false}  
    ],
    learn_piano_years: [
      { name: '3年以下', value: '0', checked: true },
      { name: '4-6年', value: '1', checked: false },
      { name: '7-9年', value: '2', checked: false },
      { name: '10年以上', value: '3', checked: false} 
    ],
    good_at:[
      { name: '钢琴', value: '0', checked: true },
      { name: '小提琴', value: '1', checked: false },
      { name: '手风琴', value: '2', checked: false },
      { name: '古筝', value: '3', checked: false }
    ],
    teach_years:[
      { name: '无经验', value: '0', checked: true },
      { name: '1年以下/兼职3年以下', value: '1', checked: false },
      { name: '全职1-3年/兼职3-5年', value: '2', checked: false },
      { name: '全职4-6年', value: '3', checked: false },
      { name: '全职7年及以上', value: '4', checked: false}  
    ],
    interview_time:[
      { name: '全天', value: '0', checked: true },
      { name: '上午', value: '1', checked: false },
      { name: '下午', value: '2', checked: false }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.q) {
      var url = decodeURIComponent(options.q)
      var id = url.split('=');
      var promoter_id = id[1];
      this.setData({
        promoter_id: promoter_id
      })
      // wx.showToast({
      //   title: options.promoter_id,
      // })
    }
    //获取用户deviceId
    let deviceId = smsdk.getDeviceId();
    this.setData({
      user_deviceId: deviceId,
    });
    
    // 验证字段的规则
    var thisWidth;//屏幕宽度
    var that = this;
    //创建节点选择器
    var query = wx.createSelectorQuery();
    //选择id
    query.select('#AutoTableItem').boundingClientRect()
    query.exec(function (res) {
      //res就是 所有标签为mjltest的元素的信息 的数组
      thisWidth = res[0].width;
      that.setData({
        H: thisWidth * 1.16 + 'px',
        footer_h: thisWidth * 0.216 + 'px',
        form_width: thisWidth * 0.893 + 'px'
      });

    });
    const rules = {
      name: {
        required: true
      },
      // sex: {
      //   required: true
      // },
      school: {
        required: true
      },
      major: {
        required: true
      }, 
      mobile: {
        required: true,
        tel: true,
      },
      verification: {
        required: true
      }
    }
    // 验证字段的提示信息，若不传则调用默认的信息
    const messages = {
      name: {
        required: '请输入姓名'
      },
      school: {
        required: '请填写毕业院校',
      },
      major: {
        required: '请填写毕业专业',
      },
      mobile: {
        required: '请输入手机号',
        tel: '输入有效的手机号'
      },  
    }
    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据  
    this.setData({
      birth_date:time,
      interview_date: time
    });  
    // 创建实例对象
    this.WxValidate = new WxValidate(rules, messages)

    // 自定义验证规则
    this.WxValidate.addMethod('assistance', (value, param) => {
      return this.WxValidate.optional(value) || (value.length >= 1 && value.length <= 2)
    }, '请勾选1-2个敲码助手')

},
  xueLiChange:function(e){
    var xueli = this.data.xueli;
    var check = e.detail.value;
    for (var i = 0; i < xueli.length; i++) {
      if (check.indexOf(i + "") != -1) {
        xueli[i].checked = true;
      } else {
        xueli[i].checked = false;
      }
    }
    this.setData({
      xueli: xueli
    })
  },
  serviceValChange: function (e) {
    var good_at = this.data.good_at;
    var check = e.detail.value;
    for (var i = 0; i < good_at.length; i++) {
      if (check.indexOf(i + "") != -1) {
        good_at[i].checked = true;
      } else {
        good_at[i].checked = false;
      }
    }
    this.setData({
      good_at: good_at
    })
  },
  teachYearsChange:function(e){
    var teach_years = this.data.teach_years;
    var checkArr = e.detail.value;
    for (var i = 0; i < teach_years.length; i++) {
      if (checkArr.indexOf(i + "") != -1) {
        teach_years[i].checked = true;
      } else {
        teach_years[i].checked = false;
      }
    }
    this.setData({
      teach_years: teach_years
    })
  },
  goodAtChange: function (e) {
    var learn_piano_years = this.data.learn_piano_years;
    var checkArr = e.detail.value;
    for (var i = 0; i < learn_piano_years.length; i++) {
      if (checkArr.indexOf(i + "") != -1) {
        learn_piano_years[i].checked = true;
      } else {
        learn_piano_years[i].checked = false;
      }
    }
    this.setData({
      learn_piano_years: learn_piano_years
    })
  },
  bindPickerChange: function (e) {
    this.setData({
      native_place: e.detail.value
    })
  },
  interviewTimeChange: function (e) {
    var interview_time = this.data.interview_time;
    var checkT = e.detail.value;
    for (var i = 0; i < interview_time.length; i++) {
      if (checkT.indexOf(i + "") != -1) {
        interview_time[i].checked = true;
      } else {
        interview_time[i].checked = false;
      }
    }
    this.setData({
      interview_time: interview_time
    })
  },
  userMobileInput:function(e){
    this.setData({
      userMobile: e.detail.value
    })
    var that = this
    var shurumobile = that.data.userMobile
    if (shurumobile.length == 11) {
      that.setData({
        disabled: false
      })
    } else {
      that.setData({
        disabled: true
      })
    } 
  },
  userCodeInput:function(e){
    this.setData({
      verificationCode: e.detail.value
    })
  },
  getCode: function (options) {
    var that = this;
    var currentTime = that.data.currentTime
    interval = setInterval(function () {
      currentTime--;
      that.setData({
        verification: currentTime + 's后重新获取'
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          verification: '重新发送',
          currentTime: 60,
          disabled: false
        })
      }
    }, 1000)
  },
  getVerificationCode:function(){
    var that = this
    this.getCode();
      that.setData({
        disabled: true
      })
    var params = new Object()
    params.mobile = that.data.userMobile;
    params.type = that.data.coach_apply;
    params.deviceId = that.data.user_deviceId
    network.POST({
      url:'/verification_code',
      params: params,
      success: function (res) {
        if (res.data.ret == false) {
          that.setData({
            reply: false,
            msg: res.data.error
          })
        }
      },
      fail: function () {
        that.setData({
          reply: false,
          msg: '服务器繁忙'
        })
      },
    })

  },
  submit:function(e){
    console.log(e)
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
    return {
      title: '原来音乐系同学兼职这么容易？',
      imageUrl:'../../images/job.jpg',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  bindAgeChange: function (e) {
    this.setData({
      birth_date: e.detail.value
    })
  },
  bindDateChange: function (e) {
    this.setData({
      interview_date: e.detail.value
    })
  },
  focus: function (e) {
    this.setData({
      reply: true
    })
  },
  wechatLogin: function () {
    // wx.login({
    //   success: res => {
    //     if (res.code) {
    //       // var that = this
    //       this.submitForm(e, res.code)
    //     }
    //   }
    // })
  },
  submitForm: function (e, code) {
    // var formData = e.detail.value;
    // var params = new Object()
    // params.coach_apply = formData
    // params.code = code;
    // network.POST({
    //   url: '/coach_applies',
    //   params: params,
    //   success: function (res) {
    //     wx.navigateTo({
    //       url: '../resume/resume'
    //     })
    //   },
    //   fail: function () {
    //     //失败后的逻辑  
    //   },
    // })
  },
  formSubmit: function (e) {
    if (!this.WxValidate.checkForm(e)) {
      const error = this.WxValidate.errorList[0]
      // `${error.param} : ${error.msg} `
      wx.showToast({
        title: `${error.msg} `,
        // image: '/pages/images/error.png',
        duration: 1000
      })
      return false
    }
    
    var that = this;
    var params = new Object()
    params.mobile = that.data.userMobile
    params.verification_code = that.data.verificationCode
    params.type = that.data.coach_apply
    network.POST({
      url:'/check_verification_code',
      params: params,
      success: function (res) {
        console.log(res)
        if(res.data.ret == true){
          // this.wechatLogin()
          that.setData({
            disable: true
          })
          wx.login({
            success: res => {
              if (res.code) {
                // var that = this
                // this.submitForm(e, res.code)
                var formData = e.detail.value;
                var params = new Object()
                params.coach_apply = formData
                params.code = res.code;
                params.promoter_id = that.data.promoter_id
                network.POST({
                  url: '/coach_applies',
                  params: params,
                  success: function (res) {
                    if(res.data.ret == true) {
                      wx.navigateTo({
                        url: '../resume/resume'
                      })
                    } else {
                      that.setData({
                        reply: false,
                        msg: '服务器繁忙,请刷新后重试'
                      })
                    }
                  },
                  fail: function () {
                    that.setData({
                      reply: false,
                      msg: '服务器繁忙,请刷新后重试'
                    })
                  },
                })
              }
            }
          })
        }else{
          that.setData({
            msg:res.data.error,
            reply: false
          })
        }
      }
    })
  }
})
