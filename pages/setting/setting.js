// pages/setting/setting.js
var latitude;
var longitude;
var that;
var speed;
Page({

  /**
   * 页面的初始数据
   */
  data: {

    userInfo: {

    },
    contentArray:
    [
      '缓存清理', '系统信息', '网络状态', '地图显示', '当前位置、速度', '摇一摇', '扫描二维码', '画布'
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    that.getUser();
    //监听网络状态的改变
    wx.onNetworkStatusChange(function (res) {
      console.log(res.isConnected)
      console.log(res.networkType)
    }),
      wx.getLocation({
        type: 'wgs84',
        success: function (res) {
          latitude = res.latitude;
          longitude = res.longitude;
          speed = res.speed;
        },
      })
  },
  //清除缓存
  bindtap0: function () {
    wx.showModal({
      title: '是否清除缓存',
      content: '请谨慎操作，清理完成后将无法恢复',
      success: function (res) {
        if (res.confirm) {
          wx.clearStorage();
        }
      }
    })
  },
  //获取系统信息
  bindtap1: function () {
    wx.getSystemInfo({
      success: function (res) {
        wx.showModal({
          title: '获取手机信息',
          content: "手机品牌:" + res.brand + "\n"
          + "微信设置的语言:" + res.language + "\n"
          + "字体大小:" + res.fontSizeSetting + "\n"
          + "手机型号:" + res.model + "\n"
          + "客户端平台:" + res.platform + "\n"
          + "微信版本号:" + res.version + "\n"
          + "操作系统版本:" + res.system,
        })
      },
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (options) {
    if (options.from === 'button') {
      // 来自页面内转发按钮
      console.log(options.target)
    }
    return {
      title: '转发',
      path: '/pages/setting/setting',
      success: function (res) {
        console.log('转发成功')
      },
      fail: function (res) {
        console.log('转发失败')
      }
    }
  },
  //获取用户信息
  getUser: function () {
    wx.getSetting({
      success: function (res) {
        if (!res.authSetting['scope.userInfo']) {
          //获取 获取用户信息的权限
          wx.authorize({
            scope: 'scope.userInfo',
            success: function (res) {
              console.log('成功')
              wx.getUserInfo({
                success: function (res) {
                  var userInfo = res.userInfo
                  // var nickName = userInfo.nickName
                  // var avatarUrl = userInfo.avatarUrl
                  // var gender = userInfo.gender //性别 0：未知、1：男、2：女
                  // var province = userInfo.province
                  // var city = userInfo.city
                  // var country = userInfo.country
                  that.setData({
                    userInfo: userInfo
                  })
                }
              })
            },
            fail: function () {
              console.log('失败')
              // 调用微信弹窗接口
              wx.showModal({
                title: '警告',
                content: '您点击了拒绝授权，将无法正常使用******的功能体验。请10分钟后再次点击授权，或者删除小程序重新进入。',
                success: function (res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                  }
                }
              })

            },
            complete: function () {
              console.log('完成')
            }
          })
        } else {
          console.log('失败')
          wx.authorize({
            scope: 'scope.userInfo',
            success: function (res) {
              console.log('成功')
              wx.getUserInfo({
                success: function (res) {
                  var userInfo = res.userInfo
                  // var nickName = userInfo.nickName
                  // var avatarUrl = userInfo.avatarUrl
                  // var gender = userInfo.gender //性别 0：未知、1：男、2：女
                  // var province = userInfo.province
                  // var city = userInfo.city
                  // var country = userInfo.country
                  that.setData({
                    userInfo: userInfo
                  })
                }
              })
            },
            fail: function () {
              console.log('失败')
              // 调用微信弹窗接口
              wx.showModal({
                title: '警告',
                content: '您点击了拒绝授权，将无法正常使用******的功能体验。请10分钟后再次点击授权，或者删除小程序重新进入。',
                success: function (res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                  }
                }
              })

            },
            complete: function () {
              console.log('完成')
            }
          })
        }
      }
    })


  },
  //获取网络状态
  bindtap2: function () {
    wx.getNetworkType({
      success: function (res) {
        wx.showModal({
          title: '当前网络状态',
          content: res.networkType,
        })

      },
    })
  },
  //地图显示
  onMapView: function () {

  },
  // bindtap4: function () {
  //   console.log("res.direction")
  //   wx.onCompassChange(function (res) {
  //     console.log(res.direction)
  //   })
  // },

  bindtap3: function () {

    wx.navigateTo({
      url: '../map/map?latitude=' + latitude + "&longitude=" + longitude,
    })
  },
  //速度
  bindtap4: function () {
    wx.showModal({
      title: '当前的位置和速度',
      content: '当前的位置:' + latitude + "\n" + longitude + "\n" + "当前的速度:" + speed,
    })

  },
  //摇一摇
  bindtap5: function () {
    wx.vibrateLong({

    })

  },

  //扫描二维码
  bindtap6: function () {
    //设置只能从相机扫描
    onlyFromCamera: false
    wx.scanCode({
      success: function (res) {
        console.log(res.result)
      }
    })
  }
  ,
  bindtap7: function () {
    wx.navigateTo({
      url: '../canvas/canvas'
    })
  },

  share: function () {

  },

})

