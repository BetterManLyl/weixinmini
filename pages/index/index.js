//index.js
//获取应用实例
/**
 * Ctrl+S：保存文件
　　Ctrl+[， Ctrl+]：代码行缩进
　　Ctrl+Shift+[， Ctrl+Shift+]：折叠打开代码块
　　Ctrl+C Ctrl+V：复制粘贴，如果没有选中任何文字则复制粘贴一行
　　Shift+Alt+F：代码格式化
　　Alt+Up，Alt+Down：上下移动一行
　　Shift+Alt+Up，Shift+Alt+Down：向上向下复制一行
　　Ctrl+Shift+Enter：在当前行上方插入一行
 */
//获取全局的app变量
const app = getApp()
var flag = true;
var color = 'window-red';//需要声明变量
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    color: '#ff0f00',
    test: "test",
    array: [1, 2, 3, 4, 5],
    data: 'WEBVIEW',
    //字符串类型和数字类型不一样，注意
    count: 1,
    a: 1, b: 2, c: 3, length: 6, zero: 5,
    array: [{
      message: 'foo'
    }, {
      message: 'bar'
    }],
    condition: "true",
    item: {
      index: 0,
      msg: 'this is a template',
      time: '2016-09-15',
    },
    src: '',
    count: 0

  },

  tapName: function (event) {
    console.log(event);
    wx.getBackgroundAudioPlayerState({
      success: function (res) {
        var status = res.status;
        wx.showModal({
          title: '获取当前后台播放音乐的状态',
          content: status,
          showCancel: true,
        })
      },
      fail: function () {
        wx.showModal({
          title: '失败',
          content: '失败',
          showCancel: true,
        })
      }
    })
    //录音
    // wx.startRecord({
    //   success: function (res) {
    //     var tempFilePath = res.tempFilePath
    //     console.log(tempFilePath);
    //   },
    //   fail: function (res) {

    //   }
    // })
    // //设置录音的时间
    // setTimeout(function () {
    //   wx.stopRecord()
    // }, 10000)
  },
  click: function () {
    console.log('点击了文字')
    if (flag) {
      color = 'window-red';
      flag = false;
    } else {
      color = 'window';
      flag = true;
    }
    this.setData({
      color
    });
    console.log(app.glibalData);

    //调用全局的方法
    app.say();
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    //判断是否支持该功能
    if (wx.openBluetoothAdapter) {
      wx.openBluetoothAdapter();
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能',
      })
    }

  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onReady: function () {
    console.log('index,onReady')
    this.audioCtx = wx.createAudioContext('myAudio')
    this.audioCtx.setSrc('http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46')
    this.videoContext = wx.createVideoContext('myVideo')
  },
  //点击右上角分享方法
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      console.log('来自转发内按钮');
    }
    //此事件需要 return 一个 Object，用于自定义转发内容
    // return{
    //   title:"分享",
    //   path: '/page/user?id=123'
    // }
    console.log('点击了分享');

  },
  //下拉刷新监听事件
  onPullDownRefresh: function () {  
    if (flag) {
      color = 'window-red';
      flag = false;
    } else {
      color = 'window';
      flag = true;
    }
    this.setData({
      color
    });
    wx.stopPullDownRefresh();
    console.log('监听用户下拉动作');
  },
  //上拉到底部监听事件
  onReachBottom: function () {
    console.log('上拉到底的操作');
  },
  clickme: function () {
    //点击跳转到log日志页面
    // wx.navigateTo({
    //   url: '../logs/logs'
    // }),

    //请求
    wx.request({
      url: 'https://76760340.qcloud.la',
      data: {
        // userName: 'Ff1',
        // password: '888888'
      },
      method: 'post',
      fail: function (res) {
        console.log("请求失败");
      },
      success: function (res) {
        console.log("请求数据"+res.data);
        console.log("请求返回码"+res.statusCode);
      },
      complete: function () {
        console.log("请求结束");
      }
    })

    //选择图片
    wx.chooseImage({
      count: 3,
      success: function (res) {
        var tempFilePaths = res.tempFilePaths[0]
        //提示照片路径
        wx.showModal({
          title: '提示',
          content: tempFilePaths,
        })
        wx.getImageInfo({
          src: res.tempFilePaths[0],
          success: function (res) {
            console.log(res.height);
            console.log(res.width);
          }
        })
      },
      sourceType: ['album', 'camera'],
      sizeType: ['original', 'compressed'],
    })
  },

  add: function (e) {
    this.setData({
      count: this.data.count + 1
    })
  },
  //播放音乐
  playMusic: function () {

    this.audioCtx.play()
  },
  //暂停音乐
  pauseMusic: function () {

    this.audioCtx.pause()
  },
  //设置播放进度 单位s
  pause14Music: function () {
    this.audioCtx.seek(14)
  },
  //回到开头
  resetMusic: function () {
    this.audioCtx.seek(0)
  },
  videoPlay: function () {
    var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success: function (res) {
        that.setData({
          src: res.tempFilePath
        });
      }
    })
  },
  inputValue: '',
  bindInputBlur: function (e) {
    this.inputValue = e.detail.value
  },
  bindSendDanmu: function () {
    this.videoContext.sendDanmu({
      text: this.inputValue,
      color: getRandomColor()
    })
  },
  saveFile: function () {
    wx.chooseImage({
      success: function (res) {
        var file = res.tempFilePaths
        wx.saveFile({
          tempFilePath: file[0],
          success: function (res) {
            var savedFilePath = res.savedFilePath
            wx.showModal({
              title: '保存文件的路径为',
              content: savedFilePath,
            })
          }
        })
      },
    })
  },
  countClick: function () {
    this.setData({
     count: this.data.count+1
    })
  },
  //获取本地保存文件的列表
  getSaveList: function () {
    wx.getSavedFileList({
      success: function (res) {
        res.fileList;
        console.log('本地保存文件的列表' + res.fileList);
        //获取本地文件的文件信息
        wx.getSavedFileInfo({
          filePath: res.fileList[0].filePath,
          success: function (res) {
            res.createTime;
            wx.showModal({
              title: '本地保存文件的信息',
              content: res.createTime + '',
            })
          },
          fail: function () {
            wx.showModal({
              title: '本地保存文件的信息',
              content: '失败',
            })
          }
        })
        // wx.showModal({
        //   title: '本地保存文件的列表',
        //   content: res.fileList[0].filePath,
        // })
      },
      fail: function () {
        wx.showModal({
          title: '本地保存文件的列表',
          content: '失败',
        })
      }
    })
  }
})
function getRandomColor() {
  let rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}
