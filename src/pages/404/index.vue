<template>
  <div class="not-found-container">
    <div class="not-found-content">
      您访问的页面已丢失，正在找回中...
    </div>
  </div>
</template>

<script>
export default {
  data() {},
  created() {},
  components: {},
  computed: {},
  methods: {},
  mounted() {}
};
</script>

<style lang="scss" scoped>
.not-found-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #f5f5f9;
  overflow: hidden;
  .not-found-content {
    font-size: 28px;
    color: #101010;
    text-align: center;
    padding-top: 70%;
  }
}
</style>
