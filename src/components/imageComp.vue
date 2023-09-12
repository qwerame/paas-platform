<template>
  <div>
    <el-row class="tac">
      <el-col :span="20">
        <h1 style="margin-top: 0">镜像管理</h1>
      </el-col>
      <el-col :span="4">
        <el-button
            type="primary"
            icon="el-icon-circle-plus"
            @click="handleNew()">NEW</el-button>
      </el-col>
    </el-row>
    <el-table
        :data="tableData"
        stripe
        style="width: 100%">
      <el-table-column
          label="NAME"
          width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="TAG"
          width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.tag }}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="IMAGE_ID"
          width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.image_id }}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="CREATED"
          width="180">
        <template slot-scope="scope">
          <span >{{ scope.row.createdTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="SIZE"
          width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.size }}</span>
        </template>
      </el-table-column>
      <el-table-column label="OPERATE" width="240">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="info"
              icon="el-icon-view"
              @click="handleView(scope.$index, scope.row)"></el-button>
          <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"></el-button>
          <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="handleDelete(scope.$index, scope.row)"></el-button>
        </template>
      </el-table-column>
      <el-table-column label="RUN" width="80">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="primary"
              icon="el-icon-caret-right"
              @click="handleRun(scope.$index, scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog  :visible.sync="dialogNewVisible" max-width="960px">
      <el-tabs type="border-card">
        <el-tab-pane label="Dockerfile">
          <el-upload
              class="upload-demo"
              drag
              action
              multiple
              :headers="headers"
              :file-list="fileList"
              :auto-upload="false"
              :on-change="handleChange">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传Dockerfile文件</div>
          </el-upload>
          <div  style="margin-top: 20px">
            <el-button @click="dialogNewVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirmUpload()">上 传</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>

    <el-dialog  :visible.sync="dialogViewVisible" max-width="960px">

    </el-dialog>

    <el-dialog  :visible.sync="dialogEditVisible" max-width="960px">

    </el-dialog>

    <el-dialog  :visible.sync="dialogRunVisible" max-width="960px">

    </el-dialog>

  </div>
</template>

<script>
export default {
  name: 'imageComp',
  data() {
    return {
      tableData: [{
        name: 'ubuntu',
        tag:'latest',
        image_id:'ba6acccedd29',
        createdTime:'5 months ago',
        size:'100M',
      }, {
        name: 'ubuntu',
        tag:'latest',
        image_id:'ba6acccedd30',
        createdTime:'5 months ago',
        size:'100M',
      }, {
        name: 'ubuntu',
        tag:'latest',
        image_id:'ba6acccedd31',
        createdTime:'5 months ago',
        size:'100M',
      }, {
        name: 'ubuntu',
        tag:'latest',
        image_id:'ba6acccedd32',
        createdTime:'5 months ago',
        size:'100M',
      }],
      dialogNewVisible: false,
      dialogViewVisible: false,
      dialogEditVisible: false,
      dialogRunVisible: false,
      fileList:[],
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  },
  methods: {
    handleNew(){
      this.dialogNewVisible=true;
    },
    handleView(index, row) {
      console.log(index, row);
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleRun(index, row) {
      console.log(index, row);
    },
    handleChange(file, fileList) {
      this.fileList = fileList;
    },
    confirmUpload(){
      this.dialogNewVisible=false
    },
  }
}
</script>

<style scoped>

</style>