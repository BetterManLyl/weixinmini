// pages/movies/movies.js
var util = require('../../utils/util.js');
var app = getApp();
var that;
var titleType;//表示电影的类型 
var text;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    inTheaters: {},
    beAboutToMovie: {},
    top250: {},
    searchResult: {},
    conntainerShow: true,
    searchPannelShow: false,
    cancelImage: false,
    searchInput: '',
    totalCount: 0,
    isEmpty: true,

    movies: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //三个电影api  1、正在热映  2、即将上映  3、top250
    //使用全局的变量   app.doubanBase  获取前面的地址
    var inTheatersUrl = app.globalData.doubanBase +
      "/v2/movie/in_theaters" + "?start=0&count=3";
    var beAboutToMovie = app.globalData.doubanBase +
      "/v2/movie/coming_soon" + "?start=0&count=3";
    var top250 = app.globalData.doubanBase +
      "/v2/movie/top250" + "?start=0&count=3";
    //调用封装的方法
    this.getMovieListData(inTheatersUrl, "inTheaters");
    this.getMovieListData(beAboutToMovie, "beAboutToMovie");
    this.getMovieListData(top250, "top250");
  },

//输入框获取焦点触发事件
  onBindFoucus: function () {
    console.log("获取焦点");
    this.setData({
      conntainerShow: false,
      searchPannelShow: true,
      cancelImage: true
    })
  },
  
  bindblur: function (event) {
    console.log("失去焦点");
    text = event.detail.value;
    this.data.isEmpty = true;
    var searchUrl = app.globalData.doubanBase +
      "/v2/movie/search?q=" + text;
    this.getMovieListData(searchUrl, "searchResult");
    console.log("test" + text);

  },
  //取消搜索
  onCancel: function () {
    console.log("onCancel");
    this.setData({
      conntainerShow: true,
      searchPannelShow: false,
      cancelImage: false,
      searchInput: '',
      searchResult: {}
    })
  },
  //判断是否到底
  onReachBottom: function () {
    if (this.data.searchPannelShow) {
      wx.showNavigationBarLoading();
      var searchUrl = app.globalData.doubanBase +
        "/v2/movie/search?q=" + text + "&start=" + this.data.totalCount + "&count=20";
      this.getMovieListData(searchUrl, "searchResult");
      console.log("test" + text);
    }

  },
  movielist:function(event){
    var movieId=event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: 'movie-detail/movie-detail?id='+movieId,
    })
  },
  //下拉刷新
  // onPullDownRefresh: function () {
  //   if (this.data.searchPannelShow) {
  //     console.log('下拉刷新页面');
  //     var searchUrl = app.globalData.doubanBase +
  //       "/v2/movie/search?q=" + text;
  //     this.data.searchResult.movies = {};
  //     this.data.totalCount = 0;
  //     this.data.isEmpty = true;
  //     this.getMovieListData(searchUrl, "searchResult");
  //   } else {
  //     wx.stopPullDownRefresh();
  //   }
  // },
  //点击更多跳转
  moremoview: function (event) {
    var more = event.currentTarget.dataset.more;
    console.log("更多" + more);
    //跳转到更多电影页面
    wx.navigateTo({
      url: 'movie-more/movie-more?more=' + more,
    })
  },
  //封装请求的方法
  getMovieListData: function (url, movieType) {
    that = this;
    //请求接口/
    wx.request({
      url: url,
      method: "GET", //请求方法类型
      header: {
        'content-type': 'application/xml' // 默认值  不能使用application/json
      },
      //成功的回调
      success: function (res) {
        console.log(res.data)
        that.procressMoviesData(res.data, movieType);
      },
      //失败的回调
      fail: function (res) {
        console.log('失败')
      },
    })
  },

  //获取电影信息
  procressMoviesData: function (movieData, movieType) {
    var movies = [];
    //电影类型
    titleType = movieData.title;
    //电影总个数
    this.data.count = movieData.total;
    //循环遍历三个电影
    for (var idx in movieData.subjects) {
      //获取某个电影信息
      var sucject = movieData.subjects[idx];
      //获取电影名
      var title = sucject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      //定义一个变量，将需要用的数据放进去，然后在放进movies数组里面
      var temp = {
        stars: util.convertToStarsArray(sucject.rating.stars),
        title: title,
        average: sucject.rating.average,
        coverageUrl: sucject.images.large,
        movieId: sucject.id,
      }
      //将temp变量放进movies数组里面
      movies.push(temp);
    }
    //设置数据  在这里就不需要使用 that.setData({});了  直接使用this
    var readData = {

    };
    //搜索时
    if (this.data.searchPannelShow) {
      var totalMovies = {};
      if (!this.data.isEmpty) {
        totalMovies = this.data.searchResult.movies.concat(movies);
      } else {
        totalMovies = movies;
        this.data.isEmpty = false;
      }
      readData[movieType] = {
        title: titleType,
        movies: totalMovies
      }
      this.setData(readData);
      this.data.totalCount += 20;
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
    } else {
      //如何区分不同的电影类型，并分别放在不同的template里面
      readData[movieType] = {
        title: titleType,
        movies: movies
      }
      this.setData(readData);
    }
  }
})