<template>
  <div class="activity-container">
    <head-top
      :isShowBack="false"
      title="活动"
      cls="my-header-cls"
    ></head-top>
    <div class="activity-content">敬请期待</div>
    <foot-guide></foot-guide>
  </div>
</template>

<script>
import headTop from 'Components/header';
import footGuide from 'Components/footer';

export default {
  data() {
    return {};
  },
  created() {},
  components: {
    headTop,
    footGuide,
  },
  computed: {},
  methods: {},
  mounted() {
    // CommonTool.setTitle("活动");
  },
};
</script>

<style lang="scss" scoped>
.activity-container {
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
  .activity-content {
    font-size: 28px;
    color: #101010;
    text-align: center;
    padding-top: 70%;
  }
}
</style>
