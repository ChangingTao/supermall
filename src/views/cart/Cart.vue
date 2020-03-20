<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <!-- 商品的列表 -->
    <cart-list/>
    <!-- 底部汇总 -->
    <cart-bottom-bar/>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import CartList from "./childComps/CartList";
  import CartBottomBar from "./childComps/CartBottomBar";

  import {mapGetters} from 'vuex'


  export default {
    name: "Cart",
    components: {CartBottomBar, CartList, NavBar},
    computed: {
      // Vuex 导入 getters 属性方法进 computed (import {mapGetters} from 'vuex')
      // 第一种：按需导入，引用时必须使用同样的属性名
      ...mapGetters(['cartList', 'cartLength']),
      // 第二种：自定义属性名
      // ...mapGetters({ list: 'cartList', length: 'cartLength'})
    }
  }
</script>

<style scoped>
  .cart {
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
  }
</style>
