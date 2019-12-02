<template>
  <div>
    <!-- 顶部滑动条区域 -->
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            :class="['mui-control-item',item.id==0?'mui-active':'']"
            v-for="(item,index) in cates"
            :key="index.id"
            @tap="getPhotoListByCateId(item.id)"
          >{{item.title}}</a>
        </div>
      </div>
    </div>
    <!-- 图片列表区域 -->
    <ul class="photo-list">
      <router-link v-for="(item,index) in list" :key="index.id" :to="'/home/photoinfo/'+item.id" tag="li">
        <img v-lazy="item.img_url" />
        <div class="info">
          <h1 class="info-title">{{item.title}}</h1>
          <div class="info-body">{{item.zhaiyao}}</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>
 <script>
// 导入mui的js文件
import mui from '../../lib/mui/js/mui.js'

export default {
  data() {
    return {
      cates: [], //所以分类的列表数组
      list: []
    }
  },
  created() {
    this.getAllCategory();
    //默认进入页面就主动请求所有图片里列表的数据
    this.getPhotoListByCateId(0);
  },
  mounted() {
    // 当组件中的DOM结构倍渲染好并放到页面中后 会执行这个钩子函数
    // 如果要操作元素了 最好在mounted里面 因为这里时候的DOM元素是最新的
    // 初始化滑动控件
    mui('.mui-scroll-wrapper').scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  methods: {
    getAllCategory() {
      this.$http.get("api/getimgcategory").then(result => {
        if (result.body.status === 0) {
          // 手动拼接一个最完整的分类列表
          result.body.message.unshift({ title: "全部", id: 0 })
          this.cates = result.body.message;
        }
      })
    },
    getPhotoListByCateId(cateId) {
      // 根据分类ID 获取图片列表
      this.$http.get("api/getimages/" + cateId).then(result => {
        if (result.body.status === 0) {
          this.list = result.body.message;
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
* {
  touch-action: pan-y;
}
.photo-list {
  list-style: none;
  margin: 0;
  padding: 10px;
  padding-bottom: 0;
  li {
    background-color: #ccc;
    text-align: center;
    margin-bottom: 10px;
    box-shadow: 0 0 9px #999;
    position: relative;
    img {
      width: 100%;
      vertical-align: middle;
    }
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }
    .info {
      color: white;
      text-align: left;
      position: absolute;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.4);
      max-height: 84px;
      .info-title {
        font-size: 14px;
      }
      .info-body {
        font-size: 13px;
      }
    }
  }
}
</style>