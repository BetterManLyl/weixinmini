//app.js
App({
	
	
  onLaunch: function (options) {
   
    console.log('app launch')
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    console.log("打开小程序的路径：" + options.path);
    console.log("获取小程序的场景值" + options.scene)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  onShow: function () {
    console.log('App Show')
  },
  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
    wx.setTopBarText({
      text: "hello " + this.globalData.userInfo.nickName,
      success: function (res) {
        console.log(res);
      },
      fail: function (res) {
        console.log(res);
      }
    });
  },
  onShow: function (path) {
    console.log('小程序开始了');
  },
  globalData: {
    userInfo: null
  },
  onError: function () {
    console.log('小程序出错了');
  },
  convertToStarsArray: function (stars) {
    var num = stars.toString().substring(0, 1);
    var array = [];
    for (var i = 1; i <= 5; i++) {
      if (i <= num) {
        array.push(1);
      }
      else {
        array.push(0);
      }
    }
    return array;
  },
  globalData: {
    g_isPlayingMusic: false,
    g_currentMusicPostId: null,
    doubanBase: "https://api.douban.com",
  }
})
