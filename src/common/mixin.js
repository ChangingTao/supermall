import {debounce} from "./utils";

export const itemListenerMixin = {
  data() {
    return {
      itemImageListener: null,
      newRefresh: null
    }
  },
  mounted() {
    // 调用防抖动函数
    this.newRefresh = debounce(this.$refs.scroll.refresh, 2);
    // 对监听的事件进行保存
    this.itemImageListener = () => {
      this.newRefresh()
    }
    // 监听图片加载完成
    this.$bus.$on('itemImageLoad', this.itemImageListener)
  }
}
