<template>
  <div>
    <button
      @click="handleClick"
      :disabled="disabled"
    >
      {{btnText}}
    </button>
    <span>{{tip}}</span>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'Seckill',
  props: {
    startTime: {
      required: true,
      validator: val => {
        return moment.isMoment(val);
      },
    },
    endTime: {
      required: true,
      validator: val => {
        return moment.isMoment(val);
      },
    },
  },
  data() {
    return {
      start: false,
      end: false,
      done: false,
      tip: '',
      timeGap: 0,
      btnText: '',
    };
  },
  computed: {
    disabled() {
      //当三个异号的时候disable返回真，不可点击，
      // 初始化通过this.updateState确定disable的状态
      return !(this.start && !this.end && !this.done);
    },
  },
  async created() {
    const serverTime = await this.getServerTime();
    this.timeGap = Date.now() - serverTime; //当前时间和服务器时间差
    this.updateState();
    this.timeInterval = setInterval(() => {
      this.updateState();
    }, 1000);
  },
  updated() {
    if (this.end || this.done) {
      clearInterval(this.timeInterval);
    }
  },
  methods: {
    handleClick() {
      alert('提交成功');
      this.done = true;
      this.btnText = '已参加过活动';
    },
    getServerTime() {
      //模拟服务器时间
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          //当前时间慢10秒就是服务器时间
          resolve(new Date(Date.now() - 10 * 1000).getTime()); //跟本地时间差
        }, 0);
      });
    },
    updateState() {
      const now = moment(new Date(Date.now() - this.timeGap)); //当前服务器时间
      const diffStart = this.startTime.diff(now); //开始时间和服务器时间之差
      const diffEnd = this.endTime.diff(now); //结束时间和服务器时间之差
      if (diffStart < 0) {
        this.start = true;
        this.tip = '秒杀已开始';
        this.btnText = '参加';
      } else {
        this.tip = `距离秒杀开始还剩${Math.ceil(diffStart / 1000)}秒`;
        this.btnText = '活动未开始';
      }
      if (diffEnd <= 0) {
        this.end = true;
        if (!this.btnText === '已参加过活动' || this.btnText === '参加') {
          this.tip = '秒杀已结束';
          this.btnText = '活动已结束';
        }
      }
    },
  },
  beforeDestroy() {
    clearInterval(this.timeInterval);
  },
};
</script>

<style lang="scss" scoped>
button[disabled] {
  cursor: not-allowed;
}
</style>