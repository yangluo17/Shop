<template>
  <div class="goods-list">
    <div
      class="goods-item"
      v-for="(item,index) in goodlist"
      :key="index"
      @click="goDetail(item.id)"
    >
      <img :src="item.img_url" />
      <h1 class="title">{{item.title}}</h1>
      <div class="info">
        <p class="price">
          <span class="now">{{item.sell_price}}</span>
          <span class="old">{{item.market_price}}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{item.stock_quantity}}件</span>
        </p>
      </div>
    </div>
    <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
  </div>
</template>
 <script>
export default {
  data() {
    return { //data 是往自己组件内部，挂载一些私有的数据的
      pageindex: 1, //分页的页数
      goodlist: [] //存放商品列表的 数据
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      //获取商品列表
      this.$http.get("api/getgoods?pageindex=" + this.pageindex).then(result => {
        if (result.body.status === 0) {
          /* this.goodlist = result.body.message; */
          this.goodlist = this.goodlist.concat(result.body.message);
        }
      })
    },
    getMore() {
      this.pageindex++;
      this.getGoodsList();
    },
    goDetail(id) {
      /* this.$router.push("/home/goodsinfo/" + id); */
      /* this.$router.push({ path: "/home/goodsinfo/" + id }); */
      this.$router.push({ name: "goodsinfo", params: { id } });

    }
  }
}
</script>
<style lang="scss" scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  padding: 7px;
  justify-content: space-between;
  .goods-item {
    width: 49%;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    margin: 4px 0;
    padding: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 293px;

    img {
      width: 100%;
    }
    .title {
      font-size: 14px;
    }
    .info {
      background-color: #eee;
      p {
        margin: 0;
        padding: 5px;
      }
      .price {
        .now {
          color: red;
          font-weight: blod;
          font-size: 16px;
        }
        .old {
          text-decoration: line-through;
          font-size: 12px;
          margin-left: 10px;
        }
      }
      .sell {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
      }
    }
  }
}
</style>