<template>
  <div class="bottom-bar">
    <div class="check-content" @click="checkClick">
      <check-button :is-checked="isSelectAll" class="check-button"/>
      <span>全选</span>
    </div>
    <div class="price">
        合计：￥<span style="color: red">{{totalPrice}}</span>
    </div>
    <div class="calculate" @click="calcClick">
      去计算 ({{checkedLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton'
  import {mapGetters} from 'vuex'

  export default {
    name: "CartBottomBar",
    components: {CheckButton},
    computed: {
      totalPrice() {
        return this.cartList.filter(item => {
          return item.checked
        }).reduce((previousValue, currentValue) => {
          return previousValue + currentValue.price * currentValue.count
        }, 0).toFixed(2)
      },
      ...mapGetters(['cartList']),
      checkedLength() {
        return this.cartList.filter(item => item.checked).length
      },
      isSelectAll() {
        /* 如果购物车中没有商品则不选中 */
        if (this.cartList.length === 0) return false
        /* 购物车中有商品且其中有个商品不选中则不选中 */
        // 数字取反: 数字为0即为true,否则为false
        // 1. 第一种方法: 使用filter
        // return !(this.cartList.filter(item => !item.checked).length)

        // 2. 第二种方法: 使用find
        // return !this.cartList.find(item => !item.checked)

        // 3. 第三种方法: 普通遍历
        for (let item of this.cartList) {
          if (!item.checked) {
            return false
          }
        }
        return true
      }
    },
    methods: {
      checkClick() {
        if (this.isSelectAll) {    // 全部选中
          this.cartList.forEach(item => item.checked = false)
        } else {    // 全部不选中
          this.cartList.forEach(item => item.checked = true)
        }
      },
      calcClick(){

      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    position: relative;
    display: flex;
    height: 40px;
    bottom: 0;
    background-color: #eee;
    line-height: 40px;
    font-size: 15px;
  }

  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;
  }

  .check-button {
    line-height: 22px;
    margin-right: 5px;
  }

  .price {
    margin-left: 20px;
    flex: 1;
  }

  .calculate {
    width: 90px;
    background-color: red;
    color: #fff;
    text-align: center;
  }
</style>
