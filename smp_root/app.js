//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs)
  },
  getUserInfo: function (cb) {
    var that = this;
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function (data) {
          console.log(data);
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo;
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  checkSession: function () {
    wx.checkSession({
      success: function () {
        //登录态未过期
        console.log('session 未过期 可正常使用');
      },
      fail: function () {
        //登录态过期
        console.log('session 已过期 请重新登录');
      },
      complete: function () {
        console.log('session 检查完成');
      }
    })
  },
  globalData: {
    userInfo: null
  }
});