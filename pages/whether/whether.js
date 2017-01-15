var API = require('../../api.js');
var whether = API.api.whether;
var allWhether = API.api.allWhether;
var getTimeCha = API.api.getTimeCha;

// map.js
Page({
  data: {
    latitude: 23.099994,
    longitude: 113.324520,
    wlocation: '',
    whether: '',
    wtime: 1,
    temperature: '',
    code: '4',
    animationData: {},
    weilai:[]
  },
  onReady: function (e) {
    this.getwhether();
  },
  getwhether:function(){
    var that = this;
    wx.getLocation({
    type: 'wgs84',
    success: function(res) {
      var latitude = res.latitude
      var longitude = res.longitude
      var speed = res.speed
      var accuracy = res.accuracy
      var url = whether(res);
      var allUrl = allWhether(res);

      wx.request({
        url: url, //仅为示例，并非真实的接口地址
        header: {
            'content-type': 'application/json'
        },
        success: function(res) {
          console.log(res.data);
          that.setData({
            wlocation: res.data.results[0].location.name,
            whether: res.data.results[0].now.text,
            wtime: getTimeCha(res.data.results[0].last_update),
            temperature: res.data.results[0].now.temperature,
            code: res.data.results[0].now.code
          })
        }
      })
      wx.request({
        url: allUrl, //仅为示例，并非真实的接口地址
        header: {
            'content-type': 'application/json'
        },
        success: function(res1) {
          console.log('all')
          console.log(res1.data);
          that.setData({
            weilai: res1.data.results[0].daily
          })
        }
      })
    }
  })
  },
  onShow(){
    console.log('显示了')
  }
})