// pages/tabTwo/tabTwo.js
import Toast from '../../dist/toast/toast.js'


const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userRecord:[],
    teacherBodyIf:false,
    studentBodyIf:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.studentOrTeacherId != '') {
      console.log((app.globalData.studentOrTeacherId).toString());
      if (app.globalData.studentOrTeacherId.toString().length == 10) {
        this.getPersonalData();
        this.setData({
          studentBodyIf:true
        })
      } else {
        this.getData();
        this.setData({
          teacherBodyIf:true
        })
      }
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
    if (app.globalData.studentOrTeacherId != '') {
      console.log((app.globalData.studentOrTeacherId).toString());
      if (app.globalData.studentOrTeacherId.toString().length == 10) {
        this.getPersonalData();
      } else {
        this.getData();
      }
    }

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

  getPersonalData:function(){
    var that = this;
    console.log(app.globalData.studentOrTeacherId);
    wx.request({
      url: 'https://selltom.mynatapp.cc/class/minWechatSearch',
      method:'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },

      data: "studentId="+app.globalData.studentOrTeacherId,

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

  getData:function(){
    var that = this;
    console.log(app.globalData.studentOrTeacherId);
    wx.request({
      url: 'https://selltom.mynatapp.cc/teacherClassInfo/getInfoList',
      method: 'GET',
      // header: {
      //   "Content-Type": "application/x-www-form-urlencoded"
      // },

      data: {"teacherId":app.globalData.studentOrTeacherId},

      complete: function (res) {
        if (res == null || res.data == null) {
          console.log("获取记录失败");
          return;
        } else {
          that.setData({
            userRecord: res.data
          });
          app.globalData.userRecord = res.data;
          console.log(app.globalData.userRecord);
          // console.log(res.data);
        }
      }
    });
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