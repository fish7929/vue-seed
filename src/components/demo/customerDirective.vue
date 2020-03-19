<template>
  <div>
    <button @click="show = !show">{{btnTxt}}</button>
    <button
      v-if="show"
      v-append-text="`hello ${number}`"
      @click="number++"
    >按钮</button>
  </div>
</template>
<script>
export default {
  //实例化之后，数据观测和事件配置之前调用
  beforeCreate() {
    console.log("beforeCreate");
  },
  //声明组件
  components: {},
  directives: {
    appendText: {
      bind() {
        console.log("directives bind");
      },
      inserted(el, binding) {
        el.appendChild(document.createTextNode(binding.value));
        console.log("directives inserted", el, binding);
      },
      update() {
        console.log("directives update");
      },
      componentUpdated(el, binding) {
        el.removeChild(el.childNodes[el.childNodes.length - 1]);
        el.appendChild(document.createTextNode(binding.value));
        console.log("directives componentUpdated", el, binding);
      },
      unbind() {
        console.log("directives unbind");
      }
    }
  },
  data() {
    console.log("data");
    return {
      number: 1,
      show: true
    };
  },
  created() {
    console.log("created");
  },
  beforeMount() {
    console.log("beforeMount");
  },
  mounted() {
    console.log("mounted");
  },
  activated() {
    console.log("activated");
  },
  deactivated() {
    console.log("deactivated");
  },
  beforeUpdate() {
    console.log("beforeUpdate");
  },
  updated() {
    console.log("updated");
  },
  beforeDestroy() {
    console.log("beforeDestroy");
  },
  destroyed() {
    console.log("destroyed");
  },
  computed: {
    btnTxt() {
      return this.show ? "销毁" : "挂载";
    }
  },
  methods: {}
};
</script>

<style>
.active {
  background: #ccc;
  font-size: 40px;
}
</style>


