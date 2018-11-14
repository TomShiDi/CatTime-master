//app.js
/*
在APP.json中的tabBar不让注释，把它先放这里吧，万一要测试了也好搬过去
 "tabBar": {
    "selectedColor": "#f00",
    "list": [
      {
        "pagePath": "pages/index/index",
        "text": "Joker",
        "iconPath": "pages/index/img/joker.png",
        "selectedIconPath": "pages/index/img/joker.png"
      },
      {
        "pagePath": "pages/tabOne/tabOne",
        "text": "暂定",
        "iconPath": "pages/index/img/software_box-36.png",
        "selectedIconPath": "pages/index/img/cart.png"
      },
      {
        "pagePath": "pages/tabTwo/tabTwo",
        "text": "用户",
        "iconPath": "pages/index/img/user.png",
        "selectedIconPath": "pages/index/img/user.png"
      }
    ]
  }
*/
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    openid:'',
    studentOrTeacherId:'',
    studentTextBodyIf:false,
    launchInfo:{},
    userRecord:[],
    nactive:false//控制time.js页面中的进度条是否变灰色
  }
})