<template>
  <div class="shop-container">
    <head-top
      :isShowBack="false"
      title="花生微店"
      cls="my-header-cls"
    ></head-top>
    <div class="shop-content">
      <nav class="shop-nav">
        <div
          class="swiper-container"
          v-if="banners.length"
        >
          <div class="swiper-wrapper">
            <div
              class="swiper-slide banner-container"
              v-for="(item, index) in banners"
              :key="index"
              @click="swiperClick(item.url)"
            >
              <img :src="item.photo" />
            </div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
      </nav>
      <ul
        v-if="(goodsList&&goodsList.length)"
        type="1"
        class="goods-list-content-wrapper common-scroll-hidden"
        :class="noWx"
      >
        <router-link
          v-for="item in goodsList"
          :to="{name: 'goods', params: {id: item.id}}"
          tag='li'
          :key="item.id"
          class="goods-item"
        >
          <img :src="item.logo" />
          <div class="item-desc-info">{{item.commodityName}}</div>
          <span class="item-price-info">￥{{(item.price).toFixed(2)}}</span>
        </router-link>
      </ul>
      <ul
        v-else
        class="goods-list-content-wrapper common-scroll-hidden"
        :class="noWx"
      >
        <div class="no-records">
          <img src="../../assets/images/icons/coffee.png" />
          <p>暂无商品，请稍后查看~</p>
        </div>
      </ul>
    </div>
    <foot-guide></foot-guide>
  </div>
</template>

<script>
import headTop from 'Components/header';
import footGuide from 'Components/footer';
import { getGoodsList } from 'Api/httpApi';
import { mapState, mapMutations, mapActions } from 'vuex';
import CommonTool from 'Utils/commonTool';
import 'Plugins/swiper.min.js';
import 'Styles/swiper.min.css';
export default {
  data() {
    return {};
  },
  created() {},
  components: {
    headTop,
    footGuide,
  },
  computed: {
    ...mapState(['goodsList', 'banners']),
    noWx() {
      return CommonTool.isWeiXinPlatform() ? ' without-weixin' : '';
    },
  },
  mounted() {
    // CommonTool.setTitle("花生微店");
    if (this.banners && this.banners.length > 0) {
      //初始化swiper
      new Swiper('.swiper-container', {
        pagination: this.banners.length > 1 ? '.swiper-pagination' : '',
        loop: this.banners.length > 1 ? true : false,
        autoplay: this.banners.length > 1 ? 5000 : 0,
        speed: 500,
      });
    }
    if (!this.goodsList || this.goodsList.length <= 0) {
      this.getGoodsListAction();
    }
    console.log('mounted');
  },
  methods: {
    ...mapActions(['getGoodsListAction']),
    /**
     * swiper 点击事件
     * @param {String} url 需要跳转的url
     */
    swiperClick(url) {
      if (url) {
        window.location.href = url;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.shop-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  overflow: hidden;
  .my-header-cls {
    background: #fff !important;
  }
  .shop-content {
    width: 100%;
    height: 100%;
    overflow: auto;
    .shop-nav {
      width: 100%;
      height: 300px;
      background: #fff;
      .swiper-container {
        width: 100%;
        height: 100%;
        .swiper-pagination {
          width: 100%;
          left: 0;
          bottom: 20px;
          .swiper-pagination-bullet {
            /*自定义点的颜色 */
            background: rgba(200, 141, 78, 1) !important;
          }
          .swiper-pagination-bullet-active {
            /*自定义点的颜色 */
            background: rgba(255, 255, 255, 1) !important;
          }
        }
      }
      .banner-container {
        display: inline-block;
        width: 100%;
        height: 300px;
        img {
          display: inline-block;
          width: 100%;
          height: 100%;
        }
      }
    }
    .goods-list-content-wrapper {
      width: 100%;
      height: -webkit-calc(100% - 388px); //去掉底层banner  和 header
      height: calc(100% - 388px);
      overflow-y: auto !important;
      overflow-x: hidden;
      padding: 90px 40px 120px; //去掉底层tab
      box-sizing: border-box;
      position: relative;
      background: #fff;
      &:before {
        position: absolute;
        left: 40px;
        top: 30px;
        color: #464646;
        content: attr(data-hint);
        font-size: 28px;
      }
      .goods-item {
        display: inline-block;
        width: 50%;
        margin-bottom: 20px;
        background: #fff;
        height: auto;
        box-sizing: border-box;
        &:nth-child(2n) {
          text-align: right;
        }
        &:nth-child(2n - 1) {
          text-align: left;
        }
        img {
          display: inline-block;
          width: 300px;
          height: 300px;
          margin-bottom: 20px;
          border: 1px solid #f5f5f9;
          box-sizing: border-box;
        }
        .item-desc-info {
          width: 300px;
          text-align: left;
          max-height: 90px;
          line-height: 45px;
          box-sizing: border-box;
          font-size: 28px;
          color: #101010;
          letter-spacing: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2; /*要显示的行数*/
          -webkit-box-orient: vertical;
          margin-bottom: 20px;
        }
        span {
          display: inline-block;
          width: 300px;
          color: #ed5741;
          line-height: 40px;
          box-sizing: border-box;
          font-size: 28px;
          text-align: left;
        }
      }
      .no-records {
        margin: 230px auto 0;
        width: 500px;
        text-align: center;
        img {
          width: 256px;
          display: inline-block;
        }
        p {
          margin-top: 20px;
          font-size: 28px;
          color: #bec2c9;
          font-family: PingFangSC-Regular;
        }
      }
    }
  }
  .without-weixin {
    height: -webkit-calc(100% - 288px) !important;
    height: calc(100% - 288px) !important;
  }
}
</style>
