//index.js
//获取应用实例
var app = getApp();
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
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
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    });
    wx.request({
      url: 'http://127.0.0.1:3000',
      method: 'POST',
      success: function (data) {
        console.log(data);
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
