<template>
  <div class="test-container">
    <head-top
      :isShowBack="false"
      title="测试"
      cls="test-header-cls"
    ></head-top>
    <section class="test-content">
      <Seckill
        :startTime="startTime"
        :endTime="endTime"
      ></Seckill>
      <customer-directive></customer-directive>
      <div>
        <span>Message: {{msg}}</span>
        <br />
        <VNodes :vnodes="getJSXSpan()"></VNodes>
        <js-render :level="1">Hello World!!!</js-render>
        <jsx-render :level="2">Hello World!!!</jsx-render>
        <template-render :level="3">Hello World!!!</template-render>
        <VNodes :vnodes="getAnchoredHeading(4)"></VNodes>
      </div>
    </section>
  </div>
</template>

<script>
import headTop from "Components/header";
import Seckill from "Components/seckill";
import customerDirective from "Components/demo/customerDirective.vue";
import moment from "moment";
import jsRender from "Components/demo/jsRender.js";
import jsxRender from "Components/demo/jsxRender.jsx";
import templateRender from "Components/demo/templateRender.vue";
export default {
  data() {
    return {
      endTime: moment(new Date("2020-03-20 00:00:00")),
      startTime: moment(new Date("2020-03-18 16:00:00")),
      msg: "hello vue"
    };
  },
  created() {},
  components: {
    headTop,
    Seckill,
    customerDirective,
    jsRender,
    jsxRender,
    templateRender,
    VNodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes
    }
  },
  computed: {},
  methods: {
    getJSXSpan() {
      return <span>Message: {this.msg}</span>;
    },
    getAnchoredHeading(level) {
      const Tag = `h${level}`;
      return <Tag>Hello World !!!</Tag>;
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.test-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #f5f5f9;
  overflow: hidden;
  .test-header-cls {
    background: #fff !important;
  }
  .test-content {
    width: 100%;
    height: 100%;
    overflow: auto;
  }
}
</style>
