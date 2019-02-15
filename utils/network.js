var API_URL = 'http://d.coach.kuaipeilian.com/mini_program'
//var API_URL = 'http://server.coach.11taotao.com/mini_program'
//var API_URL = 'http://jiaowu.11taotao.com/mini_program'
//var ossApi = 'http://server.ops.11taotao.com'
//var API_URL = 'https://d.opc.kuaipeilian.com/mini_program'
var aliyunApi = 'https://dev-kpl.oss-cn-shanghai.aliyuncs.com/'
var requestHandler = {
  params: {},
  success: function(res) {
    // success  
  },
  fail: function() {
    // fail  
  }
}

//GET请求  
function GET(requestHandler) {
  request('GET', requestHandler)
}
//POST请求  
function POST(requestHandler) {
  request('POST', requestHandler)
}

function request(method, requestHandler) {
  //注意：可以对params加密等处理  
  var params = requestHandler.params;

  wx.request({
    url: API_URL + requestHandler.url,
    data: params,
    method: method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
    header: {
      'Authorization': 'Bearer ' + wx.getStorageSync('token')
    }, // 设置请求的 header  
    success: function(res) {
      //注意：可以对参数解密等处理  
      requestHandler.success(res)
    },
    fail: function() {
      requestHandler.fail()
    },
    complete: function() {
      // complete  
    }
  })
}
module.exports = {
  GET: GET,
  POST: POST,
  API_URL: API_URL,
  //ossApi: ossApi,
  aliyunApi: aliyunApi
}