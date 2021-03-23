<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchObj.hosname" placeholder="医院名称"/>
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchObj.hoscode" placeholder="医院编号"/>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="loadHospital()">查询</el-button>
    </el-form>
    <!-- 工具条 -->
    <div>
      <el-button type="danger" size="mini" @click="removeRows()">批量删除</el-button>
    </div>
    <!-- banner列表 -->
    <el-table
      :data="list"
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection"/>
      <el-table-column type="index" width="50" label="序号"/>
      <el-table-column prop="hosname" label="医院名称"/>
      <el-table-column prop="hoscode" label="医院编号"/>
      <el-table-column prop="apiUrl" label="api基础路径" width="200"/>
      <el-table-column prop="contactsName" label="联系人姓名"/>
      <el-table-column prop="contactsPhone" label="联系人手机"/>
      <el-table-column label="状态" width="80">
        <template slot-scope="scope">
          {{ scope.row.status === 1 ? '可用' : '不可用' }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="280" align="center">
        <template slot-scope="scope">
          <router-link :to="'/hosp/hospitalSet/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit"/>
          </router-link>

          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)"/>
          <el-button type="primary" v-if="scope.row.status === 1" icon="el-icon-delete" size="mini" @click="lockHostSet(scope.row.id, 0)">锁定</el-button>
          <el-button type="danger" v-if="scope.row.status === 0" size="mini" icon="el-icon-delete" @click="lockHostSet(scope.row.id, 1)">取消锁定</el-button>
        </template>
      </el-table-column>

    </el-table>
    <!-- -->
    <el-pagination class="pagination" :page-size="limit" background layout="prev, pager, next" :total="total" @current-change="currentChange"/>
  </div>
</template>

<script>
import hospitalSetApi from '@/api/hosp/hospitalSet'
export default {
  data() {
    return {
      current: 1,
      limit: 3,
      searchObj: {},
      list: [],
      total: 0,
      selection: []
    }
  },
  created() {
    this.loadHospital()
  },
  methods: {
    loadHospital(page = 1) {
      this.current = page
      hospitalSetApi.getPageList(this.current, this.limit, this.searchObj).then(res => {
        this.list = res.data.records
        this.total = res.data.total
      })
    },
    currentChange(page) {
      this.loadHospital(page)
    },
    removeDataById(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        hospitalSetApi.deleteHospSet(id).then(res => {
          this.loadHospital(1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      })
    },
    removeRows() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const ids = []
        this.selection.forEach((val) => {
          ids.push(val.id)
        })
        hospitalSetApi.removeRows(ids).then(res => {
          this.loadHospital(1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      })
    },
    handleSelectionChange(selection) {
      this.selection = selection
    },
    // 锁定与取消
    lockHostSet(id, status) {
      hospitalSetApi.lockHospSet(id, status).then(res => {
        this.loadHospital()
      })
    }
  }
}
</script>
<style scoped>
.pagination {
  margin-top: 20px;
  text-align: center;
}
</style>
