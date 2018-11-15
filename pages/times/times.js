//time.js
import Toast from '../../dist/toast/toast';
import Dialog from '../../dist/dialog/dialog';

//获取应用实例
const app = getApp();

var timer;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nactive:app.globalData.nactive,//引用app.js中的nactive，控制进度条
    state:false,
    percentage:0,
    personal_rest_count: ''  //离目标时间还剩余XX：XX
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.countDown();
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


  countDown:function(){
    var that = this;
    timer = setTimeout(function () {
      console.log("go times");
      that.setData({
        percentage: Math.floor(app.globalData.differtCount*100 / app.globalData.personal_count),
        personal_rest_count: app.globalData.personal_rest_count
      });
      that.countDown();
    }, 1000);
  },

  closeCountDown:function(){
    app.globalData.processStartFlag = 0;
  }
})