// pages/studentRecordPage/studentRecordPage.js

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    studentRecords:[],
    classInfoItem:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(app.globalData.userRecord[options.index]);
    this.setData({
      classInfoItem:app.globalData.userRecord[options.index]
    });

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
  
    wx.request({
      url: 'https://selltom.mynatapp.cc/class/minSearchByTeacherIdAndCourse',
      method:'GET',
      data:{
        "teacherId":that.data.classInfoItem['teacherId'],
        "courseName":that.data.classInfoItem['courseName']
      },

      complete:function(res){
        if(res.statusCode==200){
          that.setData({
            studentRecords:res.data
          });
          console.log(that.data.studentRecords);
        }else{
          console.log(res.data);
        }
      }
    })
  }
})