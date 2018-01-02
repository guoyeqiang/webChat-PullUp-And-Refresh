var app = getApp(),
  comm = require("../uitls/comm.js"),
  isFirstLoad = true,//判断是否为第一次加载或者为一次点击
  start = 0, count = 10;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabMenus: [
      {
        "moviesType": "Top250",
        "isFirstClick": true
      },
      {
        "moviesType": "即将上映",
        "isFirstClick": false
      }
    ],  //tabMeuns数据，可以后台传
    listIdx: 0,  // 初始默认数据列表显示第一个
    movies: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success:res=>{
        this.setData({
          viewHeight:res.windowHeight
        })
      }
    })
    comm.http(app.globalData.moviesUrl + "/v2/movie/top250", { "start": start, "count": count }, "GET", this.getData);
  },
  tabMenuClick: function (e) {
    isFirstLoad = true, start = 0, count = 10;
    this.setData({
      listIdx: e.target.dataset.tabmenuindex,
      movies: [],
      isLoadFinished: false
    }, () => {
      comm.http(app.globalData.moviesUrl + this.istabMenuNumber(this.data.listIdx), { "start": start, "count": count }, "GET", this.getData);
    })
  },

  refreshLists: function () {
    isFirstLoad = true, start = 0, count = 10;
    console.log("下拉刷新开始")
    this.setData({
      movies: [],
      isLoadFinished: false
    }, () => {
      comm.http(app.globalData.moviesUrl + this.istabMenuNumber(this.data.listIdx), { "start": start, "count": count }, "GET", this.getData);
      console.log("下拉刷新结束")
    })
    wx.stopPullDownRefresh();
  },

  loadLists: function () {
    console.log("上拉加载开始");
    console.log("下拉刷新执行了上拉加载了吗？");
    comm.http(app.globalData.moviesUrl + this.istabMenuNumber(this.data.listIdx), { "start": start, "count": count }, "GET", this.getData);
    console.log("上拉加载结束");
  },

  //请求到数据处理
  getData: function (res) {
    var movies = [], getMovies = [];
    getMovies = res.data.subjects;
    if (getMovies == [] || getMovies == '' || getMovies == undefined) {
      this.setData({
        isLoadFinished: true
      })
    } else {
      for (var idx in getMovies) {
        var subject = getMovies[idx];
        var temp = {
          imgSrc: subject.images.small,
          title: subject.title
        }
        movies.push(temp);
      }
      var totalDatas = {};
      if (isFirstLoad) {
        totalDatas = movies;
      } else {
        totalDatas = this.data.movies.concat(movies);
      }
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
      start += count;
      wx.hideToast();
      this.setData({
        movies: totalDatas
      })
    }

  },
  //点击不同标签发起不同链接
  istabMenuNumber: function (number) {
    var movieTypeUrl = "";
    switch (number) {
      case 0:
        movieTypeUrl = "/v2/movie/top250";
        break;
      case 1:
        movieTypeUrl = "/v2/movie/coming_soon";
        break;
    }
    return movieTypeUrl;
  }
})