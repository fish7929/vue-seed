<template>
  <div class="content">
    <h1 @tap="tap1">{{title}}</h1>
    <div>{{content}}</div>
    <input
      v-focus
      placeholder="auto focus"
    >
    <p v-pin:[direction]="pinVal">I am pinned onto the page at 200px to the left.</p>
  </div>
</template>
<script>
export default {
  //定义属性
  props: {
    title: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      default: '',
    },
  },
  directives: {
    focus: {
      // 当被绑定的元素插入到 DOM 中时……
      inserted: function(el) {
        el.focus();
      },
    },
    pin: {
      bind: function(el, binding, vnode) {
        el.style.position = 'fixed';
        var s = binding.arg == 'left' ? 'left' : 'top';
        el.style[s] = binding.value + 'px';
      },
    },
  },
  data() {
    return {
      direction: 'right',
      pinVal: 300,
    };
  },
  methods: {
    tap1() {
      console.log('111');
      this.$emit('tap1', this.title);
    },
  },
};
</script>
<style lang="scss" src='./index.scss'></style>


