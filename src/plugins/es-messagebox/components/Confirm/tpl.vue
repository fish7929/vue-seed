<!--
 * @Description: 
 * @Author: ShirleyLi
 * @Date: 2019-11-29 14:11:17
 * @LastEditors: ShirleyLi
 * @LastEditTime: 2019-11-29 14:13:04
 -->
<template>
    <transition name="es">
        <div
            v-if="show"
            class="es"
            @touchmove="event=>event.preventDefault()"
        >
            <div class="es-popup es-popup-in">
                <div class="es-popup-inner">
                    <div
                        class="es-popup-title"
                        v-if="title"
                    >{{title}}</div>
                    <div class="es-popup-text">{{content}}</div>
                </div>
                <div class="es-popup-buttons">
                    <span
                        class="es-popup-button es-cancel-button"
                        :style="noStyle"
                        @click="cancel"
                    >{{no.text}}</span>
                    <span
                        class="es-popup-button"
                        :style="yesStyle"
                        @click="success"
                    >{{yes.text}}</span>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
import pageChange from '../../mixins';
export default {
  mixins: [pageChange],
  data() {
    return {
      show: false,
      title: '提示',
      content: '',
      style: {},
      yes: {
        text: '确定',
        style: {},
      },
      no: {
        text: '取消',
        style: {},
      },
    };
  },
  computed: {
    yesStyle() {
      let o = {};
      for (let key in this.style) {
        o[key] = this.style[key];
      }
      return Object.assign(o, this.yes.style);
    },
    noStyle() {
      let o = {};
      for (let key in this.style) {
        o[key] = this.style[key];
      }
      return Object.assign(o, this.no.style);
    },
  },
  mounted() {},
  methods: {
    success() {
      this.show = false;
    },
    cancel() {
      this.show = false;
    },
  },
};
</script>