<script>
import PodList from "@/components/podList.vue";
import DeploymentList from "@/components/deploymentList.vue";

export default {
  name: 'containerComp',
  components: {DeploymentList, PodList},
  data() {
    return {
      tableData: [{
        name: 'nginx_test',
        image: 'nginx:latest',
        port: '80',
        status: 'running',
      }, {
        name: 'nginx_test2',
        image: 'nginx:latest',
        port: '80',
        status: 'running',
      }, {
        name: 'nginx_test3',
        image: 'nginx:latest',
        port: '80',
        status: 'running',
      }, {
        name: 'nginx_test4',
        image: 'nginx:latest',
        port: '80',
        status: 'running',
      }]
    }
  },
  methods:{
    async test () {
      this.$http.post('/list_node' , {}).then(res => {
        console.log(res)
      }).catch(err => console.log(err))
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
}
</script>

<template>
  <el-tabs type="border-card" style="width: 90%; margin: 50px auto;">
    <el-tab-pane label="pod">
      <el-button @click="test">ceshi</el-button>
      <pod-list></pod-list>
    </el-tab-pane>
    <el-tab-pane label="deployment">
      <deployment-list></deployment-list>
    </el-tab-pane>
  </el-tabs>
</template>

<style>

</style>