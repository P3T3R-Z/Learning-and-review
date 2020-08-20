<template>
  <div class="contents">
    <h2  class="title">{{list.title}}</h2>
    <!-- <view>{{list.content}}</view> -->
    <wxParse :content="list.content" />
  </div>
</template>

<script>
import wxParse from 'mpvue-wxparse'; //mpvue中的v-html

export default {
  components:{
    wxParse
  },
  data () {
    return {
      list: [],
      page:1
    }
  },

  created () {
    
  },
  mounted(){
  },
  methods:{ 
      requestData(aid){

          var that=this;

          var api='http://www.phonegap100.com/appapi.php?a=getPortalArticle&aid='+aid;
          wx.request({
              url: api, //仅为示例，并非真实的接口地址               
              header: {
                  'content-type': 'application/json' // 默认值
              },
              success: function(res) {
                  console.log(res.data);

                  that.list=res.data.result[0];
              }
          })

      }
  },
  //wx api页面挂载触发
  onLoad: function(options) {
      
     var aid=options.aid;

     this.requestData(aid);
  }
}
</script>

<style scoped>
@import url("~mpvue-wxparse/src/wxParse.css");
.contents{
  padding:10px;
}
</style>
