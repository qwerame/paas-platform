<template>
  <div>
      <el-tabs type="border-card" style="width: 90%; margin: 50px auto;">
        <el-tab-pane label="私有镜像" style="position: relative">
          <el-table
              :data="tableData"
              style="width: 100%; margin-bottom: 60px;">
            <el-table-column
                label="NAME"
                width="200">
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column
                label="TAG"
                width="200">
              <template slot-scope="scope">
                <span>{{ scope.row.tag }}</span>
              </template>
            </el-table-column>
            <el-table-column
                label="IMAGE_ID"
                width="200">
              <template slot-scope="scope">
                <span>{{ scope.row.image_id }}</span>
              </template>
            </el-table-column>
            <el-table-column
                label="CREATED"
                width="200">
              <template slot-scope="scope">
                <span >{{ scope.row.createdTime }}</span>
              </template>
            </el-table-column>
            <el-table-column
                label="SIZE"
                width="200">
              <template slot-scope="scope">
                <span>{{ scope.row.size }}</span>
              </template>
            </el-table-column>
            <el-table-column label="OPERATE" width="180">
              <template slot-scope="scope">
                <i class="el-icon-view icon-container" @click="handleView(scope.$index, scope.row)"></i>
                <i class="el-icon-edit icon-container" @click="handleEdit(scope.$index, scope.row)"></i>
                <i class="el-icon-delete icon-container" @click="handleDelete(scope.$index, scope.row)"></i>
              </template>
            </el-table-column>
            <el-table-column label="RUN" width="80">
              <template slot-scope="scope">
                <i class="el-icon-caret-right icon-container" @click="handleRun(scope.$index, scope.row)"></i>
              </template>
            </el-table-column>
          </el-table>
          <el-button circle type="primary" icon="el-icon-plus" @click="handleNew()" id="add-icon" >
<!--                     style="margin-left: 1050px"-->
          </el-button>
        </el-tab-pane>
        <el-tab-pane label="共有镜像">
          <el-table
              :data="tableData1"
              style="width: 100%">
            <el-table-column
                label="NAME"
                width="200">
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column
                label="TAG"
                width="200">
              <template slot-scope="scope">
                <span>{{ scope.row.tag }}</span>
              </template>
            </el-table-column>
            <el-table-column
                label="IMAGE_ID"
                width="160">
              <template slot-scope="scope">
                <span>{{ scope.row.image_id }}</span>
              </template>
            </el-table-column>
            <el-table-column
                label="CREATED"
                width="200">
              <template slot-scope="scope">
                <span >{{ scope.row.createdTime }}</span>
              </template>
            </el-table-column>
            <el-table-column
                label="SIZE"
                width="200">
              <template slot-scope="scope">
                <span>{{ scope.row.size }}</span>
              </template>
            </el-table-column>
            <el-table-column label="VIEW" width="200">
              <template slot-scope="scope">
                <i class="el-icon-view icon-container" @click="handleView(scope.$index, scope.row)"></i>
              </template>
            </el-table-column>
            <el-table-column label="RUN" width="80">
              <template slot-scope="scope">
                <i class="el-icon-caret-right icon-container" @click="handleRun(scope.$index, scope.row)"></i>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>

    <el-dialog  title="创建镜像" :visible.sync="dialogNewVisible" max-width="960px">
      <el-tabs type="border-card" style="margin-top: -30px">
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
          </el-upload>
          <el-form :inline="true" :model="DockerfileForm" style="margin-top: 20px">
            <el-form-item label="IMAGE">
              <el-input v-model="DockerfileForm.imageName" style="width: 250px"></el-input>
            </el-form-item>
            <el-form-item label="TAG">
                <el-input v-model="DockerfileForm.imageTag" style="width: 150px"></el-input>
            </el-form-item>
          </el-form>
          <div  style="margin-top: 20px">
            <el-button @click="dialogNewVisible = false">取 消</el-button>
            <el-button type="primary" @click="DockerfileConfirmUpload()">上 传</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="远端" name="second">
          <el-input v-model="input" ></el-input>
          <div  style="margin-top: 20px">
            <el-button @click="dialogNewVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirmUpload()">拉 取</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>

    <el-dialog  title="详细信息" :visible.sync="dialogViewVisible" max-width="960px" style="text-align: left">
      <div style="margin-top: -30px">
        <p v-for="(value,key) in viewItem" :key='key'>{{key}}:{{value}}</p>
      </div>

    </el-dialog>

    <el-dialog  title="修改镜像" :visible.sync="dialogEditVisible" max-width="960px">
      <el-upload
          class="upload-demo"
          drag
          action
          multiple
          :headers="headers"
          :file-list="fileEditList"
          :auto-upload="false"
          :on-change="handleEditChange">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
      <el-form :inline="true" :model="DockerfileEditForm" style="margin-top: 20px">
        <el-form-item label="IMAGE">
          <el-input v-model="DockerfileEditForm.imageName" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="TAG">
          <el-input v-model="DockerfileEditForm.imageTag" style="width: 150px"></el-input>
        </el-form-item>
      </el-form>
      <div  style="margin-top: 20px">
        <el-button @click="dialogEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="DockerfileEditConfirmUpload()">上 传</el-button>
      </div>
    </el-dialog>

    <el-dialog title="启动工作负载" :visible.sync="dialogRunVisible" max-width="960px">
      <el-form  label-width="100px" :model="runPodForm" style="margin-top: -30px">
        <el-form-item label="镜像" style="text-align: left">
          {{runPodForm.image}}
        </el-form-item>
        <el-form-item label="工作负载名称">
          <el-input v-model="runPodForm.name"></el-input>
        </el-form-item>
        <el-form-item label="容器名称">
          <el-input v-model="runPodForm.ctn_name"></el-input>
        </el-form-item>
        <el-form-item label="容器端口">
          <el-input v-model="runPodForm.container_port"></el-input>
        </el-form-item>
        <el-form-item label="副本数">
          <el-input v-model="runPodForm.replicas"></el-input>
        </el-form-item>
        <el-form-item label="环境变量">
          <el-input v-model="runPodForm.environment" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div  style="margin-top: 20px">
        <el-button @click="dialogRunVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmRun()">运 行</el-button>
      </div>
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
      tableData1: [{
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
      viewItem:'',
      fileList:[],
      fileEditList:[],
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      input:'',
      DockerfileForm: {
        imageName: '',
        imageTag: ''
      },
      DockerfileEditForm: {
        imageName: '',
        imageTag: ''
      },
      runPodForm: {
        name: '',
        ctn_name:'',
        image: '',
        environment: '',
        container_port: '',
        replicas: '',
      }
    }
  },
  methods: {
    handleNew(){
      this.dialogNewVisible=true;
    },
    handleView(index, row) {
      this.viewItem=row;
      this.dialogViewVisible=true;
    },
    handleEdit(index, row) {
      this.dialogEditVisible=true;
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleRun(index, row) {
      this.runPodForm.image=row.name;
      this.dialogRunVisible=true;
    },
    handleChange(file, fileList) {
      this.fileList = fileList;
    },
    handleEditChange(file, fileList) {
      this.fileEditList = fileList;
    },
    DockerfileConfirmUpload(){//dockerfile提交
      this.dialogNewVisible=false
    },
    DockerfileEditConfirmUpload(){
      this.dialogEditVisible=false
    },
    confirmUpload(){//远端提交
      this.dialogNewVisible=false
    },
    confirmRun(){
      this.dialogRunVisible=false;
    }
  }
}
</script>

<style scoped>
#add-icon{
  position: absolute;
  bottom: -60px;
  right: 0px;
}
</style>