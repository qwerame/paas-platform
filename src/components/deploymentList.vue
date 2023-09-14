<script>
  export default {
  name: 'podList',
  data() {
    return {
      tableData: [{
        name: 'nginx_test',
        image: 'nginx:latest',
        time: 'Thu, 14 Sep 2023 02:31:14 GMT',
        replicas: '3/3',
      }, {
        name: 'nginx_test2',
        image: 'nginx:latest',
        time: 'Thu, 14 Sep 2023 02:31:14 GMT',
        replicas: '3/3',
      }, {
        name: 'nginx_test3',
        image: 'nginx:latest',
        time: 'Thu, 14 Sep 2023 02:31:14 GMT',
        replicas: '3/3',
      }, {
        name: 'nginx_test4',
        image: 'nginx:latest',
        time: 'Thu, 14 Sep 2023 02:31:14 GMT',
        replicas: '3/3',
      }],
      dialogFormVisible: false,
      form: {
        name: '',
      },
      formLabelWidth: '80px'
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
      this.$confirm('此操作将永久删除该工作负载, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    handleStart() {

    },
    handleDetail() {

    },
    handleStop() {

    },

  }
}
</script>

<template>
  <div>
    <el-table
        :data="tableData">
      <el-table-column
          label="名称"
          width="280">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="镜像"
          width="280">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.image }}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="创建时间"
          width="280">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.time }}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="副本状态"
          width="280">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.replicas}}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="操作"
          width="280">
        <template slot-scope="scope">
          <i class="el-icon-video-play icon-container" @click=""></i>
          <i class="el-icon-video-pause icon-container" @click=""></i>
          <i class="el-icon-edit icon-container" @click="dialogFormVisible = true"></i>
          <i class="el-icon-delete icon-container" @click="handleDelete"></i>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="修改镜像" :visible.sync="dialogFormVisible" style="width: 1000px;margin: auto">
      <el-form :model="form">
        <el-form-item label="新镜像名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped>

</style>