// pages/welcome/welcome.js
//获取页面栈

Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: "hello world"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
   //跳转到首页 使用switchTab 并且是带有tab的首页跳转，不然会出现跳转不成功
  //注意：为了不让用户在使用小程序时造成困扰，我们规定页面路径只能是五层，请尽量避免多层级的交互方式。
  skip: function () {
    wx.switchTab({
      url: '../posts/posts',
      success: function (res) { },
      fail: function (res) {
        console.log(res.data);
        console.log('出错了');
      },
      complete: function (res) { },
    })
  },
})
