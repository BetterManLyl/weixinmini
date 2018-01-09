// pages/movies/movie-more/movie-more.js
var util = require('../../../utils/util.js');
var that;
var app = getApp();
var more;
//更多电影
Page({
  /**
   * 页面的初始数据
   */
  data: {
    movies: {},
    dataUrl: "",
    totalCount: 0,
    isEmpty: true,
    scrollHeight: 0,
    movieId: 0,
    totalMovies: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });

    //获取上个页面传递的数据
    more = options.more;
    var inTheatersUrl = app.globalData.doubanBase +
      "/v2/movie/in_theaters";
    var beAboutToMovie = app.globalData.doubanBase +
      "/v2/movie/coming_soon";
    var top250 = app.globalData.doubanBase +
      "/v2/movie/top250";
    //判断title是否包含字符串 加载不同的 url
    if (more.indexOf('正在') >= 0) {
      this.data.dataUrl = inTheatersUrl;
      this.getMovieList(inTheatersUrl);
    }
    if (more.indexOf('即将') >= 0) {
      this.data.dataUrl = beAboutToMovie;
      this.getMovieList(beAboutToMovie);

    }
    if (more.indexOf('豆瓣') >= 0) {
      this.data.dataUrl = top250;
      this.getMovieList(top250);
    }
  },

  //在onReady()生命周期里面设置
  onReady: function () {
    //动态设置标题栏的内容
    wx.setNavigationBarTitle({
      title: more,
    })
  },


  //两种方法金进行下拉加载更多
  //1、加载更多
  // onScrollLower: function () {
  //   console.log("onScrollLower");
  //   //拼接刷新的 url
  //   var nextUrl = this.data.dataUrl + "?start=" + this.data.totalCount + "&count=20";
  //   util.http(nextUrl, this.setDataList)
  //   wx.showNavigationBarLoading();
  // },

  //2、上拉到底部监听事件，用于加载更多
  onReachBottom: function () {
    wx.showNavigationBarLoading();
    console.log('上拉到底的操作');
    var nextUrl = this.data.dataUrl + "?start=" + this.data.totalCount + "&count=20";
    util.http(nextUrl, this.setDataList)

  },
  movielist: function (event) {
    var movieId = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: '../movie-detail/movie-detail?id=' + movieId,
    })
  },

  //下拉刷新
  onPullDownRefresh: function () {
    console.log('下拉刷新页面');
    var nextUrl = this.data.dataUrl + "?star=0&count=20";
    this.data.movies = {};
    this.data.totalCount = 0;
    this.data.isEmpty = true;
    util.http(nextUrl, this.setDataList)
  },

  getMovieList: function (url) {
    wx.showNavigationBarLoading();
    util.http(url, this.setDataList)
  },
  setDataList: function (movies) {
    var moviesData = [];
    //获取电影总个数
    this.setData({
      totalMovies: movies.total
    })
    for (var i = 0; i < movies.subjects.length; i++) {
      //获取某个电影信息
      var sucject = movies.subjects[i];
      //获取电影名
      var title = sucject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      var movie = {
        stars: util.convertToStarsArray(sucject.rating.stars),
        title: title,
        average: sucject.rating.average,
        coverageUrl: sucject.images.large,
        movieId: sucject.id,
      }
      moviesData.push(movie);
    }
    //重新定义一个movies集合totalMovies  isEmpty用来判断是否是第一次加载数据
    //如果不是第一次加载数据 那么将 moviesData 合并进 totalMovies 里面
    //如果是第一次加载数据 直接 totalMovies = moviesData  并将 isEmpty设为false
    var totalMovies = {};
    if (!this.data.isEmpty) {
      totalMovies = this.data.movies.concat(moviesData);
    } else {
      totalMovies = moviesData;
      this.data.isEmpty = false;
    }
    this.setData({
      movies: totalMovies
    })
    this.data.totalCount += 20;
  
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  }
})