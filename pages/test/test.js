
var initData = 'this is first line\nthis is second line'
var extraLine = [];

Page({
  /**
   * 页面的初始数据
   */
  data: {
    array: ['美国', '中国', '巴西', '日本'],
    test:false,
    myobject:{  
      obj:"测试"
    },
    //为false时不显示，为true时显示
    showContent:false,
    array:[1,2,3],
    objectArray: [
      {
        id: 0,
        name: '美国'
      },
      {
        id: 1,
        name: '中国'
      },
      {
        id: 2,
        name: '巴西'
      },
      {
        id: 3,
        name: '日本'
      }
    ],
    index: 0,
    multiArray: [['无脊柱动物', '脊柱动物'], ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'], ['猪肉绦虫', '吸血虫']],
    objectMultiArray: [
      [
        {
          id: 0,
          name: '无脊柱动物'
        },
        {
          id: 1,
          name: '脊柱动物'
        }
      ], [
        {
          id: 0,
          name: '扁性动物'
        },
        {
          id: 1,
          name: '线形动物'
        },
        {
          id: 2,
          name: '环节动物'
        },
        {
          id: 3,
          name: '软体动物'
        },
        {
          id: 3,
          name: '节肢动物'
        }
      ], [
        {
          id: 0,
          name: '猪肉绦虫'
        },
        {
          id: 1,
          name: '吸血虫'
        }
      ]
    ],
    multiIndex: [0, 0, 0],
    date: '2016-09-01',
    time: '12:01',
    region: ['广东省', '广州市', '海珠区'],
    customItem: '全部',
    iconType: ['success', 'success_no_circle', 'info', 'warn', 'waiting', 'cancel', 'download', 'search', 'clear'],

    iconSize: [20, 30, 40, 50, 60, 70],

    color: ['red', 'orange', 'yellow', 'green', 'rgb(0,255,255)', 'blue', 'purple'],
    text: initData,
    ischecked:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  formReset: function () {
    console.log('form发生了reset事件')
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var mapid = "myMap";
    var map = "";
    var map;
    this.map = wx.createMapContext(mapid)
    //设置加载动画
    wx.showNavigationBarLoading()

    //取消加载动画
    setTimeout(function () {
      wx.hideNavigationBarLoading()
    }, 2000)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //设置当前页面标题
    wx.setNavigationBarTitle({
      title: '当前页面'
    })

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
  //本地保存数据
  storage: function () {
    //这是一个异步接口
    wx.setStorage({
      key: 'lyl',
      data: 'cml',
      success: function () {
      }
    })
  },
  getstorage: function () {
    wx.getStorage({
      key: 'lyl',
      success: function (res) {
        wx.showModal({
          title: '获取保存的数据',
          content: res.data,
        })
      },
    })
  },
  //获取当前地理位置
  getCurrentPosition: function () {
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude;//纬度
        var longitude = res.longitude;//经度
        var speed = res.speed;//速度
        var altitude = res.altitude;//高度
        var accuracy = res.accuracy;//位置的精确度
        wx.showModal({
          title: '获取位置的信息',
          content: latitude + "-" + longitude + "-" + speed + "-" + altitude + "-" + accuracy
        })
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
        })
      }
    })
  },
  // 打开地图选择位置。
  setLocation: function () {
    wx.chooseLocation({
    })
  },
  getCenterLocation: function () {
    this.map.getCenterLocation({
      success: function (res) {
        console.log(res.longitude)
        console.log(res.latitude)
        wx.showModal({
          title: res.longitude + '',
          content: res.latitude + '',

        })
      }
    })
  },
  moveToLocation: function () {
    this.map.moveToLocation()
  },
  translateMarker: function () {
    this.map.translateMarker({
      markerId: 0,
      autoRotate: true,
      duration: 1000,
      destination: {
        latitude: 23.10229,
        longitude: 113.3345211,
      },
      animationEnd() {
        console.log('animation end')
      }
    })
  },
  //获取系统消息
  getSystemInfo: function () {
    wx.getSystemInfo({
      success: function (res) {
        res.version;
        res.model;
        res.brand;
        wx.showModal({
          title: '手机信息',
          content: res.version + "-" + res.model + "-" + res.brand,
        })
      },
    })
  },
  //打电话
  callPhone: function () {

    wx.makePhoneCall({
      phoneNumber: '18326897225',
    })
  },
  //扫描二维码
  scanCode: function () {
    wx.scanCode({
      success: function (res) {
        wx.showModal({
          title: '扫码结果',
          content: res.result,
        })
      }
    })
  },
  setlight: function () {
    wx.setScreenBrightness({
      value: 9,
    })
  },
  //显示toast
  showToast: function () {
    wx.showToast({
      title: 'showtoast',
      icon: 'success',
      duration: 1500

    })
  },
  //显示加载框以及设置取消时间
  showDialog: function () {
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(function () {
      wx.hideLoading();
    }, 2000)
  },
  //添加一行
  add: function () {
    //添加元素
    extraLine.push('other line');
    this.setData({
      text: initData + '\n' + extraLine.join('\n')
    })
  },

  //删除一行
  remove: function () {
    if (extraLine.length > 0) {
      //删除元素
      extraLine.pop();
      this.setData({
        text: initData + '\n' + extraLine.join('\n')
      })
    }
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'];
            data.multiArray[2] = ['猪肉绦虫', '吸血虫'];
            break;
          case 1:
            data.multiArray[1] = ['鱼', '两栖动物', '爬行动物'];
            data.multiArray[2] = ['鲫鱼', '带鱼'];
            break;
        }
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;
      case 1:
        switch (data.multiIndex[0]) {
          case 0:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['猪肉绦虫', '吸血虫'];
                break;
              case 1:
                data.multiArray[2] = ['蛔虫'];
                break;
              case 2:
                data.multiArray[2] = ['蚂蚁', '蚂蟥'];
                break;
              case 3:
                data.multiArray[2] = ['河蚌', '蜗牛', '蛞蝓'];
                break;
              case 4:
                data.multiArray[2] = ['昆虫', '甲壳动物', '蛛形动物', '多足动物'];
                break;
            }
            break;
          case 1:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['鲫鱼', '带鱼'];
                break;
              case 1:
                data.multiArray[2] = ['青蛙', '娃娃鱼'];
                break;
              case 2:
                data.multiArray[2] = ['蜥蜴', '龟', '壁虎'];
                break;
            }
            break;
        }
        data.multiIndex[2] = 0;
        console.log(data.multiIndex);
        break;
    }
    this.setData(data);
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  }
})


