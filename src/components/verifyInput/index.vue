<template>
  <section
    class="verify-input-wrapper"
    :class="cls"
  >
    <span
      v-if="label"
      class='verify-input-hint'
      v-html="label"
    ></span>
    <div class="verify-code-container">
      <input
        type="tel"
        ref="verifyCodeInput"
        :placeholder="placeholder"
        :maxlength="maxlength"
        :disabled="disabled"
        :value="value"
        @input="changeCodeHandler"
      />
    </div>
    <span
      v-if="countDown === 60"
      class="verify-code"
      :class="loadingCls"
      @click.stop.prevent="getCodeHandler"
    >{{btnText}}</span>
    <span
      v-else
      class="verify-code"
      :class="loadingCls"
    ><i>{{btnText}}</i></span>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      countDown: 60,
      timeout: null,
      disabled: true
    };
  },
  props: {
    value: [String, Number],
    label: {
      type: String,
      default: ""
    },
    cls: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: "请输入"
    },
    maxlength: {
      type: Number,
      default: 6
    },
    focused: {
      type: Boolean,
      default: false
    },
    getCode: {
      type: Function,
      required: true
    }
  },
  model: {
    prop: "value",
    event: "input"
  },
  mounted() {},
  directives: {
    focus: {
      // 当被绑定的元素插入到 DOM 中时……
      inserted: function(el, options) {
        // console.log(options, options.value.focused, 67788);
        const focused = options.value.focused || false;
        if (focused) {
          el.focus();
        }
      }
    }
  },
  computed: {
    /**
     * 计算是不是在微信内部
     */
    isInWechat() {
      return CommonTool.isWeiXinPlatform();
    },
    /**
     * 加载样式
     */
    loadingCls() {
      return this.isLoading ? "verify-button-loading" : "";
    },
    /**
     * 按钮提示文案
     */
    btnText() {
      return this.countDown == 60
        ? "获取验证码"
        : this.countDown + "秒后重新获取";
    }
  },
  /**
   * 在销毁之前
   */
  beforeDestroy() {
    this.clear();
  },
  methods: {
    /**
     * 除非v-model 的双向绑定事件
     */
    changeCodeHandler(event) {
      const target = event.target ? event.target : null;
      const val = target ? target.value : event;
      this.$emit("input", val);
    },
    /**
     * 获取验证码
     */
    getCodeHandler() {
      //添加加载样式
      this.isLoading = true;
      //需要调用获取验证码的接口
      let self = this;
      this.getCode &&
        this.getCode((status, msg) => {
          console.log(status, msg, 889999);
          //输入框可以输入，点击了获取验证码之后
          self.disabled = false;
          //取消加载样式
          self.isLoading = false;
          if (status == 0) {
            //正确的回调
            //修改界面ui
            self.countDown = 59;
            self.timeout = setInterval(() => {
              let oldCount = self.countDown;
              if (oldCount == 1) {
                clearInterval(self.timeout);
                self.countDown = 60;
                return;
              }
              let newCount = oldCount - 1;
              self.countDown = newCount;
            }, 1000);
          } else {
            //错误的回调
          }
        });
    },
    /**
     * 失去焦点
     */
    cancelFocus() {
      this.$refs.verifyCodeInput.blur();
    },
    timerOut() {
      this.timeout && clearInterval(this.timeout);
      this.timeout = null;
      this.countDown = 60;
    },
    clear() {
      this.isLoading = false;
      this.cancelFocus();
      this.timerOut();
    }
  }
};
</script>

<style lang="scss" scoped>
/*******验证码组件的通用样式*********/
.verify-input-wrapper {
  position: relative;
  height: 90px;
  width: 100%;
  padding: 0 32px;
  display: flex;
  background-color: #fff;
  vertical-align: middle;
  overflow: hidden;
  -webkit-transition: background-color 200ms;
  -o-transition: background-color 200ms;
  transition: background-color 200ms;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  .verify-input-hint {
    width: 208px;
    color: #8b8b8b;
    font-size: 30px;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    padding: 4px 0;
    display: inline-block;
    height: 100%;
  }
  .verify-code-container {
    position: relative;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    width: auto;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 30px;
    color: #464646;
    height: 100%;
    input {
      width: 100%;
      height: 100%;
    }
  }
  .verify-code-clear {
    width: 42px;
    height: 42px;
    // border-radius: 50%;
    overflow: hidden;
    font-style: normal;
    color: #fff;
    // background-color: #ccc;
    background-repeat: no-repeat;
    background-image: url("~Images/icons/del.png");
    background-size: 28px;
    background-position: center;
    margin-right: 40px;
  }
  .verify-code {
    display: inline-block;
    // width: 75px;
    text-align: right;
    color: #f0c416;
    font-size: 30px;
    i {
      font-style: normal;
      color: #cccccc;
    }
  }
}

/***通用的按钮点击加载样式***/
.verify-button-loading {
  position: relative;
}
.verify-button-loading::first-line {
  color: transparent;
}
.verify-button-loading::before {
  width: 8px;
  height: 8px;
  margin: auto;
  content: "";
  -webkit-animation: spinZoom 1s steps(8) infinite;
  animation: spinZoom 1s steps(8) infinite;
  border-radius: 100%;
  box-shadow: 0 -20px 0 2px currentColor, 20px 0 currentColor,
    0 20px currentColor, -20px 0 currentColor, -14px -14px 0 1px currentColor,
    14px -14px 0 3px currentColor, 14px 14px currentColor,
    -14px 14px currentColor;
  /* center */
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
/* 按钮loading动画 */
@-webkit-keyframes spinZoom {
  0% {
    -webkit-transform: scale(0.75) rotate(0);
  }
  100% {
    -webkit-transform: scale(0.75) rotate(360deg);
  }
}
@keyframes spinZoom {
  0% {
    transform: scale(0.75) rotate(0);
  }
  100% {
    transform: scale(0.75) rotate(360deg);
  }
}
</style>
