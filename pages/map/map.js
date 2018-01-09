// pages/map/map.js
// 引入SDK核心类
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;
var that;
var marks=[];
var makr={};
Page({
  /**
   * 页面的初始数据
   */
  data: {
    latitude: "",
    longitude: "",
    markers: [],
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'B3VBZ-UGO3X-JJI4C-ZNUJD-WGXHZ-FBFPD'
    });

    var latitude = options.latitude
    var longitude = options.longitude
    this.setData({
      latitude: '40.006822',
      longitude: '116.481451',
      circles: [
        {
          latitude: '40.006822',
          longitude: '116.481451',
          color: '#FF0000',
          fillColor: '#7cb5ec88',
          radius: 300,
          strokeWidth: 1
        }
      ],
      polyline: [{
        points: [{
          longitude: '116.481451',
          latitude: '40.006822'
        }, {
          longitude: '116.487847',
          latitude: '40.002607'
        }, {
          longitude: '116.496507',
          latitude: '40.006103'
        }],
        color: "#FF0000DD",
        width: 3,
        dottedLine: false
      }],
      controls: [{
        id: 1,
        iconPath: '/image/4.png',
        position: {
          left: 0,
          top: 300 - 50,
          width: 20,
          height: 20
        },
        clickable: true
      }]
    })

  },
  
  markTap: function () {
    console.log('点击了marks');
  },
  controltap:function(e){
    
    console.log('点击了控件:' + e.controlId);
  },
 onShow:function(){
   // 调用接口
   qqmapsdk.search({
     keyword: '酒店',
     success: function (res) {
       for(var i=0;i<res.data.length;i++){
          makr={
           iconPath: "/image/marks.png",
           id: i,
           latitude: res.data[i].location.lat,
           longitude: res.data[i].location.lng,
           width: 20,
           height: 20
         }
         marks.push(makr);
       }
       that.setData({
         markers: marks,
       })
       console.log(res);
     },
     fail: function (res) {
       console.log(res);
     },
     complete: function (res) {
       console.log(res);
     }
   });
 }
    

})