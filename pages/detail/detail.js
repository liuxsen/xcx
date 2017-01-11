// posts.js
var Api = require('../../utils/api.js');
var util = require('../../utils/util.js');
var Markdown = require('../../utils/JS.Markdown.Converter/Markdown.Converter.js');

import {html2json} from '../../utils/html2wxml/html2json.js';

Page({
  data: {
    title: '话题详情',
    detail: {},
    hidden: false,
    innerWxml: []
  },
  onLoad: function (options) {
    this.fetchData(options.id);
  },
  fetchData: function (id) {
    var self = this;
    self.setData({
      hidden: false
    });
    wx.request({
      url: Api.getTopicByID(id, { mdrender: false }),
      success: function (res) {
        console.log(res);
        res.data.data.create_at = util.getDateDiff(new Date(res.data.data.create_at));
        res.data.data.replies = res.data.data.replies.map(function (item) {
            item.create_at = util.getDateDiff(new Date(item.create_at));
            return item;
          })
          var data = res.data.data;
          console.log(data)
          var converter = new Markdown.Converter();
          var htm = converter.makeHtml(data.content);
          var content_detail = html2json(htm).child;
          console.log(content_detail)
          // console.log('----------')
          // console.log(content_detail)
          // console.log(html2json('<div>a<span>b</span></div><p>c</p>').child)
        self.setData({
          detail: data,
          innerWxml: content_detail
        });
        setTimeout(function () {
          self.setData({
            hidden: true
          });
        }, 300);
      }
    });
  }
})