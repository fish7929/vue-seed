<template>
  <transition name="modal-fade">
    <section
      v-if="isShow"
      class="app-modal"
      :class="cls"
    >
      <div
        v-if="type === 'TOAST'"
        class="modal-toast-mask"
      >
        <div class="modal-toast-content">
          <div class="modal-toast-message">
            {{toastConfig.message}}
          </div>
        </div>
      </div>
      <div
        v-else-if="type === 'LOADING'"
        class="modal-loading-mask"
      >
        <div class="modal-loading-content line-spin-fade-loader">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <span
            v-if="loadingConfig.message"
            class="modal-loading-message"
          >{{loadingConfig.message}}</span>
        </div>
      </div>
      <div
        v-else-if="type === 'ALERT'"
        class="modal-screen-container"
      >
        <div
          class="modal-screen-mask"
          @click.stop.prevent="alertMaskHandler"
        ></div>
        <div class="modal-screen-content">
          <div
            v-if="alertConfig.title"
            class="modal-screen-title"
          >
            {{alertConfig.title}}
          </div>
          <div
            v-if="alertConfig.message"
            class="modal-screen-message"
            :class="alertConfig.title ? '' : 'modal-screen-message-no-title'"
            v-html="alertConfig.message"
          >
          </div>
          <div
            class="modal-screen-button modal-button-active"
            @click.stop.prevent="alertBtnHandler"
          >
            {{alertConfig.btn.text}}
          </div>
        </div>
      </div>
      <div
        v-else-if="type === 'CONFIRM'"
        class="modal-screen-container"
      >
        <div
          class="modal-screen-mask"
          @click.stop.prevent="confirmMaskHandler"
        ></div>
        <div class="modal-screen-content">
          <div
            v-if="confirmConfig.title"
            class="modal-screen-title"
          >
            {{confirmConfig.title}}
          </div>
          <div
            v-if="confirmConfig.message"
            class="modal-screen-message"
            :class="confirmConfig.title ? '' : 'modal-screen-message-no-title'"
            v-html="confirmConfig.message"
          >
          </div>
          <div class="modal-screen-button modal-confirm-button">
            <span
              class="modal-button-active"
              @click.stop.prevent="cancelConfirmHandler"
            >{{confirmConfig.cancelBtn.text}}</span>
            <span
              class="modal-button-active"
              @click.stop.prevent="okConfirmHandler"
            >{{confirmConfig.okBtn.text}}</span>
          </div>
        </div>
      </div>
    </section>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
      type: "", // "TOAST" "LOADING" "ALERT" "CONFIRM"
      cls: "", //需要自定义的样式
      loadingConfig: {
        message: "" //显示的文案
      },
      toastConfig: {
        message: "" //显示的文案
      },
      alertConfig: {
        title: "温馨提示", //默认2分钟,
        message: "", //显示的文案
        maskCall: null, //蒙层的点击回调
        btn: {
          text: "知道了",
          btnCall: null //回调函数
        }
      },
      confirmConfig: {
        title: "温馨提示", //显示的标题
        message: "", //显示的文案
        maskCall: null, //蒙层的点击回调
        okBtn: {
          text: "确认",
          btnCall: null //确认回调函数
        },
        cancelBtn: {
          text: "取消",
          btnCall: null //取消回调函数
        }
      }
    };
  },
  mounted() {
    let listener = () => {
      this.isShow = false;
    };
    window.addEventListener("hashchange", listener);
    window.addEventListener("popstate", listener);
    window.addEventListener("pagehide", listener);
  },
  methods: {
    alertBtnHandler() {
      this.isShow = false;
      this.alertConfig.btn.btnCall && this.alertConfig.btn.btnCall();
    },
    alertMaskHandler() {
      if (this.alertConfig.maskCall) {
        this.isShow = false;
        this.alertConfig.maskCall();
      }
    },
    cancelConfirmHandler() {
      this.isShow = false;
      this.confirmConfig.cancelBtn.btnCall &&
        this.confirmConfig.cancelBtn.btnCall();
    },
    okConfirmHandler() {
      this.isShow = false;
      this.confirmConfig.okBtn.btnCall && this.confirmConfig.okBtn.btnCall();
    },
    confirmMaskHandler() {
      if (this.confirmConfig.maskCall) {
        this.isShow = false;
        this.confirmConfig.maskCall();
      }
    }
  }
};
</script>

