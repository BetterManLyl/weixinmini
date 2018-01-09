
//引入外部的js
var postsData = require('../../../data/posts-data.js');
var postid;
var postData;
var that;
//获取全局app
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlay: true,
    currentPostId: "",
  },

  /**
   * 生命周期函数--监听页面加载
   * 
   * 向服务器请求数据
   * 
   * 接收上个页面传过来的数据
   */
  onLoad: function (options) {
    //清理所有缓存  缓存的上线不能超过10M
    //wx.clearStorage();
    //打印日志
    console.log('onLoad');
    that = this;
    //获取上个页面传过来的值
    postid = options.id;
    this.data.currentPostId = postid;
    //根据id获取数据
    postData = postsData.postList[postid];
    //设置数据
    this.setData({
      postkey: postData,

    })


    //获取本地缓存的数据
    wx.getStorageInfo({
      success: function (res) {
        for (var i = 0; i < res.keys.length; i++) {
          if (res.keys[i] == postid) {
            that.setData({
              isCollected: true
            })
            return;
          } else {
            that.setData({
              isCollected: false
            })
          }
        }
      },
    }),
      //获取后台音乐播放的状态
      wx.getBackgroundAudioPlayerState({
        success: function (res) {
          var state = res.status;
          //播放状态（2：没有音乐在播放，1：播放中，0：暂停中）
          if (state == 2) {
            that.setData({
              isPlay: true
            })
          } else {
            // var pages = getCurrentPages();
            // var currentPage = pages[pages.length - 1];
            // if (currentPage.data.currentPostId === that.data.currentPostId) {
            // 打开多个post-detail页面后，每个页面不会关闭，只会隐藏。通过页面栈拿到到
            // 当前页面的postid，只处理当前页面的音乐播放。
            if (app.globalData.g_currentMusicPostId == that.data.currentPostId) {
              // 播放当前页面音乐才改变图标
              that.data.postkey.headImgSrc = postData.music.coverImg
              that.setData({
                isPlay: false,
                postkey: that.data.postkey,
              })
            } else {
              wx.stopBackgroundAudio();
              that.setData({
                isPlay: false
              })
            }
          }
          // }
        },
        fail: function (res) {
          console.log('获取后台音乐失败');
        }
      }),

wx.onBackgroundAudioPause(function(){
      that.data.postkey.headImgSrc = postData.headImgSrc
      that.setData({
        isPlay: true,
        postkey: that.data.postkey,
      })
}),
wx.onBackgroundAudioPlay(function(){
      that.data.postkey.headImgSrc = postData.music.coverImg
      that.setData({
        isPlay: false,
        postkey: that.data.postkey,
      })
}),
      //监听音乐停止
      wx.onBackgroundAudioStop(function () {
        that.setData({
          isPlay: true
        })
        console.log('播放结束')
        that.data.postkey.headImgSrc = postData.headImgSrc
        that.setData({
          postkey: that.data.postkey,
        })
      });
  },
  //播放音乐
  playMusic: function (res) {
    var isPlayMusic = this.data.isPlay;
    if (!isPlayMusic) {
      //暂停音乐
      wx.pauseBackgroundAudio();
      console.log('暂停');
      that.data.postkey.headImgSrc = postData.headImgSrc
      this.setData({
        isPlay: true,
        postkey: that.data.postkey,
      })
    } else {
      //播放音乐
      wx.playBackgroundAudio({
        dataUrl: postData.music.url,
        title: postData.music.title,
        coverImgUrl: postData.music.coverImg,
        success: function (res) {
          console.log('播放');
          that.data.postkey.headImgSrc = postData.music.coverImg
          that.setData({
            postkey: that.data.postkey,
          })
        },
        fail: function () {
          console.log('失败');
        }
      })
     
     
      app.globalData.g_currentMusicPostId = this.data.currentPostId;
    }
  },

  //收藏
  collection: function () {
    //获取缓存的全部key值
    wx.getStorageInfo({
      success: function (res) {
        if (res.keys.length == 0) {
          wx.setStorage({
            key: postid,
            data: "1",
          })
          that.showToast('收藏成功');
          that.setData({
            isCollected: true
          })
        } else {
          for (var i = 0; i < res.keys.length; i++) {
            if (res.keys[i] == postid) {
              //定义一个复用的方法
              //that.showToast('已经收藏');
              wx.showModal({
                title: '已经收藏',
                content: '是否取消收藏',
                success: function (res) {
                  //点击确定按钮触发
                  if (res.confirm) {
                    wx.removeStorage({
                      key: postid,
                      success: function (res) {
                        that.setData({
                          isCollected: false
                        })
                      },
                    })
                  }
                }
              })
              return;
            } else {
              wx.setStorage({
                key: postid,
                data: "1",
              })
              that.showToast('收藏成功');
              that.setData({
                isCollected: true
              })
            }
          }
        }
      },
    })
  },
  //复用的方法
  showToast: function (message) {
    wx.showToast({
      title: message,
      icon: 'success',
      duration: 2000
    })

  },
  //分享
  share: function (event) {
    var itemList = [
      "分享给微信好友",
      "分享到朋友圈",
      "分享到qq",
      "分享到微博"
    ];
    wx.showActionSheet({
      itemList: itemList,
      itemColor: "#405f80",
      success: function (res) {
        wx.showModal({
          title: '用户' + itemList[res.tapIndex],
          content: '用户是否取消?' + '现在无法实现分享，什么时候能支持呢',
          success: function (res) {
            if (res.confirm) {
              console.log('确认')
            }
            if (res.cancel) {
              console.log('取消')
            }
          }
        })
      }
    })
  },
  onShareAppMessage: function (options) {
    if (options.from === "button") {
      // 来自页面内转发按钮
      console.log(options.target)
    } return {
      title: '测试转发',
      path: '/pages/posts/post-detail/post-detail?id=4',
      success: function (res) {
        // 转发成功
        console.log("转发成功")
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败")
      }
    }
  },

})