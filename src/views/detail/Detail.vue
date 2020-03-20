<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
    <detail-bottom-bar @addCart="addToCart"/>
  </div>
</template>

<script>
  import {debounce} from 'common/utils'
  import {itemListenerMixin, backTopMixin} from "common/mixin";
  import {BACK_POSITION} from "common/const";

  import {mapActions} from 'vuex'

  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'
  import BackTop from 'components/content/backTop/BackTop'
  import {getDetail, getRecommend, Goods, Shop, GoodsParam} from 'network/detail'

  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      BackTop,
      Scroll,
      GoodsList,

    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0,
      }
    },
    mixins: [itemListenerMixin, backTopMixin],
    destroyed() {
      this.$bus.$off('itemImgLoad', this.itemImageListener)
    },
    created() {
      // 1.保存输入的id
      this.iid = this.$route.params.iid
      // 2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        const data = res.result
        // 2.1.获取轮播图数据
        this.topImages = data.itemInfo.topImages
        // 2.2. 获取商品的详细信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        // 2.3. 创建店铺信息对象
        this.shop = new Shop(data.shopInfo)
        // 2.4. 保存商品的详情数据
        this.detailInfo = data.detailInfo
        // 2.5. 获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        // 2.6. 取出评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
        /*
          // 1、第一次获取高度，值不对
          // 值不对原因：dom还未渲染
          this.themeTopYs = []
          this.themeTopYs.push(0)
          this.themeTopYs.push(this.$refs.params.$el.offsetTop)
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)

          // 2、第二次获取高度，值不对
          // 值不对原因：图片没有计算在内
          this.$nextTick(() => {
            // 根据最新的数据，对应的 DOM 是已经被渲染出来
            // 但是图片依然是没有加载完（目前获取到 offsetTop 不包含其中的图片）
            // offsetTop值不对的时候，都是因为图片的问题
            this.themeTopYs = []
            this.themeTopYs.push(0)
            this.themeTopYs.push(this.$refs.params.$el.offsetTop)
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
          })
          */
      })
      // 3. 请求推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.list
      })

    },
    methods: {
      ...mapActions(['addCart']),
      imageLoad() {
        this.newRefresh()

        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop - 28.5)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 28.5)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 28.5)
        this.themeTopYs.push(Number.MAX_VALUE)
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100)
      },
      // 监听滚动位置
      contentScroll(position) {
        // 1. 获取Y值
        const positionY = -position.y
        // 2. positionY和主题中的值进行对比
        //[0，7938，9120，9452，非常大的]

        //positoinY在e和7938之间，index=e
        //positoinY在=7938和9120之间，index=1
        //positoiny在9120和9452之间，index=2
        //positoinY在9120和非常大的值之间，index=3
        //positoiny 大于等于9120值，index=3
        let length = this.themeTopYs.length

        for (let i = 0; i < length - 1; i++) {
          if (this.currentIndex !== i &&
            (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])) {
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }
        /*for (let i = 0; i < length; i++) {
          if (this.currentIndex !== i &&
            ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])
              || (i === length - 1 && positionY > this.themeTopYs[i]))) {
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }*/
        // 3. 显示是否回到顶部
        // this.isShowBackTop = (-position.y) > BACK_POSITION
        this.backTopBtn(position)
      },
      // 添加进入购物车
      addToCart() {
        // 1.获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.iid = this.iid

        // 2.将商品放到购物车中 (Vuex), 如果添加商品成功则返回一个内容
        this.addCart(product).then(res => {
          this.$toast.show(res, 2000)
        })

      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px - 58px);
  }
</style>
