<template>
  <div class="my-container">
    <head-top
      :isShowBack="false"
      title="我"
      cls="my-header-cls"
    ></head-top>
    <section class="my-content">
      <div class="my-info-wrapper">
        <div class="my-info-user"></div>
        <div class="my-info-phone">{{mobile}}</div>
      </div>
      <div
        v-if="(merchantStatus && merchantStatus !== 'PROCESS_SUCCESS')"
        class="common-item pseudo-item no-wrap has-bottom-border margin-top-40 next-logo my-store"
        data-hint='开通微店'
        @click.stop.prevent="toStoreHandler"
      ></div>
      <div
        v-if="merchantStatus === 'PROCESS_SUCCESS'"
        class="common-item pseudo-item next-logo no-wrap margin-top-40 my-bank"
        data-hint="收款银行卡"
        @click.stop.prevent="toBankCardHandler"
      ></div>
      <div
        class="common-item pseudo-item no-wrap has-bottom-border margin-top-40 next-logo my-balance"
        data-hint='账户余额'
        @click.stop.prevent="toBalanceHandler"
      ></div>
      <div
        class="common-item pseudo-item next-logo has-bottom-border no-wrap my-deal"
        data-hint='交易记录'
        @click.stop.prevent="toOrdersHandler"
      ></div>
      <div
        class="common-item pseudo-item next-logo no-wrap my-closing"
        data-hint='结算记录'
        @click.stop.prevent="toClosingHandler"
      ></div>
      <div
        class="common-item pseudo-item no-wrap margin-top-40 next-logo"
        data-hint='退出登录'
        @click.stop.prevent="logoutHandler"
      ></div>
    </section>
    <foot-guide></foot-guide>
  </div>
</template>

<script>
import headTop from 'Components/header';
import footGuide from 'Components/footer';
import { mapState, mapMutations, mapActions } from 'vuex';

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
    ...mapState(['merchantStatus', 'merchantInfo', 'userInfo']),
    mobile() {
      if (this.userInfo) {
        return this.userInfo.mobile;
      } else {
        const currentUser = CommonTool.getLocalStorageObject('CURRENT_USER');
        return currentUser.mobile;
      }
    },
  },
  methods: {
    ...mapActions(['getMerchantStatusAction', 'getMerchantInfoAction']),
  },
  mounted() {
    // CommonTool.setTitle("我");
    //查询我的信息
    if (!this.merchantInfo) {
      //没有信息的时候
      this.getMerchantInfoAction();
    }
    //查询入网状态
    this.getMerchantStatusAction();
  },
};
</script>

<style lang="scss" scoped>
.my-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #f5f5f9;
  overflow: hidden;
  .my-header-cls {
    background: #fff !important;
  }
  .my-content {
    width: 100%;
    height: 100%;
    overflow: auto;
    .my-info-wrapper {
      width: 100;
      height: 340px;
      background: #fff;
      color: #202020;
      position: relative;
      padding-top: 20px;
      .my-info-user {
        width: 90px;
        height: 90px;
        -webkit-border-radius: 50%;
        border-radius: 50%;
        overflow: hidden;
        box-sizing: border-box;
        margin: 0 auto;
        margin-top: 80px;
        clear: both;
        margin-bottom: 30px;
        background: url('~Images/icons/login.png') center no-repeat;
        background-size: 96px;
      }
      .my-info-phone {
        color: #101010;
        font-size: 28px;
        text-align: center;
      }
    }
    .my-store {
      &:before {
        position: absolute;
        left: 32px;
        background: url('~Images/icons/my-store.png') left center no-repeat;
        background-size: 30px;
        text-indent: 48px;
        color: #464646;
      }
    }
    .my-bank {
      &:before {
        position: absolute;
        left: 32px;
        background: url('~Images/icons/my-bank.png') left center no-repeat;
        background-size: 30px;
        text-indent: 48px;
        color: #464646;
      }
    }
    .my-balance {
      &:before {
        position: absolute;
        left: 32px;
        background: url('~Images/icons/my-balance.png') left center no-repeat;
        background-size: 30px;
        text-indent: 48px;
        color: #464646;
      }
    }
    .my-deal {
      &:before {
        position: absolute;
        left: 32px;
        background: url('~Images/icons/my-deal.png') left center no-repeat;
        background-size: 30px;
        text-indent: 48px;
        color: #464646;
      }
    }
    .my-closing {
      &:before {
        position: absolute;
        left: 32px;
        background: url('~Images/icons/my-closing.png') left center no-repeat;
        background-size: 30px;
        text-indent: 48px;
        color: #464646;
      }
    }
  }
}
</style>
