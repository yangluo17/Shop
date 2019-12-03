<template>
  <!-- 因为不知道什么时候能够拿到max值，所以要使用watch属性监听父组件传递过来的max值，不管watch会被触发几次，但是最后一次肯定是一个合法的max值 -->
  <div class="mui-numbox" data-numbox-min="1">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input
      id="test"
      class="mui-input-numbox"
      type="number"
      value="1"
      @change="countChanged"
      ref="numbox"
    />
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>
 <script>
import mui from "../../lib/mui/js/mui.js"
export default {
  mounted() {
    //初始化数字选择框组件
    mui(".mui-numbox").numbox();
  },
  methods: {
    countChanged() {
      // 每当文本框的数据改变的时候，立即把最新的数据通过事件调用传递给父组件
      // console.log(this.$refs.numbox.value);
      this.$emit("getcount", parseInt(this.$refs.numbox.value));
    }
  },
  props: ["max"],
  watch: {
    // 属性监听
    max: function (newVal, oldVal) {
      // 使用JS API设置numbox的最大值
      mui(".mui-numbox").numbox().setOption("max", newVal);
    }
  }
}
</script>
<style lang="scss" scoped>
</style>