<style lang="scss">
$opacityColor: rgba(0, 0, 0, 0.45); /**带透明度颜色*/
$smallBorderRadius: 4px; /*全局小圆角大小*/
$whiteColor: #fff;
$titleFontSize: 34px;
$textFontSize: 28px;
$commonBorder: 1px solid rgba(239, 239, 239, 0.7); /*边框颜色*/
$normal: 400; /***表示font-weight*/
$greyColor: #f5f5f9; /*全局背景色*/
.app-modal {
  position: fixed;
  z-index: 99999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  /****toast 样式开始 */
  .modal-toast-mask {
    width: 100%;
    height: 100%;
    background-color: transparent !important;
    .modal-toast-content {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      -webkit-transform: translate(-50%, -50%);
      .modal-toast-message {
        position: relative;
        min-width: 120px;
        border-radius: 6px;
        color: #fff !important;
        font-weight: bold;
        background-color: rgba(58, 58, 58, 0.9);
        line-height: 1.5;
        padding: 18px 30px;
      }
    }
  }
  /****toast 样式结束 */

  /****loading 样式开始 */
  .modal-loading-mask {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2) !important;
    .modal-loading-content {
      position: absolute !important;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      -webkit-transform: translate(-50%, -50%);
      .modal-loading-message {
        display: block;
        margin-top: 100px;
        font-size: 28px;
        margin-left: -50%;
        color: #333;
        text-align: center;
      }
    }
    /*****
    *  自定义loading 样式
    */
    @-webkit-keyframes line-spin-fade-loader {
      50% {
        opacity: 0.3;
      }
      100% {
        opacity: 1;
      }
    }

    @keyframes line-spin-fade-loader {
      50% {
        opacity: 0.3;
      }

      100% {
        opacity: 1;
      }
    }

    .line-spin-fade-loader {
      position: relative;
    }

    .line-spin-fade-loader > div:nth-child(1) {
      top: 40px;
      left: 0;
      -webkit-animation: line-spin-fade-loader 1.2s 0.12s infinite ease-in-out;
      animation: line-spin-fade-loader 1.2s 0.12s infinite ease-in-out;
    }

    .line-spin-fade-loader > div:nth-child(2) {
      top: 27.27272px;
      left: 27.27272px;
      -webkit-transform: rotate(-45deg);
      -ms-transform: rotate(-45deg);
      transform: rotate(-45deg);
      -webkit-animation: line-spin-fade-loader 1.2s 0.24s infinite ease-in-out;
      animation: line-spin-fade-loader 1.2s 0.24s infinite ease-in-out;
    }

    .line-spin-fade-loader > div:nth-child(3) {
      top: 0;
      left: 40px;
      -webkit-transform: rotate(90deg);
      -ms-transform: rotate(90deg);
      transform: rotate(90deg);
      -webkit-animation: line-spin-fade-loader 1.2s 0.36s infinite ease-in-out;
      animation: line-spin-fade-loader 1.2s 0.36s infinite ease-in-out;
    }

    .line-spin-fade-loader > div:nth-child(4) {
      top: -27.27272px;
      left: 27.27272px;
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
      -webkit-animation: line-spin-fade-loader 1.2s 0.48s infinite ease-in-out;
      animation: line-spin-fade-loader 1.2s 0.48s infinite ease-in-out;
    }

    .line-spin-fade-loader > div:nth-child(5) {
      top: -40px;
      left: 0;
      -webkit-animation: line-spin-fade-loader 1.2s 0.6s infinite ease-in-out;
      animation: line-spin-fade-loader 1.2s 0.6s infinite ease-in-out;
    }

    .line-spin-fade-loader > div:nth-child(6) {
      top: -27.27272px;
      left: -27.27272px;
      -webkit-transform: rotate(-45deg);
      -ms-transform: rotate(-45deg);
      transform: rotate(-45deg);
      -webkit-animation: line-spin-fade-loader 1.2s 0.72s infinite ease-in-out;
      animation: line-spin-fade-loader 1.2s 0.72s infinite ease-in-out;
    }

    .line-spin-fade-loader > div:nth-child(7) {
      top: 0;
      left: -40px;
      -webkit-transform: rotate(90deg);
      -ms-transform: rotate(90deg);
      transform: rotate(90deg);
      -webkit-animation: line-spin-fade-loader 1.2s 0.84s infinite ease-in-out;
      animation: line-spin-fade-loader 1.2s 0.84s infinite ease-in-out;
    }

    .line-spin-fade-loader > div:nth-child(8) {
      top: 27.27272px;
      left: -27.27272px;
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
      -webkit-animation: line-spin-fade-loader 1.2s 0.96s infinite ease-in-out;
      animation: line-spin-fade-loader 1.2s 0.96s infinite ease-in-out;
    }

    .line-spin-fade-loader > div {
      background-color: #565c66;
      border-radius: 4px;
      margin: 4px;
      -webkit-animation-fill-mode: both;
      animation-fill-mode: both;
      position: absolute;
      width: 10px;
      height: 30px;
    }
  }
  /****loading 样式结束 */

  /****screen 样式开始  alert  和 confirm*/
  .modal-screen-container {
    .modal-screen-mask {
      position: absolute;
      z-index: -1;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.45) !important;
    }
    .modal-screen-content {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      -webkit-transform: translate(-50%, -50%);
      width: 540px;
      height: auto;
      background: #fff;
      border-radius: 8px;
      .modal-screen-title {
        margin-top: 40px;
        width: 100%;
        text-align: center;
        color: #464646;
        font-size: 36px;
      }
      .modal-screen-message {
        width: 100%;
        color: #464646;
        font-size: 28px;
        line-height: 40px;
        padding: 48px;
        padding-top: 32px;
        text-align: center;
        p {
          width: 100%;
          height: 16px;
          margin: 0;
        }
        span {
          display: inline-block;
          width: 10px;
          margin-right: 14px;
          height: 10px;
          border-radius: 100%;
          background-color: #4a5cff;
        }
      }
      .modal-screen-message-no-title {
        padding-top: 48px !important;
      }
      .modal-screen-button {
        position: relative;
        width: 100%;
        height: 90px;
        text-align: center;
        line-height: 90px;
        font-size: 36px;
        color: #fdd40f;
        border-top: 1px solid #eee;
        box-sizing: border-box;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
      }
      .modal-confirm-button {
        text-align: left;
        white-space: nowrap;
      }
      .modal-confirm-button span {
        display: inline-block;
        width: 50%;
        height: 100%;
        text-align: center;
      }
      .modal-confirm-button span:first-child {
        border-right: 1px solid #eee;
        color: #464646;
        border-bottom-left-radius: 8px;
      }
      .modal-screen-button span:last-child {
        border-bottom-right-radius: 8px;
        color: #fdd40f;
      }
      .modal-button-active:active {
        opacity: 0.8;
      }
    }
  }
  /****screen 样式结算 */
}
.modal-fade-enter-active {
  animation: modal-fade-in 0.3s;
}
.modal-fade-leave-active {
  animation: modal-fade-out 0.3s;
}
@keyframes modal-fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes modal-fade-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
