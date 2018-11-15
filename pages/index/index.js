//index.js
import Toast from '../../dist/toast/toast';
import Dialog from '../../dist/dialog/dialog';

//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    checked:false,
    show:false,
    minHour:0,
    maxHour:0,
    min_minute:0,
    max_minute: 90,//以上参数都是框架中的控制参数
    start_button_hidden:false,
    end_button_hidden:true,
    processStartFlag:'0',
    differtCountText:'0',
    countDownFlag:'0',
    countDownStart:'',
    checkbox:[],
    focus_time:[],
    unfocus_time:[],
    position_x:'0',
    position_y:'0',
    position_z:'0',
    timer:'',
    count:'0',
    differ:'0',
    second:'0',
    minute:'0',
    hour:'0',
    differtCount:'0',
    userInfo: {},
    openid:'',
    studentOrTeacherId:'',
    AppID:'wx5de4ceda37f4c8fc',
    AppSecret:'07084bdc64de67946f8b2bbb56a0c8e6',
    code:'',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad: function () {
    var flag = 1;
    var startTime = 0;
    var endTime = 0;
    var isValidFlag = 1;
    var maxWaitTime = 20;

    this.getUserOpenid();

    if (app.globalData.userInfo) {
      
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    let that = this;


    wx.onAccelerometerChange(function(res){
      var processStartFlag = that.data.processStartFlag;
      that.setData({
        position_x:res.x,
        position_y:res.y,
        position_z:res.z
      })

      if(flag==0){
        that.setData({
          second: Math.floor((that.data.count - startTime) % 60),
          minute: Math.floor((that.data.count - startTime) / 60)
        });
      }

      

      if (res.z>=0.8&&flag == 1&&processStartFlag==1){
        startTime = that.data.count;
        wx.vibrateLong();
        if(that.data.countDownFlag == 1)
        {
          var unfocus_time = that.data.unfocus_time;
          var countDownDiffert = that.data.count - that.data.countDownStart;
          unfocus_time.push(Math.floor((countDownDiffert) / 60) + "分" + Math.floor((countDownDiffert) % 60)+"秒");
          that.setData({
            unfocus_time:unfocus_time,
            countDownFlag:0
          });
        }
        that.setData({
          second:Math.floor((that.data.count-startTime)%60),
          minute: Math.floor((that.data.count - startTime) / 60)
        });
        flag = 0;
      }else{
        if(res.z<=0.5&&flag==0){
          endTime = that.data.count;
          if (isValidFlag ==1)
          {
            var focus_time=that.data.focus_time;
            focus_time.push(Math.floor((endTime - startTime) / 60) + "分" + Math.floor((endTime - startTime) % 60) + "秒");
            that.setData({
              differtCount: that.data.differtCount + endTime - startTime,
              differtCountText: Math.floor((that.data.differtCount + endTime - startTime) / 60) + "分" + Math.floor((that.data.differtCount + endTime - startTime) % 60) + "秒",
              differ: endTime - startTime,
              focus_time:focus_time,
              second: Math.floor((endTime - startTime) % 60),
              minute: Math.floor((endTime - startTime) / 60)
            })
  
            console.log(focus_time);
          }
          startTime =0;
          that.setData({
            countDownFlag:'1',
            countDownStart:that.data.count
          });
          flag = 1;
        }
      }
    })
  },

  onUnload:function(){
    console.log("onUnload方法执行");
  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  
  // onShow:function(){
  //   this.countDown();
  // },

  countDown:function(){
    let that = this;
    var count = that.data.count;

    
    that.setData({
      timer:setInterval(function(){
        count++;

        that.setData({
          count:count
        })
        
        // if ()
      },1000),
      start_button_hidden:true,
      end_button_hidden:false,
      processStartFlag:1
    })
  },

  closeCountDown:function(){
    let that = this;
    let differtCount = that.data.differtCount;
    that.setData({
      end_button_hidden:true,
      start_button_hidden:false,
      processStartFlag:0,
      differtCount:0,
      differttCountText:'0'
    });
    // that.sendTimeData();
    clearInterval(that.data.timer);
  },

  insert_focus: function () {
    let that = this;
    var focus_time = this.data.focus_time;

    var differ = this.data.differ;
    console.log(focus_time);

    focus_time.push(Math.floor(differ/60) + "分"+ differ%60 + "秒");
    that.setData({
      focus_time: focus_time
    })
  },

  insert_unfocus: function () {
    var unfocus_time = this.data.unfocus_time;

    var differ = this.data.differ;
    console.log(unfocus_time);

    unfocus_time.push(Math.floor(differ / 60) + "分" + differ % 60 + "秒");
    this.setData({
      unfocus_time: unfocus_time
    })
  },

  onHide:function(e){
    // this.closeCountDown();
    // console.log("监听已关闭");
  },


  sendTimeData:function(){
    var that = this;

    var unfocus_time = that.data.unfocus_time;
    var countDownDiffert = that.data.count - that.data.countDownStart;
    unfocus_time.push(Math.floor((countDownDiffert) / 60) + "分" + Math.floor((countDownDiffert) % 60) + "秒");
    that.setData({
      unfocus_time: unfocus_time,
      countDownFlag: 0
    });

    wx.request({
      url: 'https://selltom.mynatapp.cc/class/wechatSave',
      method:'POST',
      header:{
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: that.json2Form({openid:app.globalData.openid,
                            sustainedTime:that.data.differtCountText,
                            sustainedTimeSrc:that.data.differtCount,
                            courseName:app.globalData.launchInfo['courseName'],
                            teacherId:app.globalData.launchInfo['teacherId']
                            }),
      complete:function(res){
        if(res==null||res.data==null){
          console.log("网络请求错误")
          return;
        }else{
          wx.showToast({
            title: '成功',
            icon:'succes',
            duration: 1000,
            mask: true
          })
          console.log(res.data);
        }
      }
    })
  },
  json2Form:function(params){
    var str = [];
    for(var item in params){
      console.log(this.data.userInfo);
      str.push(encodeURIComponent(item) + "=" +encodeURIComponent(params[item]));
    }
    return str.join("&");
  },

  getUserOpenid:function(){
    var that = this;

    wx.login({
      success:function(res){
        console.log(res.code);

        wx.request({
          // url: 'https://api.weixin.qq.com/sns/jscode2session?appid='+that.data.AppID+'&secret='+that.data.AppSecret+'&js_code=' + res.code +'&grant_type=authorization_code',
          url:'https://selltom.mynatapp.cc/wechat/getopenid',
          method: 'GET',
          data:{'code':res.code},
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          complete: function (res) {
            if (res == null || res.data == null) {
              console.log("获取openid失败");
              return;
            } else {
              // console.log(res.data);
              app.globalData.openid = res.data.openid;
              wx.request({
                url: 'https://selltom.mynatapp.cc/connect/getStudentId',
                method:'GET',
                data:{'openid':app.globalData.openid},
                
                complete:function(res){
                  if(res.statusCode!=200)
                  {
                    Toast.fail("当前账号未绑定学号");
                    wx.switchTab({
                      url:"/pages/tabOne/tabOne"
                    });
                    // Dialog.alert({
                    //   title:"提示",
                    //   message:"账号未绑定学号"
                    // });
                    
                    console.log("获取学号失败");
                    return;
                  }else{
                    app.globalData.studentOrTeacherId = res.data;
                    console.log(app.globalData.studentOrTeacherId);
                  }
                }
              });
              console.log(app.globalData.openid);
            }
          }

        })
      }
    })
    
  },

  onChange({detail}){
    console.log(detail)
    this.setData({
      checked:detail
    });
    if (detail){
      this.countDown();
    }
    else{
      this.closeCountDown();
    }
  
  },
  onClose() {
    this.setData({ show: false });
  },
  press_choose:function(){
    this.setData({
      show:true
    });
  },
  confirmed:function(){//按下开始学习,跳转time计时页面
    app.globalData.nactive = false;
    wx.navigateTo({
      url: '../times/times'
    })
  },
  canceled:function(){//按下自定时间，跳转time计时页面
    app.globalData.nactive=true;
    wx.navigateTo({
      url: '../times/times'
    })
  },
  identity:function(){
    wx.navigateTo({
      url: '../identity/identity'
    })
  },
  creat_room:function(){
    //创建房间
    wx.navigateTo({
      url: '../creatroom/creatroom'
    })
  },
  go_room:function(){
    //依据签到码进入房间
    wx.navigateTo({
      url: '../goroom/goroom'
    })
  },
  creat_sign:function(){
    //发起签到
    //生成签到码,将签到码，将签到码用“van-notify”显示到index页面
    //若该用户上次的签到码未结束，则再次提示相同的签到码
  }

})
