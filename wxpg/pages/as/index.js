// pages/as/index.js
const app = getApp()
const {
  $Message
} = require('../../iView/base/index');
const {
  $Toast
} = require('../../iView/base/index');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标
      title: 'iview组件', //导航栏 中间的标题
    },
    gheight: 0,
    targetTime: 0,
    value6: '',
    value7: '',
    scrollTop: 0,
    visible1: false,
    actions1: [{
        name: '选项1',
      },
      {
        name: '选项2'
      },
      {
        name: '去分享',
        icon: 'share',
        openType: 'share'
      }
    ],
    actions2: [{
      name: '删除',
      color: '#ed3f14'
    }],

    showLeft1: false,
    showLeft2: false,
    showRight1: false,
    showRigh2: false,


    visible3: false,
    visible4: false,
    visible5: false,
    actions3: [{
        name: '现金支付',
        color: '#2d8cf0',
      },
      {
        name: '微信支付',
        color: '#19be6b'
      },
      {
        name: '取消'
      }
    ],
    actions4: [{
        name: '按钮1'
      },
      {
        name: '按钮2',
        color: '#ff9900'
      },
      {
        name: '按钮3',
        icon: 'search'
      }
    ],
    actions5: [{
        name: '取消'
      },
      {
        name: '删除',
        color: '#ed3f14',
        loading: false
      }
    ],
    current: 'tab1',
    current_scroll: 'tab1'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      targetTime: new Date().getTime() + 6430000
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      gheight: app.globalData.height
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    this.setData({
      clearTimer: true
    });
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */

  myLinsterner(e) {
    this.setData({
      status: '结束'
    });
  },
  onChange(event) {
    console.log(event.detail, 'click right menu callback data')
  },
  //页面滚动执行方式
  onPageScroll(event) {
    this.setData({
      scrollTop: event.scrollTop
    })
  },
  onShareAppMessage() {
    return {
      title: 'iView Weapp',
      imageUrl: 'https://file.iviewui.com/iview-weapp-logo.png'
    };
  },

  handleOpen1() {
    this.setData({
      visible1: true
    });
  },

  handleCancel1() {
    this.setData({
      visible1: false
    });
  },

  handleOpen2() {
    this.setData({
      visible2: true
    });
  },

  handleCancel2() {
    this.setData({
      visible2: false
    });
  },

  handleClickItem1({
    detail
  }) {
    console.log($Message)
    const index = detail.index + 1;
    if (index === 1) {
      wx.navigateTo({
        url: '../news/index'
      })
      setTimeout(() => {
        this.setData({
          visible1: false
        });
      }, 1000)

    }
    $Message({
      content: '点击了选项' + index
    });
  },

  handleClickItem2() {
    const action = [...this.data.actions2];
    action[0].loading = true;

    this.setData({
      actions2: action
    });

    setTimeout(() => {
      action[0].loading = false;
      this.setData({
        visible2: false,
        actions2: action
      });
      $Message({
        content: '删除成功！',
        type: 'success'
      });
    }, 2000);
  },
  toggleLeft1() {
    this.setData({
      showLeft1: !this.data.showLeft1
    });
  },
  toggleLeft2() {
    this.setData({
      showLeft2: !this.data.showLeft2
    });
  },
  toggleRight1() {
    this.setData({
      showRight1: !this.data.showRight1
    });
  },
  toggleRight2() {
    this.setData({
      showRight2: !this.data.showRight2
    });
  },

  handleText() {
    $Toast({
      content: '这是文本提示'
    });
  },
  handleSuccess() {
    $Toast({
      content: '成功的提示',
      type: 'success'
    });
  },
  handleWarning() {
    $Toast({
      content: '警告的提示',
      type: 'warning'
    });
  },
  handleError() {
    $Toast({
      content: '错误的提示',
      type: 'error'
    });
  },
  handleLoading() {
    $Toast({
      content: '加载中',
      type: 'loading'
    });
  },
  handleIcon() {
    $Toast({
      content: '使用内置的图标',
      icon: 'praise'
    });
  },
  handleImage() {
    $Toast({
      content: '使用自定义图片',
      image: 'https://i.loli.net/2017/08/21/599a521472424.jpg'
    });
  },
  handleMask() {
    $Toast({
      content: '5秒后自动关闭',
      icon: 'prompt',
      duration: 0,
      mask: false
    });
    setTimeout(() => {
      $Toast.hide();
    }, 5000);
  },


  handleOpen3() {
    this.setData({
      visible3: true
    });
  },

  handleClick3({ detail }) {
    const index = detail.index;

    if (index === 0) {
      $Message({
        content: '点击了现金支付'
      });
    } else if (index === 1) {
      $Message({
        content: '点击了微信支付'
      });
    }

    this.setData({
      visible3: false
    });
  },

  handleOpen4() {
    this.setData({
      visible4: true
    });
  },

  handleClick4() {
    this.setData({
      visible4: false
    });
  },

  handleOpen5() {
    this.setData({
      visible5: true
    });
  },

  handleClick5({ detail }) {
    if (detail.index === 0) {
      this.setData({
        visible5: false
      });
    } else {
      const action = [...this.data.actions5];
      action[1].loading = true;

      this.setData({
        actions5: action
      });

      setTimeout(() => {
        action[1].loading = false;
        this.setData({
          visible5: false,
          actions5: action
        });
        $Message({
          content: '删除成功！',
          type: 'success'
        });
      }, 2000);
    }
  },
  handleChange({ detail }) {
    this.setData({
      current: detail.key
    });
  },

  handleChangeScroll({ detail }) {
    
    this.setData({
      current_scroll: detail.key
    });
  }
})