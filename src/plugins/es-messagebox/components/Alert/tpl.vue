<template>
    <transition name="es">
        <div v-if="show" class="es" @touchmove="event=>event.preventDefault()">
            <div class="es-popup es-popup-in">
                <div class="es-popup-inner">
                    <div class="es-popup-title" v-if="title">{{title}}</div>
                    <div class="es-popup-text" :style="style" v-html="content"></div>
                </div>
                <div class="es-popup-buttons">
                    <span class="es-popup-button es-popup-button-bold" :style="btn.style" @click="success">
                        {{btn.text}}
                    </span>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
    import pageChange from '../../mixins'
    export default {
        mixins: [pageChange],
        data () {
            return {
                show: false,
                title: '提示',
                content: '',
				style:{},
                btn: {
                    text: '确定',
                    style: {}
                }
            }
        },
        mounted () {
        },
        methods: {
            success () {
                this.show = false;
            }
        }
    }
</script>
