function http(dataUrl, dataJson, way, cb) {
  wx.showToast({
    title: '加载中',
    icon: 'loading',
    duration: 1500
  }) 
  wx.request({
    url: dataUrl,
    method: way,
    data: dataJson,
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: res => {
      if (res.statusCode==200){
        cb(res);
      }else{
        
      }
      
    },
    fail: res => {
      console.log("error");
    }
  })
}



module.exports = {
  http: http
}