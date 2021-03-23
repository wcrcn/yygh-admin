<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="医院名称">
        <el-input v-model="hospitalSet.hosname"/>
      </el-form-item>
      <el-form-item label="医院编号">
        <el-input v-model="hospitalSet.hoscode"/>
      </el-form-item>
      <el-form-item label="api基础路径">
        <el-input v-model="hospitalSet.apiUrl"/>
      </el-form-item>
      <el-form-item label="联系人姓名">
        <el-input v-model="hospitalSet.contactsName"/>
      </el-form-item>
      <el-form-item label="联系人手机">
        <el-input v-model="hospitalSet.contactsPhone"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveOrUpdate">{{ this.$route.params.id ? '编辑' : '保存' }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import hospitalSetApi from '@/api/hosp/hospitalSet'
export default {
  data() {
    return {
      hospitalSet: {}
    }
  },
  created() {
    // 获取路由id值 调用接口得到医院设置信息
    if (this.$route.params && this.$route.params.id) {
      const id = this.$route.params.id
      this.getHospSet(id)
    }
  },
  methods: {
    saveOrUpdate() {
      if (this.$route.params.id) {
        hospitalSetApi.updateHospSet(this.hospitalSet).then(res => {
          this.$message({
            type: 'success',
            message: '编辑成功!'
          })
          this.$router.push('/hosp/hospitalSet/list')
        })
      } else {
        hospitalSetApi.saveHospSet(this.hospitalSet).then(res => {
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          this.$router.push('/hosp/hospitalSet/list')
        })
      }
    },
    getHospSet(id) {
      hospitalSetApi.getHospSet(id).then(res => {
        this.hospitalSet = res.data
      })
    }
  }
}
</script>
