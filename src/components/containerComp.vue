<script>
export default {
  name: 'containerComp',
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
      this.$http.get('/get_list' , {}).then(res => {
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
  <div >
    <el-card class="box-card" style="width: 90%; margin: 50px auto;">
      <el-table
          :data="tableData">
        <el-table-column
            label="名称"
            width="220">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
            label="镜像"
            width="220">
          <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.image }}</span>
          </template>
        </el-table-column>
        <el-table-column
            label="端口号"
            width="220">
          <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.port }}</span>
          </template>
        </el-table-column>
        <el-table-column
            label="状态"
            width="220">
          <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.status}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <i class="el-icon-view icon-container" @click=""></i>
            <i class="el-icon-video-play icon-container" @click=""></i>
            <i class="el-icon-video-pause icon-container" @click=""></i>
            <i class="el-icon-refresh-left icon-container" @click=""></i>
            <i class="el-icon-edit icon-container" @click=""></i>
            <i class="el-icon-delete icon-container" @click=""></i>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
<!--    <h1>容器管理</h1>-->
<!--    <el-button @click="test">测试接口</el-button>-->
  </div>
</template>

<style>
.icon-container{
  margin-right: 10px;
  &:hover{
    color: #409EFF;
  }
}
.el-table__body-wrapper {
  font-size: medium;

}
</style>