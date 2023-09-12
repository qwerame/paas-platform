<script>
export default {
  name: 'containerComp',
  methods:{
    async test () {
      this.$http.get('/get_list' , {}).then(res => {
        console.log(res)
      }).catch(err => console.log(err))
    }
  }
}
</script>

<template>
  <div>
    <h1>容器管理</h1>
    <el-button @click="test">测试接口</el-button>
  </div>
</template>

<style scoped>

</style>