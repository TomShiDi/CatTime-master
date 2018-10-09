// pages/tabOne/tabOne.js

import Toast from '../../dist/toast/toast.js'
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    studentId:'',
    submitHidden:false,
    submitIf:true,
    textBodyIf:false,
    textBodyHidden:true

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(app.globalData.studentId != null){
      console.log(app.globalData.studentId);
      this.setData({
        submitHidden: true,
        textBodyHidden: false,
        textBodyIf:true,
        submitIf:false
      });
    }
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
    Toast.loading({
      mark:true,
      message:"功能等待开发"
    });
    
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


  register: function (e) {
    this.setData({
      studentId: e.detail
    });
    console.log(e.detail);
  },


  sendRegisterData: function () {
    var that = this;
    wx.request({
      url: 'http://selltom.s1.natapp.cc/connect/minwechat',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: that.json2Form({
        openid: getApp().globalData.openid,
        studentId: that.data.studentId
        }),
      complete: function (res) {
        if (res == null || res.data == null) {
          console.log("网络请求错误");
          return;
        } else {
          wx.showToast({
            title: '成功',
            icon:'succes',
            duration: 1000,
            mask: true
          });
          that.getStudentId();
          that.setData({
            submitHidden:true,
            textBodyHidden:false,
            submitIf:false,
            textBodyIf:true
          });
          // console.log(app.globalData.openid);

        }
      }
    })
  },

  json2Form: function (params) {
    var str = [];
    for (var item in params) {
      // console.log(this.data.userInfo);
      str.push(encodeURIComponent(item) + "=" + encodeURIComponent(params[item]));
    }
    return str.join("&");
  },

  getStudentId:function(){
    wx.request({
      url: 'http://selltom.s1.natapp.cc/connect/getStudentId',
      method: 'GET',
      data: { 'openid': app.globalData.openid },

      complete: function (res) {
        if (res.statusCode != 200) {
          Toast.fail("当前账号未绑定学号");
          wx.switchTab({
            url: "/pages/tabOne/tabOne"
          });
          // Dialog.alert({
          //   title:"提示",
          //   message:"账号未绑定学号"
          // });

          console.log("获取学号失败");
          return;
        } else {
          app.globalData.studentId = res.data;
          console.log(app.globalData.studentId);
        }
      }
    });
  }
})