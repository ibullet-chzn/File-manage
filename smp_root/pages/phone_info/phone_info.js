//index.js
//获取应用实例
var app = getApp();
Page({
  data: {
    motto: '我的设备',
    phoneInfo: {},
    netInfo: {}
  },
  //事件处理函数
  bindViewTap: function () {
    console.log('view tap');
    wx.redirectTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad');
    var that = this;

    app.checkSession();
    app.getUserInfo(function (data) {
      console.log(data);
    });

    wx.getSystemInfo({
      success: function (res) {
        console.log(res);
        that.setData({
          phoneInfo: res
        })
      },
      fail: function (err) {
        console.log(err);
      },
      complete: function () {
        console.log('已完成');
      }
    });

    wx.getNetworkType({
      success: function (res) {
        console.log(res);
        that.setData({
          netInfo: res
        })
      },
      fail: function (err) {
        console.log(err);
      },
      complete: function () {
        console.log('已完成');
      }
    });

    wx.downloadFile({
      url: 'http://static.jinkaimen.cn/vendor/vendor.min.js',
      success: function (res) {
        console.log(res);
      },
      fail: function (err) {
        console.log(err);
      },
      complete: function () {
        console.log('已完成');
      }
    })
  },
  onShareAppMessage: function () {
    return {
      title: '查看启动日志',
      desc: '查看启动日志',
      path: 'pages/logs/logs'
    }
  }
});
