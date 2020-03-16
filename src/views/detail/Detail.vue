<template>
  <div>{{iid}}</div>
</template>

<script>
  export default {
    name: "Detail",
    data(){
      return{
        iid: null
      }
    },
    activated(){
      this.iid = this.$route.params.iid
      console.log(this.$route.params.iid);
    }
  }
</script>

<style scoped>

</style>
