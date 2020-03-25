<template>
    <div class="orders-container">
        <head-top
            :isShowBack="true"
            title="交易记录"
        ></head-top>
        <ul
            class="orders-content common-scroll-hidden"
            :class="noWx"
            ref="ordersVNode"
        >
            <li
                class="orders-common-item"
                v-if="records.length > 0"
                v-for="item in records"
                :key="item.id"
            >
                <div
                    class="common-item pseudo-item no-wrap item-title"
                    :data-hint="orderHint(item.id)"
                >{{statusStr(item.orderStatus)}}</div>
                <div
                    class="common-item pseudo-item no-wrap item-info"
                    data-hint="交易金额："
                >￥{{(parseFloat(item.totalPrice)).toFixed(2)}}</div>
                <div
                    class="common-item pseudo-item no-wrap item-info"
                    data-hint="手续费："
                >￥{{(parseFloat(item.totalServiceFee)).toFixed(2)}}</div>
                <div
                    v-if="item.bankCardNo"
                    class="common-item pseudo-item no-wrap item-info"
                    data-hint="收款银行卡："
                >{{bankCardNo(item.bankCardNo)}}</div>
                <div
                    class="common-item pseudo-item no-wrap item-info"
                    data-hint="时间："
                >{{formatTime(item.createdAt)}}</div>
            </li>
            <div
                v-else
                class="no-records"
            >
                <img
                    src="../../assets/images/no_records.png"
                    alt="没有记录"
                />
                <p>您暂无记录哦~</p>
            </div>
            <div
                v-if="records && records.length > 0"
                class="orders-more"
            >{{moreText}} <span
                    v-if="!isFinish"
                    class="animated infinite fadeInUp"
                ></span></div>
        </ul>
    </div>
</template>

<script>
import headTop from 'Components/header';
import CommonTool from 'Utils/commonTool';
import { getOrderRecords } from 'Api/httpApi';
export default {
  data() {
    return {
      currentPage: 1, //起始页码下标
      pageLength: 5, //每次加载10条
      isLaoding: false, //是否在加载
      isFinish: false, //是否完成
      records: null, //显示的条目
    };
  },
  created() {
    this.onScroll = this.onScrollHandle.bind(this);
  },
  components: {
    headTop,
  },
  computed: {
    noWx() {
      return CommonTool.isWeiXinPlatform() ? ' without-weixin' : '';
    },
    moreText() {
      return this.isFinish
        ? this.records.length > 5
          ? '我是有底线的'
          : ''
        : '向上滑动加载更多';
    },
  },
  mounted() {
    // CommonTool.setTitle("商品详情");
    //卸载绑定事件
    this.$nextTick(() => {
      this.listNode = this.$refs.ordersVNode;
      if (this.listNode) {
        this.listNode.addEventListener('scroll', this.onScroll);
      }
    });
    this.loadData();
  },
  methods: {
    formatTime(time) {
      return CommonTool.formatTime(time, 'yyyy.MM.dd HH:mm:ss');
    },
    bankCardNo(bankCardNo) {
      return CommonTool.formatBankCard(bankCardNo);
    },
    statusStr(orderStatus) {
      let statusStr = '';
      if (orderStatus == 10) {
        //支付失败
        statusStr = '交易关闭';
      } else if (orderStatus == 1) {
        //支付中
        statusStr = '待支付';
      } else if (orderStatus == 2) {
        //支付成功
        statusStr = '支付成功';
      }
      return statusStr;
    },
    orderHint(id) {
      return '订单号：' + id;
    },
    /**
     * 滚动监听函数
     * @param {object} event
     */
    onScrollHandle(event) {
      //存储滚动高度
      const scrollTop = event.target.scrollTop;
      const clientHeight = event.target.clientHeight;
      const scrollHeight = event.target.scrollHeight;
      const isBottom = clientHeight + scrollTop === scrollHeight;
      //   console.log('is bottom:' + isBottom);
      if (isBottom && !this.isLaoding) {
        //滑动到底部
        // setTimeout(() => {   //模拟加载
        this.loadData();
        // }, 1000);
      }
    },
    async loadData() {
      if (this.isFinish || this.isLaoding) return;
      this.isLaoding = true;
      const param = {
        field: 'created_at',
        order: 'desc',
        pageNum: this.currentPage,
        pageSize: this.pageLength,
      };
      let res = await getOrderRecords(param);
      this.isLaoding = false;
      console.log(res, 'getOrderRecords');
      if (res && res.code === 200) {
        const info = res.data || {};
        const { list } = info;
        const len = list.length;
        let isFinish = len < this.pageLength ? true : false; //是否完成
        this.isFinish = isFinish;
        this.records = this.records ? [...this.records, ...list] : list;
      } else {
        this.records = [];
      }
    },
    resetData() {
      Object.assign(this, {
        currentPage: 1, //起始页码下标
        pageLength: 5, //每次加载10条
        isFinish: false, //是否完成
        records: null, //显示的条目);
      });
    },
  },
  beforeDestroy() {
    //重置数据
    //卸载绑定事件
    if (this.listNode) {
      this.listNode.removeEventListener('scroll', this.onScroll);
    }
    this.resetData();
  },
};
</script>

<style lang="scss" scoped>
.orders-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #f5f5f9;
  .no-records {
    margin: 170px auto 0;
    width: 300px;
    text-align: center;
    p {
      margin-top: 80px;
      font-size: 30px;
      color: #8b8b8b;
      font-family: PingFangSC-Regular;
    }
  }
  .orders-content {
    position: relative;
    width: 100%;
    // height: 100%;
    height: -webkit-calc(100% - 88px); //去重头部高度
    height: calc(100% - 88px);
    background-color: #f5f5f9;
    position: relative;
    overflow-x: hidden;
    overflow-y: auto !important;
    // padding-bottom: 100px;  /**主要是为了祛除header的高度*/
    box-sizing: border-box;
    .orders-common-item {
      width: 100%;
      height: auto;
      margin-bottom: 10px;
      .item-title {
        background: #c8cdd0;
        padding-right: 40px;
      }
      .item-info {
        height: 60px !important;
        line-height: 60px !important;
        text-align: left !important;
        padding-left: 300px !important;
        background: #fff;
      }
    }
    .orders-more {
      width: 100%;
      height: 48px;
      line-height: 48px;
      text-align: center;
      color: #999999;
      font-size: 24px;
      span {
        display: inline-block;
        margin-left: 14px;
        width: 32px;
        height: 32px;
        background: url('~Images/icons/records-more.png') no-repeat center;
        background-size: 32px;
        // vertical-align: middle;
      }
    }
  }
  .without-weixin {
    height: 100% !important;
  }
}
.animated {
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

.animated.infinite {
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
}

@-webkit-keyframes fadeInUp {
  from {
    opacity: 0;
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

.fadeInUp {
  -webkit-animation-name: fadeInUp;
  animation-name: fadeInUp;
}
</style>
