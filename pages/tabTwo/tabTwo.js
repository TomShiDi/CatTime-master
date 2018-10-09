// pages/tabTwo/tabTwo.js
import Toast from '../../dist/toast/toast.js'


const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userRecord:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
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
    this.getData();
    Toast.loading({
      mark:true,
      message:"正在刷新"
    });
    wx.stopPullDownRefresh();
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

  getData:function(){
    var that = this;
    console.log(app.globalData.studentId);
    wx.request({
      url: 'http://selltom.s1.natapp.cc/class/minWechatSearch',
      method:'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },

      data: "studentId="+app.globalData.studentId,

      complete:function(res){
        if(res == null || res.data == null){
          console.log("获取记录失败");
          return;
        }else{
          that.setData({
            userRecord: res.data
          });
          app.globalData.userRecord = res.data;
          console.log(app.globalData.userRecord);
          // console.log(res.data);
        }
      }
    })
  },


  json2Form: function (params) {
    var str = [];
    for (var item in params) {
      console.log(this.data.userInfo);
      str.push(encodeURIComponent(item) + "=" + encodeURIComponent(params[item]));
    }
    console.log(str);
    return str.join("&");
  },


})