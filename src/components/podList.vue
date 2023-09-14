<script>
  export default {
    name: 'podList',
    data() {
      return {
        tableData: [{
          name: 'nginx_test',
          image: 'nginx:latest',
          port: '80',
          status: 'running',
          nodePort: '80',
        }, {
          name: 'nginx_test2',
          image: 'nginx:latest',
          port: '80',
          status: 'running',
          nodePort: '80',
        }, {
          name: 'nginx_test3',
          image: 'nginx:latest',
          port: '80',
          status: 'running',
          nodePort: '80',
        }, {
          name: 'nginx_test4',
          image: 'nginx:latest',
          port: '80',
          status: 'running',
          nodePort: '80',
        }],
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px'
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
<!--  <el-card class="box-card" style="width: 90%; margin: 50px auto;">-->
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
          label="内部访问地址"
          width="280">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.port }}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="外部访问地址"
          width="280">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.port }}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="状态"
          width="280">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.status}}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="修改镜像" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>

<!--  </el-card>-->
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