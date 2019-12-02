<template>
  <div class="photo-container">
    <h3>{{photoinfo.title}}</h3>
    <p class="subtitle">
      <span>发表时间：{{photoinfo.add_time|dataFormat}}</span>
      <span>点击：{{photoinfo.click}}次</span>
    </p>
    <hr />
    <!-- 缩略图区域 -->
    <div class="thumbs">
      <vue-preview :slides="list" @close="handleClose"></vue-preview>
    </div>

    <!-- 图片内容区域 -->
    <div class="content" v-html="photoinfo.content"></div>
    <!-- 评论子组件 -->
    <cmt-box :id="id"></cmt-box>
  </div>
</template>
 <script>
import comment from "../subcomponents/comment.vue";
export default {
  data() {
    return {
      id: this.$route.params.id, //从路由中获取到的图片ID
      photoinfo: {}, //图片详情
      list: []
    }
  },
  created() {
    this.getPhotoInfo();
    this.getThumbs();
  },
  methods: {
    getPhotoInfo() {
      //获取图片详情
      this.$http.get("api/getimageInfo/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.photoinfo = result.body.message[0];
        }
      })
    },
    getThumbs() {
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        if (result.body.status === 0) {
          result.body.message.forEach(item => {
            item.w = 600;   //设置以大图浏览时的宽度
            item.h = 400;     //设置以大图浏览时的高度
            item.msrc = item.src;
          });
          //把数据保存到list中
          this.list = result.body.message;
        }
      });
    },
    handleClose() {
      console.log('close event')
    }
  },
  components: {
    'cmt-box': comment
  }
}
</script>
<style lang="scss" scoped>
.photo-container {
  padding: 3px;
  h3 {
    color: #26a2ff;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }
  .thumbs {
    /deep/ .my-gallery {
      display: flex;
      flex-wrap: wrap; //默认换行
      figure {
        width: 30%;
        margin: 5px;
        img {
          width: 100%;
          box-shadow: 0 0 8px #999;
          border-radius: 5px;
        }
      }
    }
  }
  .content {
    font-size: 13px;
    line-height: 30px;
  }
}
</style>