<template>
  <div class="common-container login-container">
    <div class="login-hint"></div>
    <base-input
      ref="baseInput"
      :label="phoneLabel"
      type="tel"
      :focused="true"
      cls="login-phone-input"
      placeholder="11位手机号码"
      :pattern="/^1\d{10}$/"
      :maxlength="mLength"
      v-model.trim="mobile"
    >
    </base-input>
    <verify-input
      ref="verifyInput"
      label='<i class="login-password-icon"></i>'
      cls="login-verify-input"
      placeholder="4位数字验证码"
      :maxlength="cLength"
      v-model.trim="mobileCode"
      :getCode="getCode"
    ></verify-input>
    <div class="common-btn-wrapper margin-top-100">
      <button
        class="common-btn login-button"
        :disabled="disable"
        type="button"
        @click.stop.prevent="loginHandler"
      >登录</button>
    </div>
  </div>
</template>

<script>
import baseInput from 'Components/baseInput';
import verifyInput from 'Components/verifyInput';
import { getAuthCode, login } from 'Api/httpApi';
import { mapMutations } from 'vuex';
export default {
  data() {
    return {
      phoneLabel: '<i class="login-phone-icon"></i>',
      mobile: '', //电话号码
      mLength: 11,
      mobileCode: '', //验证码
      cLength: 4,
    };
  },
  created() {},
  components: {
    baseInput,
    verifyInput,
  },
  computed: {
    disable() {
      return this.mobile &&
        this.mobile.length === this.mLength &&
        (this.mobileCode && this.mobileCode.length === this.cLength)
        ? false
        : true;
    },
  },
  watch: {},
  methods: {
    ...mapMutations(['SAVE_USERINFO']),
    /**
     * 登录的操作
     */
    async loginHandler() {
      this.cancelFocus();
      //todo  需要显示加载
      if (this.checkMobile()) {
        let res = await login({
          mobile: this.mobile,
          mobileCode: this.mobileCode,
        });
        if (res && res.code === 200) {
          let info = res.data || {};
          if (!CommonTool.isEmptyObject(info)) {
            info.mobile = this.mobile;
          }
          this.SAVE_USERINFO(info);
          this.$router.push('/');
          console.log(info, 7788);
        }
      } else {
        //显示错误信息
      }
    },
    /**
     * 获取用户验证码
     * @param {Function} cb 回调函数
     */
    async getCode(cb) {
      this.cancelFocus();
      if (this.checkMobile()) {
        //todo  需要显示加载
        let res = await getAuthCode(this.mobile);
        if (res && res.code === 200) {
          cb && cb(0, '');
        } else {
          cb && cb(1, '获取验证码失败');
        }
      } else {
      }
    },
    /**
     * 手机号检查
     */
    checkMobile() {
      const reg = new RegExp(/^1\d{10}$/);
      return reg.test(this.mobile);
    },
    cancelFocus() {
      //失去焦点
      const baseInput = this.$refs.baseInput;
      baseInput && baseInput.cancelFocus();
      const verifyInput = this.$refs.verifyInput;
      verifyInput && verifyInput.cancelFocus();
    },
  },
  mounted() {
    // CommonTool.setTitle("登录");
  },
  /**
   * 在销毁之前
   */
  beforeDestroy() {
    this.cancelFocus();
  },
};
</script>

<style lang="scss">
.login-container {
  text-align: center;
  background: #fff;
  .login-hint {
    margin: 100px auto 100px;
    width: 160px;
    height: 160px;
    border-radius: 100%;
    background: url('~Images/icons/logo.png') center no-repeat;
    background-size: 160px;
  }
  .login-phone-input {
    border-bottom: 0 !important;
    .base-common-input {
      padding: 0 80px !important;
      position: relative;
      &:after {
        content: '';
        left: 80;
        height: 2px;
        background: #fdd40f;
        width: calc(100% - 160px);
        position: absolute;
        bottom: 0;
      }
      .base-common-input-label {
        width: 90px !important;
      }
    }
    .login-phone-icon {
      display: inline-block;
      width: 100%;
      height: 100%;
      background: url('~Images/icons/phone.png') no-repeat left center;
      background-size: 36px;
      font-style: normal;
    }
  }
  .login-verify-input {
    position: relative;
    padding: 0 80px !important;
    &:after {
      content: '';
      left: 80px;
      height: 2px;
      background: #fdd40f;
      width: calc(100% - 160px);
      position: absolute;
      bottom: 0;
    }
    .verify-input-hint {
      width: 90px !important;
    }
    .login-password-icon {
      display: inline-block;
      width: 100%;
      height: 100%;
      background: url('~Images/icons/password.png') no-repeat left center;
      background-size: 36px;
      font-style: normal;
    }
  }
  .login-agreement {
    margin-top: 20px;
    display: inline-block;
    font-size: 24px;
    color: #6981ff;
    line-height: 1;
  }
  .login-button {
    border-radius: 50px;
  }
}
</style>
