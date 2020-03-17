<template>
  <section
    class="base-input-wrapper"
    :class="cls"
  >
    <div class='base-common-input'>
      <span
        v-if="label"
        class='base-common-input-label'
        v-html="label"
      ></span>
      <input
        ref="baseCommonInput"
        :type="type"
        :placeholder="placeholder"
        :maxlength="maxlength"
        v-focus="{'focused': focused}"
        :disabled="disabled"
        :value="value"
        @blur.stop.prevent="blurHandler"
        @input="changeHandler"
      />
      <span
        v-if="showClear"
        class="base-common-input-clear"
        @click="changeHandler('')"
      ></span>
      <i @click="rightHandler">{{rightText}}</i>
    </div>
    <div
      v-if="errorMsg && errorType===1"
      class="base-input-error-msg"
    >{{errorMsg}}</div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      errorMsg: "",
      errorType: 1
    };
  },
  props: {
    pattern: null,
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
    type: {
      type: String,
      default: "text"
    },
    maxlength: {
      type: Number,
      default: 20
    },
    disabled: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: true
    },
    focused: {
      type: Boolean,
      default: false
    },
    showDel: {
      type: Boolean,
      default: true
    },
    rightClass: {
      type: String,
      default: ""
    },
    rightText: {
      type: String,
      default: ""
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
    showClear() {
      return this.value && this.showDel && !this.disabled;
    }
  },
  /**
   * 在销毁之前
   */
  beforeDestroy() {
    this.cancelFocus();
  },
  methods: {
    /**
     * 右键点击的操作事件
     */
    rightHandler() {
      this.$emit("rightHandler");
    },
    /**
     * 除非v-model 的双向绑定事件
     */
    changeHandler(event) {
      const target = event.target ? event.target : null;
      const val = target ? target.value : event;
      this.errorMsg = ""; //清除的时候 去掉错误提示
      this.$emit("input", val);
    },
    /**
     * 失去焦点操作
     */
    blurHandler() {
      let isOk = true;
      let errorMsg = "";
      if (this.required && !this.value) {
        errorMsg = "值不能为空";
        isOk = false;
      } else if (this.value && this.pattern) {
        let reg = new RegExp(this.pattern);
        isOk = reg.test(this.value);
        errorMsg = isOk ? "" : "您输入的值格式不正确，请重新输入";
      }
      if (this.errorType === 1) {
        this.errorMsg = errorMsg;
      } else if (this.errorType === 2) {
        // errorMsg && Toast.info(errorMsg, 2); //todo 过度依赖与AppModal  暂时不显示消息
      }
      return isOk;
    },
    /**
     * 失去焦点
     */
    cancelFocus() {
      this.$refs.baseCommonInput.blur();
    }
  }
};
</script>

<style lang="scss" scoped>
.base-input-wrapper {
  width: 100%;
  position: relative;
  background: #ffffff;
  box-sizing: border-box;
  .base-common-input {
    position: relative;
    width: 100%;
    height: 90px;
    padding: 0 40px;
    display: -webkit-box;
    display: -ms-flexbox;
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
    .base-common-input-label {
      width: 208px;
      color: #8b8b8b;
      font-size: 30px;
      text-align: left;
      white-space: nowrap;
      overflow: hidden;
      padding: 4px 0;
      display: inline-block;
      height: 100%;
      line-height: 82px;
    }
    input {
      position: relative;
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      width: auto;
      height: 100%;
      text-align: left;
      overflow: hidden;
      -o-text-overflow: ellipsis;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 30px;
      color: #464646;
      border: 0;
      outline: none;
    }
    input::-webkit-input-placeholder {
      color: #dadada;
    }
    i {
      background: url("./files/contact.png") left center no-repeat;
      background-size: 40px;
      text-indent: 40px;
      float: right;
      font-style: normal;
      font-size: 24px;
      color: #6981ff;
      margin-left: 40px;
    }
    .base-common-input-clear {
      width: 42px;
      height: 42px;
      overflow: hidden;
      font-style: normal;
      color: #fff;
      background-repeat: no-repeat;
      background-image: url("./files/del.png");
      background-size: 28px;
      background-position: center;
    }
  }

  .base-input-error-msg {
    color: #ff1d2a;
    font-size: 24px;
    line-height: 60px;
    padding-left: 50px;
    background-color: rgba(254, 187, 187, 0.45);
  }

  .base-input-error-msg:before {
    display: inline-block;
    content: "!";
    width: 28px;
    height: 28px;
    border-radius: 100%;
    background: #ff1d2a;
    text-align: center;
    line-height: 28px;
    margin-right: 20px;
    color: #fff;
  }
}
</style>
