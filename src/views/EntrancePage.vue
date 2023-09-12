<script >
import ImageComp from "@/components/imageComp.vue";
import ContainerComp from "@/components/containerComp.vue";
import ApplicationComp from "@/components/applicationComp.vue";
export default {
  components: {ApplicationComp, ContainerComp, ImageComp},
  data() {
    return {
      activeItem: '1',
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      this.activeItem = key
    }
  }
}
</script>

<template>
  <el-row class="tac">
    <el-col :span="4">
      <el-menu
          :default-active="activeItem"
          class="el-menu-vertical-demo"
          @select="handleSelect">
        <el-menu-item index="1">
          <i class="el-icon-folder"></i>
          <span slot="title">镜像管理</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-folder"></i>
          <span slot="title">容器管理</span>
        </el-menu-item>
        <el-menu-item index="3" >
          <i class="el-icon-folder"></i>
          <span slot="title">应用部署</span>
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="16">
      <image-comp v-if="activeItem === '1'"></image-comp>
      <container-comp v-else-if="activeItem === '2'"></container-comp>
      <application-comp v-else></application-comp>
    </el-col>

  </el-row>
</template>

<style>
.el-menu-vertical-demo{
  height: 100vh;
  .el-menu-item{
    font-size: 15px;
  }
}

</style>