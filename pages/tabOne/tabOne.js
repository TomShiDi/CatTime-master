// pages/tabOne/tabOne.js

import Toast from '../../dist/toast/toast.js'
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    studentOrTeacherId:'',
    submitIf:true,
    studentTextBodyIf:false,
    teacherTextBodyIf:false,
    textBodyHidden:true,
    launchCode:'',
    launchInfo:{},
    courseName:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.setData({
    //   studentTextBodyIf:app.globalData.studentTextBodyIf
    // });
    
    if(app.globalData.studentOrTeacherId != ''){
      console.log((app.globalData.studentOrTeacherId).toString());
      if (app.globalData.studentOrTeacherId.toString().length==10){
        this.setData({
          submitHidden: true,
          textBodyHidden: false,
          studentTextBodyIf: true,
          submitIf: false
        });

      }else{
        this.setData({
          teacherTextBodyIf: true,
          submitIf: false
        });
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
    // this.setData({
    //   studentTextBodyIf:app.globalData.studentTextBodyIf
    // })
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


  register: function (e) {
    this.setData({
      studentOrTeacherId: e.detail
    });
    console.log(e.detail);
  },

  setLaunchCode:function(e){
    this.setData({
      launchCode:e.detail
    });
    console.log(e.detail);
  },


  sendRegisterData: function () {
    var that = this;
    wx.request({
      url: 'https://selltom.mynatapp.cc/connect/minwechat',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: that.json2Form({
        openid: getApp().globalData.openid,
        studentId: that.data.studentOrTeacherId
        }),
      complete: function (res) {
        if (res.statusCode!=200) {
          console.log("网络请求错误");
          return;
        } else {
          wx.showToast({
            title: '成功',
            icon:'succes',
            duration: 1000,
            mask: true
          });
          // that.getStudentOrTeacherId();
          app.globalData.studentOrTeacherId = that.data.studentOrTeacherId;
          that.isTeacherOrStudent();
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

  getStudentOrTeacherId:function(){
    wx.request({
      url: 'https://selltom.mynatapp.cc/connect/getStudentId',
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
          app.globalData.studentOrTeacherId = res.data;
          // Toast.success("返回参数"+res.data);
          // console.log(app.globalData.studentOrTeacherId);
        }
      }
    });
  },


  getLaunchInfo:function(e){
    var that=this;

    wx.request({
      url: 'https://selltom.mynatapp.cc/launch/getLaunchInfo',
      method:'GET',
      data:{'launchCode':that.data.launchCode},

      complete:function(res){
        if(res.statusCode!=200){
          that.setData({
            launchCode:''
          });
          Toast.fail("失败");
          console.log(res.data);
        }
        else{
          that.setData({
            launchInfo:res.data,
            // studentTextBodyIf:false
          });
          app.globalData.launchInfo = res.data;
          Toast.success("成功进入房间");
          // console.log(that.data.launchInfo);
          console.log(app.globalData.launchInfo);
        }
      },

      fail:function(res){
        
      }
    })
  },

  setLaunchInfo:function(e){
    var that = this;

    wx.request({
      url: 'https://selltom.mynatapp.cc/launch/start',
      method:'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data:{
        "courseName":that.data.courseName,
          "teacherId":app.globalData.studentOrTeacherId
        },

      complete:function(res){
        if (res.statusCode == 200){
          console.log(res.data);
          that.setData({
            launchCode:res.data
          });
          Toast.success("房间创建成功");
        }
        else{
          Toast.fail(res.data);
        }
      }
    })
  },


  setCourseName:function(e){
    this.setData({
      courseName:e.detail
    });
  },

  isTeacherOrStudent:function(){
    
    console.log(app.globalData.studentOrTeacherId);
    if (app.globalData.studentOrTeacherId != '') {
      console.log((app.globalData.studentOrTeacherId).toString());
      if (app.globalData.studentOrTeacherId.toString().length == 10) {
        this.setData({
          studentTextBodyIf: true,
          submitIf: false
        });

      } else {
        this.setData({
          teacherTextBodyIf: true,
          submitIf: false
        });
      }

    }
  }

})