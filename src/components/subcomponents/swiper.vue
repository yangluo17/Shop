<template>
  <div>
    <mt-swipe :auto="4000">
      <!-- 谁使用轮播图组件需要传递 lunbotuList -->
      <!-- 此时，lunbotuList应该是父组件向子组件传值来设置 -->
      <mt-swipe-item v-for="(item,index) in lunbotuList" :key="index.url">
        <img :src="item.img" alt :class="{'full':isfull}" />
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>
 <script>
export default {
  props: ["lunbotuList", "isfull"]
}
</script>
<style lang="scss" scoped>
.mint-swipe {
  height: 200px;

  .mint-swipe-item {
    text-align: center;
    img {
      /* width: 100%; */
      height: 100%;
    }
  }
}
.full {
  width: 100%;
}
</style>