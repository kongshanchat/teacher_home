// pages/myvideo/myvideo.js
//const uploadImage = require('../../utils/uploadAliyun.js');
const util = require('../../utils/network.js');
const utils = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    intro: '',
    centerBtn: false,
    showDel: false,
    showTip: true,
    loading: false,
    vlist: [],
    edits: false,
    lix: []
  },

  upmasterPiece: function() {
    var that = this;
    wx.chooseVideo({
      sourceType: ['album'],
      maxDuration: 60,
      camera: 'back',
      success(res) {
        var list = that.data.vlist;

        list.push({ status:'', url: res.tempFilePath})
        that.setData({
          zuopin: true,
          //intro: res.tempFilePath,
          vlist: list
        })

        wx.request({
          url: util.API_URL + '/get_upload_oss_sign',
          data: {},
          header: {
            'Authorization': 'Bearer' + wx.getStorageSync('token')
          }, // 设置请求的 header  
          method: 'get',
          success: function(e) {
            const envs = e.data.data;
            var ob = {};
            ob.env = e.data.data;
            ob.filePath = res.tempFilePath;

            that.upload(ob)
          }
        })

      }
    })
  },
  upload(params) {
    var env = null;
    var that = this;
    var zuopin = this.data.zuopin;
    var jianjie = this.data.jianjie;
    env = params.env;
    const aliyunFileKey = params.filePath.replace('http://tmp/', '');
    var sa = utils.get_suffix(aliyunFileKey);

    const Baccessid = env.accessid;
    const BpolicyBase64 = env.policy;
    const Bsignature = env.signature;
    const Bdir = env.dir;
    var sd = Bdir + utils.random_string(32) + sa;
    const sb = {
      'key': sd,
      'policy': BpolicyBase64,
      'OSSAccessKeyId': Baccessid,
      'signature': Bsignature,
      'success_action_status': '200',
    }
    //return false;

    wx.uploadFile({
      url: env.host,
      filePath: params.filePath,
      name: 'file',
      formData: {
        'key': sd,
        'policy': BpolicyBase64,
        'OSSAccessKeyId': Baccessid,
        'signature': Bsignature,
        'success_action_status': '200',
      },
      success: function(res) {
        if (res.statusCode != 200) {
          if (params.fail) {
            params.fail(res)
          }
          return;
        } else {

          if (zuopin == true) {
            var lis = that.data.lix;
            lis.push(sd);
            that.setData({
              lix: lis
            })
          }
          console.log('jianjie')
          if (jianjie == true) {
            that.setData({
              intro_src: sd,
            })
          }

        }
        if (params.success) {
          params.success(aliyunFileKey);
        }
      },
      fail: function(err) {
        err.wxaddinfo = aliyunServerURL;
        if (params.fail) {
          params.fail(err)
        }
      },
    })
  },
  upIntroduce: function() {
    var that = this;
    var edits = this.data.edits;
    var vlist = this.data.vlist;
    // if (vlist.length > 0 && edits==false){
    //   wx.showToast({
    //     title: '请您选择',
    //   })
    //   return false
    // }

    wx.chooseVideo({
      sourceType: ['album'],
      maxDuration: 60,
      camera: 'back',
      success(res) {
        that.setData({
          intro: res.tempFilePath,
          jianjie: true
        })

        wx.request({
          url: util.API_URL + '/get_upload_oss_sign',
          data: {},
          header: {
            'Authorization': 'Bearer ' + wx.getStorageSync('token')
          }, // 设置请求的 header  
          method: 'get',
          success: function(e) {
            const envs = e.data.data;
            var ob = {};
            ob.env = e.data.data;
            ob.filePath = res.tempFilePath;

            that.upload(ob)
          }
        })
      }
    })
  },
  fullscreen: function(e) {
    console.log(e.detail)
    var event = e.detail;
    if (event.fullScreen == true) {
      console.log(e.detail)
      this.setData({
        showDel: false,
        showTip: false
      })
    } else {
      this.setData({
        showDel: true,
        showTip: true
      })
    }
  },
  delates: function(e) {
    var index = e.currentTarget.dataset.index;
    console.log(index);
    var list = this.data.vlist;
    var lix = this.data.lix;
    var editList = this.data.editList;
    if (index == 'introduce') {
      this.setData({
        intro: '',
        intro_src: ''
      })
    } else {
      list.splice(index, 1);
      lix.splice(index, 1);
      editList.splice(index, 1);
      this.setData({
        vlist: list,
        lix: lix,
        editList: editList
      })
    }
  },
  edit: function(e) {
    this.setData({
      showDel: true,
      save: true
    })
  },
  subEdit() {
    var intro = this.data.intro;
    var videoList = this.data.vlist;

  },
  save: function(e) {
    var that = this;
    var is_edit = this.data.edits;
    var list = this.data.lix;
    var editList = this.data.editList;
    var intro = this.data.intro_src;
    var cut_intro = intro.replace('https://dev-kpl.oss-cn-shanghai.aliyuncs.com/', '')
    var new_list = [];


    if (intro == '') {
      wx.showToast({
        title: '个人介绍不能为空',
        icon: 'none'
      })
      return false;
    } else if (list.length == 0) {
      wx.showToast({
        title: '作品不能为空',
        icon: 'none'
      })
      return false;
    } else if (list.length == 0 && intro == '') {
      wx.showToast({
        title: '作品和简介不能为空',
        icon: 'none'
      })
      return false;
    }


    //return false;
    if (is_edit == false) {
      for (var i = 0; i < list.length; i++) {
        var _lis = list[i].replace('https://dev-kpl.oss-cn-shanghai.aliyuncs.com/', '')
        new_list.push(list[i])
      }
      var _new = new_list.join(',');
      var params = new Object();
      params.intro = cut_intro;
      params.works_videos = _new;
      var act = '/coach_works/store'
    } else {
      for (var i = 0; i < list.length; i++) {
        //var _lis= list[i].replace('https://dev-kpl.oss-cn-shanghai.aliyuncs.com/','')
        if (list[i].indexOf('aliyuncs.com') == -1) {
          new_list.push({
            id: '',
            video_url: list[i]
          })
        }
      }

      var video_ids = editList.join(',');
      var params = new Object();
      params.intro = cut_intro;
      params.works_videos = new_list;
      params.video_ids = video_ids;
      var act = '/coach_works/update'
    }

    this.setData({
      loading: true
    })

    console.log(params)

    //return false;

    util.POST({
      url: act,
      params: params,
      success: function(res) {
        //console.log(res)
        //console.log(res.data)
        if (res.data.ret == true) {
          that.setData({
            loading: false
          })
          wx.showToast({
            title: '操作成功',
            duration: 1500,
            success: function() {
              wx.navigateBack({
                dela: 1
              })
            }
          })

        } else {
          that.setData({
            msg: res.data.error,
            reply: false,
            loading: false
          })
        }
      }
    })
  },
  getVideoList: function(e) {
    var that = this;
    util.GET({
      url: '/coach_works',
      success: function(res) {
        if (res.statusCode == 200) {
          if (res.data.data.length != 0) {
            const list = res.data.data.work_videos;
            const listUrl = [];
            const editlistUrl = [];
            const zuopinList = [];
            for (var i = 0; i < list.length; i++) {
              list[i].video_url = util.aliyunApi + list[i].video_url;
              listUrl.push(list[i].video_url);
              zuopinList.push({ status: list[i].status_text, url: list[i].video_url})
              editlistUrl.push(list[i].id);
            }
            that.setData({
              edits: true,
              intro: util.aliyunApi + res.data.data.work.video_url,
              intro_src: util.aliyunApi + res.data.data.work.video_url,
              intro_text: res.data.data.work.work_status_text,
              vlist: zuopinList,
              lix: listUrl,
              editList: editlistUrl,
              status: res.data.data.work_videos
            })
          } else {
            that.setData({
              intro: '',
              vlist: [],
              status: [],
              save: true
            })
          }
        }
      },
      fail: function() {
        //失败后的逻辑  
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getVideoList();
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})