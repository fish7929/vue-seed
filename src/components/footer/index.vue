<template>
  <section id='footer-container'>
    <section
      @click="gotoAddress({path: `/shop`})"
      class="guide-item guide-store"
      :class="$route.path.indexOf('shop') !== -1? 'selected':''"
    >
      <div class="icon"></div>
      <span>商城</span>
    </section>
    <section
      @click="gotoAddress('/activity')"
      class="guide-item guide-activity"
      :class="$route.path.indexOf('activity') !== -1? 'selected':''"
    >
      <div class="icon"></div>
      <span>活动</span>
    </section>
    <section
      @click="gotoAddress('/my')"
      class="guide-item guide-my"
      :class="$route.path.indexOf('my') !== -1? 'selected':''"
    >
      <div class="icon"></div>
      <span>我</span>
    </section>
  </section>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
    gotoAddress(path) {
      this.$router.push(path);
    },
  },
};
</script>

<style lang="scss" scoped>
#footer-container {
  position: fixed;
  bottom: -1px;
  z-index: 100;
  width: 100%;
  height: 100px;
  background: #fff;
  display: flex;
  justify-content: space-around;
  box-shadow: 0 -2px 2px 0 #eeeeee;

  .guide-item {
    width: 33.33%;
    height: 100%;
    padding-top: 3px;
    display: inline-block;
    text-align: center;
  }

  .guide-item.selected {
    span {
      color: #f0c416 !important;
    }
  }

  .icon {
    margin: 0 auto;
    width: 60px;
    height: 60px;
  }

  span {
    display: inline-block;
    margin-top: 8px;
    font-size: 24px;
    color: #bec2c9;
    letter-spacing: 0.12px;
  }
  .guide-store {
    .icon {
      background: url(~Images/icons/home.png) no-repeat center;
      background-size: 60px;
    }
  }

  .guide-store.selected {
    .icon {
      background: url(~Images/icons/home-selected.png) no-repeat center;
      background-size: 60px;
    }
  }
  .guide-activity {
    .icon {
      background: url(~Images/icons/activity.png) no-repeat center;
      background-size: 60px;
    }
  }

  .guide-activity.selected {
    .icon {
      background: url(~Images/icons/activity-selected.png) no-repeat center;
      background-size: 60px;
    }
  }

  .guide-my {
    .icon {
      background: url(~Images/icons/user.png) no-repeat center;
      background-size: 60px;
    }
  }

  .guide-my.selected {
    .icon {
      background: url(~Images/icons/user-selected.png) no-repeat center;
      background-size: 60px;
    }
  }
}
</style>
