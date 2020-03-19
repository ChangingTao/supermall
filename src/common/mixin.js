import {debounce} from "./utils";
import BackTop from 'components/content/backTop/BackTop'
import {BACK_POSITION} from "common/const";

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

export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false
    }
  },
  components:{
    BackTop
  },
  methods: {
    backClick(){
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    backTopBtn(position){
      this.isShowBackTop = (-position.y) > BACK_POSITION
    }
  },
}
