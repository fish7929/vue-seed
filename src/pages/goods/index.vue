<template>
  <div class="goods-container">
    <head-top
      :isShowBack="true"
      title="商品详情"
    ></head-top>
    <div class="goods-content">
      <section
        class="goods-detail-content"
        :class="noWx"
      >
        <img
          v-if="descriptionImgList && descriptionImgList.length > 0"
          v-for="(photo, index) in descriptionImgList"
          :src="photo"
          :key="index"
        />
      </section>
      <section class="goods-detail-bottom">
        <span class="goods-detail-bottom-price">价格 ￥{{(this.goods.price).toFixed(2)}}</span>
        <span
          class="goods-detail-button"
          @click.stop.prevent="onBuyHandler()"
        >立即购买</span>
      </section>
    </div>
  </div>
</template>

<script>
import headTop from "Components/header";
import { mapState } from "vuex";
import CommonTool from "Utils/commonTool";

export default {
  data() {
    return {};
  },
  created() {},
  components: {
    headTop
  },
  computed: {
    ...mapState(["goodsList"]),
    noWx() {
      return CommonTool.isWeiXinPlatform() ? " without-weixin" : "";
    },
    goodsId() {
      return this.$route.params.id;
    },
    goods() {
      if (this.goodsList && this.goodsList.length > 0) {
        return this.goodsList.find(item => item.id === this.goodsId);
      } else {
        return null;
      }
    },
    descriptionImgList() {
      if (this.goods) {
        const { descriptionImgList } = this.goods;
        return descriptionImgList;
      } else {
        return null;
      }
    }
  },
  mounted() {
    CommonTool.setTitle("商品详情");
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.goods-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #f5f5f9;
  .goods-content {
    width: 100%;
    height: 100%;
    overflow: auto;
    .goods-detail-bottom {
      position: fixed;
      z-index: 1;
      width: 100%;
      height: 100px;
      left: 0;
      bottom: 0;
      line-height: 100px;
      display: flex;
      span {
        display: inline-block;
      }
      .goods-detail-bottom-price {
        flex: 1;
        height: 100%;
        text-align: left;
        padding-left: 40px;
        font-size: 32px;
        color: #ed5741;
        background: #fff;
        box-sizing: border-box;
      }
      .goods-detail-button {
        width: 280px;
        height: 100%;
        text-align: center;
        font-size: 32px;
        color: #202020;
        background: #fdd40f;
      }
    }
    .goods-detail-content {
      width: 100%;
      height: -webkit-calc(100% - 188px);
      height: calc(100% - 188px);
      overflow-y: auto;
      overflow-x: hidden;
      img {
        display: inline-block;
        width: 100%;
        height: auto;
      }
    }
    .without-weixin {
      height: 100% !important;
    }
  }
}
</style>
