<template>
  <div id="category">
    <nav-bar class="Category-bar">
      <div slot="center">商品分类</div>
    </nav-bar>
    <div class="content">
      <category-tab-menu :categories="categories" @selectItem="selectItem"/>
      <!-- 分类列表 -->
      <scroll id="tab-content" ref="scroll">
        <div>
          <!-- 种类 -->
          <category-tab-content :categoryData="categoryData"/>
          <!-- 综合、新品、销量 -->
          <tab-control :titles="['综合', '新品', '销量']" @tabClick="tabClick"/>
          <category-tab-content-detail :categoryDetail="categoryDetail"/>
        </div>
      </scroll>
    </div>
  </div>
</template>
<script>
  import NavBar from "components/common/navbar/NavBar";
  import Scroll from "components/common/scroll/Scroll";

  import CategoryTabMenu from "./childComps/CategoryTabMenu";
  import CategoryTabContent from "./childComps/CategoryTabContent";

  import {getCategory, getCategoryDetail, getSubcategory} from "network/category";
  import TabControl from "components/content/tabControl/TabControl";

  import {tabControlMixin, itemListenerMixin} from 'common/mixin'
  import {NEW, POP, SELL, BACKTOP_DISTANCE} from "@/common/const";
  import CategoryTabContentDetail from "./childComps/CategoryTabContentDetail";

  export default {
    name: "Category",
    components: {CategoryTabContentDetail, TabControl, CategoryTabContent, Scroll, CategoryTabMenu, NavBar},
    data() {
      return {
        categories: [],
        currentIndex: 0,
        categoryData: [],
        categoryDetail: [],
      }
    },
    mixins: [tabControlMixin, itemListenerMixin],
    created() {
      // 1.请求分类数据
      this._getCategory()
    },
    computed: {},
    watch: {
      currentType: function (type) {
        this._getCategoryDetail(type)
        console.log(type);
      }
    },
    methods: {
      _getCategory() {
        getCategory().then(res => {
          // 1.获取分类数据
          this.categories = res.data.category.list
          // 2.获取当前流行的分类数据
          this._getSubcategories(0)
          // 3.获取 pop 数据
          this._getCategoryDetail(POP)
        })
      },
      _getSubcategories(index) {
        this.currentIndex = index;
        const mailKey = this.categories[index].maitKey;
        getSubcategory(mailKey).then(res => {
          this.categoryData = res.data.list
          this._getCategoryDetail(POP)
        })
      },
      _getCategoryDetail(type) {
        getCategoryDetail(this.categories[this.currentIndex].miniWallkey, type).then(res => {
          this.categoryDetail = res
        })
      },
      /**
       * 事件响应相关的方法
       */
      selectItem(index) {
        this._getSubcategories(index)
      }
    }
  }
</script>

<style scoped>
  #category {
    height: 100vh;
  }

  .Category-bar {
    background-color: var(--color-tint);
    color: #fff;
    z-index: 99;
    position: relative;
  }

  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;

    display: flex;
  }

  #tab-content {
    height: 100%;
    width: calc(100vw - 100px);
    flex: 1;
  }
</style>
