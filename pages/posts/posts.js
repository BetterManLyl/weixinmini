
var app = getApp();
var postData = require('../../data/posts-data.js');
//var postsData = require('/data/posts-data.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postkey:{}
  },

  /**
   * 生命周期函数--监听页面加载
   * 
   * 向服务器请求数据
   */
  onLoad: function (options) {
    //this.data.postList = postData.postList
    //这里设置数据的时候 需要设置成    key:value    的形式
    this.setData({
      postkey: postData.postList
    });
  },

  //item点击事件
  onPost: function (event) {


    var postId = event.currentTarget.dataset.postid;

    
    wx.navigateTo({
      //带值跳转到下个页面
      url: 'post-detail/post-detail?id=' + postId,
      success: function () {

      },
      fail: function () {
        console.log('出错了')
      }
    })
  },
  
  swiper: function (event) {
    //target和currentTarget
    //target指的是当前点击的组件   currentTarget指的是事件捕获的组件
    //target这里指的是image   currentTarget指的是swiper
    var postid = event.target.dataset.postid;
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postid,
    })
  }
})