<template>
  <view>
    <Swiper :images="images"/>
     
    <ul class="news ">
      
      <li v-for="(item, index) in list" :key="index" @click="goContent(item.aid)">{{item.title}}</li>
    </ul>
    
    
  </view>
</template>

<script>
import Swiper from "@/components/swiper";
export default {
  components: {
    Swiper
  },
  data() {
    return {
      list: [],
      page: 1,
      images: [
        {
          url: require("@/static/images/home1.png")
        },
        {
          url: require("@/static/images/home2.png")
        }
      ],
      current: "homepage",
      
    };
  },

  created() {
    console.log("created");
  },
  onShow() {
    console.log("onshow");
    this.requestData();
  },

  mounted() {
    // wx.showLoading({
    //   title: '加载中',
    // })
    // setTimeout(function () {
    //   wx.hideLoading()
    // }, 2000)
    //自动滑到底部
    // wx.createSelectorQuery().select('.news').boundingClientRect(function(rect){
    //   // 使页面滚动到底部
    //   wx.pageScrollTo({
    //     scrollTop: rect.bottom
    //   })
    // }).exec()
  },
  methods: {
    handleChange({ detail }) {
      this.setData({
        current: detail.key
      });
    },
    requestData() {
      var that = this;

      var api = "http://www.phonegap100.com/appapi.php";
      
      wx.request({
        url: api, //仅为示例，并非真实的接口地址
        data: {
          a: "getPortalList",
          catid: "20",
          page: that.page
        },
        method: "get",
        header: {
          "content-type": "application/json" // 默认值
        },
        success: function(res) {
          // console.log(res.data)
          res.data.result.forEach((i, index) => {
            that.list.push(i);
          });
         
        }
      });
    },
    goContent(aid) {
      const url = "../newscontent/main?aid=" + aid;
      wx.navigateTo({ url });
    }
  },
  //wx api 滑到底部触发
  onReachBottom() {
    this.page++;
    this.requestData();
  }
};
</script>

<style scoped>
.news li {
  width: 96%;
  margin: 0 auto;
  border-bottom: 1px solid #eee;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 1rem;
  line-height: 1rem;
}
</style>
