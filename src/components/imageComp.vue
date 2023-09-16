<template>
  <div>
      <el-tabs type="border-card" style="width: 90%; margin: 50px auto;">
        <el-tab-pane label="私有镜像" style="position: relative">
          <el-table
              :data="tableData"
              style="width: 100%; margin-bottom: 60px;">
            <el-table-column
                label="NAME:TAG"
                width="200">
              <template slot-scope="scope">
                <span>{{ scope.row.tags[0] }}</span>
              </template>
            </el-table-column>
            <el-table-column
                label="IMAGE_ID"
                width="200">
              <template slot-scope="scope">
                <span>{{ scope.row.short_id }}</span>
              </template>
            </el-table-column>
            <el-table-column
                label="CREATED"
                width="200">
              <template slot-scope="scope">
                <span >{{ scope.row.attrs.Created.substr(0, 10) }}</span>
              </template>
            </el-table-column>
            <el-table-column
                label="SIZE"
                width="200">
              <template slot-scope="scope">
                <span>{{ scope.row.attrs.Size }}</span>
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
                label="NAME:TAG"
                width="200">
              <template slot-scope="scope">
                <span>{{ scope.row.tags[0] }}</span>
              </template>
            </el-table-column>
            <el-table-column
                label="IMAGE_ID"
                width="160">
              <template slot-scope="scope">
                <span>{{ scope.row.short_id }}</span>
              </template>
            </el-table-column>
            <el-table-column
                label="CREATED"
                width="200">
              <template slot-scope="scope">
                <span >{{scope.row.attrs.Created.substr(0, 10) }}</span>
              </template>
            </el-table-column>
            <el-table-column
                label="SIZE"
                width="200">
              <template slot-scope="scope">
                <span>{{ scope.row.attrs.Size }}</span>
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
      <div style="margin-top: -30px" >
        <p v-for="(value, index) in viewItem1" v-if="index!=='attrs'">
          {{index}}:{{value}}
        </p>
        <p v-for="(value1,key) in viewItem" :key='key'>{{key}}:{{value1}}</p>
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
          <el-input v-model="runPodForm.port"></el-input>
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
import axios from 'axios'
import qs from 'qs'
export default {
  name: 'imageComp',
  data() {
    return {
      image_list:'',
      tableData: [],
      tableData1: [],
      dialogNewVisible: false,
      dialogViewVisible: false,
      dialogEditVisible: false,
      dialogRunVisible: false,
      viewItem:'',
      viewItem1:'',
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
        port: '',
        replicas: '',
      }
    }
  },
  methods: {
    listImage() {
      this.$http.post('/list_images' , {}).then(res => {
        this.image_list=res.data;
        this.tableData=[];
        this.tableData1=[];
        console.log(this.image_list)
        for (let i = 0; i < this.image_list.length; i++) {
          let a = this.image_list[i];
          if (!a.isPublic) {
            this.tableData.push(this.image_list[i])
          }else {
            this.tableData1.push(this.image_list[i])
          }
        }
      }).catch(err => console.log(err))
    },
    handleNew(){
      this.dialogNewVisible=true;
    },
    handleView(index, row) {
      this.viewItem=row.attrs;
      this.viewItem1=row;
      this.dialogViewVisible=true;
    },
    handleEdit(index, row) {
      this.dialogEditVisible=true;
    },
    handleDelete(index, row) {
      let form = new FormData();
      form.append('tag', row.tags[0]);
      this.$confirm('此操作将永久删除该镜像, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post('/remove_image' , form).then(res => {
          this.listImage();
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(err => console.log(err))
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    handleRun(index, row) {
      this.runPodForm.image=row.tags[0];
      this.dialogRunVisible=true;
    },
    handleChange(file, fileList) {
      this.fileList = fileList;
    },
    handleEditChange(file, fileList1) {
      this.fileEditList = fileList1;
    },
    DockerfileConfirmUpload(){//dockerfile提交
      let form = new FormData();
      this.fileList.forEach(
          (val, index) => {
            form.append("dockerfile", val.raw);
          }
      );
      let tag1=this.DockerfileForm.imageName+":"+this.DockerfileForm.imageTag;
      form.append('tag', tag1);
      this.$http.post('/build_image', form).then(res => {
        this.$message({
          type: 'success',
          message: '构建成功!'
        });
        this.listImage();
      }).catch(err => console.log(err))
      this.$http2.post('/build_image', form).then(res => {
        this.listImage();
      }).catch(err => console.log(err))
      this.$http3.post('/build_image', form).then(res => {
        this.listImage();
      }).catch(err => console.log(err))
      this.dialogNewVisible=false
    },
    DockerfileEditConfirmUpload(){
      let form = new FormData();
      this.fileEditList.forEach(
          (val, index) => {
            form.append("dockerfile", val.raw);
          }
      );
      let tag2=this.DockerfileEditForm.imageName+":"+this.DockerfileEditForm.imageTag;
      form.append('tag', tag2);
      this.$http.post('/edit_image', form).then(res => {
        this.$message({
          type: 'success',
          message: '构建成功!'
        });
        this.listImage();
      }).catch(err => console.log(err))
      this.$http2.post('/edit_image', form).then(res => {
        this.listImage();
      }).catch(err => console.log(err))
      this.$http3.post('/edit_image', form).then(res => {
        this.listImage();
      }).catch(err => console.log(err))
      this.dialogEditVisible=false
    },
    confirmUpload(){//远端提交
      let form = new FormData();
      form.append('name', this.input);
      this.$http.post('/pull_image', form).then(res => {
        this.$message({
          type: 'success',
          message: '拉取成功!'
        });
        this.listImage();
      }).catch(err => console.log(err))
      this.dialogNewVisible=false
    },
    confirmRun(){
      let form = new FormData();
      form.append('name', this.runPodForm.name);
      form.append('replicas', this.runPodForm.replicas);
      form.append('ctn_name', this.runPodForm.ctn_name);
      form.append('image', this.runPodForm.image);
      form.append('port', this.runPodForm.port);
      form.append('env', this.runPodForm.environment);
      this.$http.post('/run_deployment', form).then(res => {
        this.$message({
          type: 'success',
          message: '启动成功!'
        });
        console.log(res.data.msg)
      }).catch(err => console.log(err))
      this.dialogRunVisible=false;
    }
  },
  async mounted() {
    await this.listImage();
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