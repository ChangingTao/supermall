<template>
  <div class="grid">
    <div class="grid-item" v-for="item in categoryData">
      <a :href="item.link">
        <img :src="item.image" alt="">
      </a>
      <div>{{item.title}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabContentCategory",
    props: {
      categoryData: {
        type: Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 100px 100px;
    padding: 10px 0;
    text-align: center;
    font-size: 12px;
  }

  img {
    border-radius: 50%;
    width: 70px;
    height: 70px;
  }

  .grid-item > div {
    margin-top: 10px;
  }
</style>
