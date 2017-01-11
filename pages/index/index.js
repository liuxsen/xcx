//index.js
//获取应用实例

var Api = require('../../utils/api.js');


Page({
    data: {
        lists: [],
        page: 0
    },
    onLoad: function(options) {
        console.log('onload by index');
        this.fetchData();
    },
    fetchData: function(data) {
        var that = this;
        // 处理参数
        if (!data) data = {};
        if (!data.page) data.page = 1;
        wx.request({
            url: Api.getTopics(data),
            success: function(res) {
                console.log(res.data.data)
                that.setData({
                    lists: res.data.data
                })
            }
        });
    },
    onTapTag:function(e){
        var slef = this;
        var tab = e.currentTarget.id;
        slef.setData({
            tab: tab
        })
        if(tab !== 'all'){
            slef.fetchData({tab: tab});
        }else{
            slef.fetchData({tab: tab});
        }
    },
    redictDetail: function (e) {
      console.log('我要看详情');
      var id = e.currentTarget.id,
          url = '../detail/detail?id=' + id;
          // 这里的detail是需要创建对应的文件，以及页面注册的
      wx.navigateTo({
        url: url
      })
    }
})
