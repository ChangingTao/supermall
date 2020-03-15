<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    data() {
      return {
        scroll: null
      }
    },
    props: {
      probeType: {
        type: Number,
        default: 0
      },
    },
    mounted() {
      // 1、创建 BScroll 对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        // 限制 div、span等标签的点击事件
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })
      // 2、监听滚动的位置
      this.scroll.on('scroll', (position) => {
        this.$emit('scroll', position)
      })

    },
    methods: {
      scrollTo(x, y, time = 300) {
        this.scroll && this.scroll.scrollTo() && this.scroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp() && this.scroll.finishPullUp()
      },
      refresh() {
        this.scroll && this.scroll.refresh() && this.scroll.refresh()
      }
    }
  }
</script>

<style scoped>

</style>
