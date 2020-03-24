<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :titles="['流行','新款','精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-control"
      v-show="isTabFixed"/>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <home-recommend-view :recommends="recommends"/>
      <home-feature-view/>
      <tab-control
        :titles="['流行','新款','精选']"
        @tabClick="tabClick"
        ref="tabControl2"/>
      <goods-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  /** 工具方法 **/
  import {itemListenerMixin, backTopMixin, tabControlMixin} from "common/mixin";
  import {debounce} from 'common/utils'
  import {BACK_POSITION} from "common/const";
  /** 当前组件的子组件 **/
  import HomeSwiper from './childComps/HomeSwiper'
  import HomeRecommendView from './childComps/HomeRecommendView'
  import HomeFeatureView from './childComps/HomeFeatureView'
  /** 公共组件 **/
  import NavBar from 'components/common/navbar/NavBar'
  import Scroll from 'components/common/scroll/Scroll'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import BackTop from 'components/content/backTop/BackTop'
  /** 组件的请求 **/
  import {
    getHomeMultidata,
    getHomeGoods
  } from 'network/home'

  export default {
    name: "Home",
    components: {
      BackTop,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,

      HomeSwiper,
      HomeRecommendView,
      HomeFeatureView,
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0,
      }
    },
    mixins: [itemListenerMixin, backTopMixin, tabControlMixin],
    computed: {
      showGoods() {
        return this.goods[this.currentType].list;
      }
    },
    activated() {
      this.$refs.scroll.refresh()
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
    },
    deactivated() {
      // 1、保存Y值
      this.saveY = this.$refs.scroll.getScrollY()
      // 2、取消全局事件的监听
      this.$bus.$off('itemImgLoad', this.itemImageListener)
    },
    created() {
      // 1、请求多个数据
      this.getHomeMultidata();
      // 2、请求商品数据
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
    },
    /* 因为tabControl的点击事件使用mixin将点击事件的方法导出,没法通过点击事件来让两个tabControl选项相同
    ,所以这里监听 currentType 的变化来让tabControl1和tabControl2选择的内容相等 */
    watch: {
      currentType: function (e) {
        const currentType = ['pop', 'new', 'sell']
        let index = currentType.indexOf(e)
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      }
    },
    methods: {
      /**
       * 事件监听相关的方法
       */
      contentScroll(position) {
        // 1、判断 BackTop 是否显示
        this.backTopBtn(position)
        // 2、决定tabControl是否吸顶(position: fixed)
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      loadMore() {
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad() {
        // 给tabControl高度赋值
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },
      /**
       * 网络请求相关的方法
       */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          // ... 将数组进行解析，将其解析成一个个数据
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1

          // 完成下拉更多
          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>

  #home {
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    /* 在使用浏览器原生滚动时，为了让导航不跟随一起滚动 */
    /*    position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 9;*/
  }

  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }

  /* .content {
     height: calc(100% - 93px);
     overflow: hidden;
     margin-top: 51px;
   }*/
</style>
