<template>
  <div class="grid">
    <goods-list-item v-for="(item, index) in categoryDetail"
                     :key="index"
                     :goodsItem="item"
                     :isHome="false"
                     class="goods-list-item"></goods-list-item>
  </div>
</template>

<script>
  import GoodsListItem from 'components/content/goods/GoodsListItem'

  export default {
    name: "CategoryTabContentDetail",
    components: {GoodsListItem},
    props: {
      categoryDetail: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {}
  }
</script>

<style scoped>
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .goods-list-item {
    margin: 0 2px;
  }
</style>
