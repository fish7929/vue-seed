<template>
  <header
    v-if="!isInWechat"
    id='head-container'
    :class="cls"
  >
    <section
      class="in-app-bar"
      v-if="isInApp"
    >
      <!-- <div class="in-app-bar"></div> -->
    </section>
    <section class="head-content">
      <span class="head-title">{{title}}</span>
      <button
        v-if="isShowBack"
        class="head-back"
        @click="$router.go(-1)"
      ></button>
      <button
        class="head-right"
        v-if="isShowRight"
        :class="rightClass"
        @click="rightHandler"
      >{{rightContent}}</button>
    </section>
  </header>
</template>

<script>
import CommonTool from 'Utils/commonTool';
export default {
  data() {
    return {
      isInApp: false,
    };
  },
  props: {
    title: {
      type: String,
      required: true,
      default: '',
    },
    cls: {
      type: String,
      default: '',
    },
    isShowBack: {
      type: Boolean,
      required: true,
      default: true,
    },
    isShowRight: {
      type: Boolean,
      default: false,
    },
    rightClass: {
      type: String,
      default: '',
    },
    rightContent: {
      type: String,
      default: '',
    },
  },
  mounted() {},
  computed: {
    /**
     * 计算是不是在微信内部
     */
    isInWechat() {
      return CommonTool.isWeiXinPlatform();
    },
  },
  methods: {
    /**
     * 右键点击的操作事件
     */
    rightHandler() {
      this.$emit('rightHandler');
    },
  },
};
</script>

<style lang="scss" scoped>
#head-container {
  width: 100%;
  background-color: #f8f8f8;
  // padding-top: 40px;  /*顶部时间栏的高度*/
  .in-app-bar {
    height: 40px;
    width: 100%;
  }
  .head-content {
    width: 100%;
    height: 88px;
    line-height: 88px;
    position: relative;
    border-bottom: 1px solid #f5f5f9;
    box-sizing: border-box;
    button {
      position: absolute;
      top: 0;
      left: 0;
      min-width: 72px;
      height: 100%;
      background: url('./files/back.png') no-repeat 16px center;
      background-size: 40px;
      z-index: 9;
      border: 0;
    }
    span {
      display: inline-block;
      width: 100%;
      height: 100%;
      text-align: center;
      font-size: 36px;
      color: #464646;
    }
  }
}
</style>
