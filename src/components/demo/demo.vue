<style>
.active {
  background: #ccc;
  font-size: 40px;
}
</style>
<template>
  <div>
    <!-- <div id="test">{{vueData}}</div> -->
    <div id="app2">
      <span v-bind:title='message'>
        鼠标悬停几秒钟查看此处动态绑定的提示信息！
      </span>
    </div>
    <div id="app-3">
      <p v-if="seen">现在你看到我了</p>
    </div>
    <div id="app-4">
      <ol>
        <li v-for="(todo, index) in todos" v-bind:key="index">
          {{ todo.text }}
        </li>
      </ol>
    </div>
    <div id="app-5">
      <p v-once>{{ message }}</p>
      <input v-model="message">
      <br />
      <button v-on:click="reverseMessage">反转消息</button>
      <button @[eventName]="reverseMessage">反转消息1</button>
    </div>
    <a @click.prevent='click1'>
      <div @click.stop='click2'>click me</div>
    </a>
    <div v-html="rawHtml"></div>
    <div style="width:200px; height:200px;" :class="{active: isActive}">Hi Vue</div>
    <div v-if="type === 'A'">
      A
    </div>
    <div v-else-if="type === 'B'">
      B
    </div>
    <div v-else-if="type === 'C'">
      C
    </div>
    <div v-else>
      Not A/B/C
    </div>
    <h1 v-show="ok">Hello!</h1>
    <div id="example-2">
      <!-- `greet` 是在下面定义的方法名 -->
      <button v-on:click="greet('haha', $event)">Greet</button>
    </div>
    <div>
      <input type="text" v-model="name" placeholder="edit your name" />
      <p>你的姓名：{{name}}</p>
      <textarea type="text" v-model="note" placeholder="edit your note"></textarea>
      <p>你的备注：{{note}}</p>
      <input type="checkbox" id="english" value="English" v-model="checkedLang">
      <label for="english">English</label>
      <input type="checkbox" id="java" value="Java" v-model="checkedLang">
      <label for="java">Java</label>
      <input type="checkbox" id="react" value="React" v-model="checkedLang">
      <label for="react">React</label>
      <input type="checkbox" id="vue" value="Vue" v-model="checkedLang">
      <label for="vue">Vue</label>
      <p>选择的语音: {{ checkedLang }}</p>
      <input type="radio" id="yes" value="Yes" v-model="picked">
      <label for="yes">Yes</label>
      <input type="radio" id="no" value="No" v-model="picked">
      <label for="no">No</label>
      <p>是否精通: {{ picked }}</p>
      <select v-model="selected">
        <option disabled value="">请选择</option>
        <option>A</option>
        <option>B</option>
        <option>C</option>
      </select>
      <p>成绩: {{ selected }}</p>
    </div>
    <MyComponent title="HI" content="content......" @tap1="tap"></MyComponent>
    <router-link to="/foo">Go to Foo</router-link>
    <router-link to="/bar">Go to Bar</router-link>
    <router-view></router-view>
  </div>
</template>
<script>
import { mapState } from "vuex";
import MyComponent from "Components/myComponent";
export default {
  //实例化之后，数据观测和事件配置之前调用
  beforeCreate() {
    console.log("beforeCreate");
  },
  //声明组件
  components: {
    MyComponent
  },
  data() {
    console.log("data");
    return {
      seen: true,
      message: "页面加载于 " + new Date().toLocaleString(),
      todos: [
        { text: "学习 JavaScript" },
        { text: "学习 Vue" },
        { text: "整个牛项目" }
      ],
      rawHtml: '<span style="color: red;">你好。。。。。</span>',
      eventName: "click",
      isActive: true,
      type: "A",
      ok: false,
      name: "",
      note: "",
      picked: false,
      checkedLang: [],
      selected: ""
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
    this.$store.dispatch("data/getList");
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
  computed: mapState({
    vueData: state => state.data.dataList
  }),
  methods: {
    reverseMessage: function() {
      this.message = this.message
        .split("")
        .reverse()
        .join("");
    },
    click1() {
      console.log("click1");
    },
    click2() {
      console.log("click2");
    },
    greet(str, e) {
      console.log(this.message + str);
      e && console.log(e.target.tagName);
    },
    tap(e) {
      console.log("f父组件", e);
    }
  }
};
</script>


