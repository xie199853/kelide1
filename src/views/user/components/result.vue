<template>
  <div class="result">
    <el-button v-if="idShowRole" type="primary" icon="el-icon-circle-plus-outline" @click="addRole">新增</el-button>
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        type="index"
        label="序号"
        width="180"
      />
      <el-table-column
        prop="userName"
        label="人员名称"
        width="180"
      />
      <el-table-column
        v-if="idShowRole"
        prop="regionName"
        label="归属区域"
        width="180"
      />
      <el-table-column
        v-if="idShowRole"
        prop="role.roleName"
        label="角色"
      />
      <el-table-column
        v-else
        prop="roleName"
        label="角色"
      />
      <el-table-column
        prop="mobile"
        label="联系电话"
      />
      <el-table-column
        v-if="isWork"
        prop="workCount"
        label="完成工单（本月）"
      />
      <el-table-column
        v-if="isWork"
        prop="progressTotal"
        label="进行中工单"
      />
      <el-table-column
        v-if="isWork"
        prop="cancelCount"
        label="拒绝工单（本月）"
      />
      <el-table-column
        fixed="right"
        label="操作"
        width="100"
      >
        <template slot-scope="scope">
          <el-button v-if="idShowRole" type="text" size="small" @click="editClick(scope.row)">修改</el-button>
          <el-button v-if="idShowRole" type="text" size="small" class="delBtn" @click="delClick(scope.row.id)">删除</el-button>
          <el-button v-if="isWork" type="text" size="small" @click="viewClick(scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { delRoleAPI } from '@/api'
export default {
  props: {
    tableData: {
      type: Array,
      required: true
    },
    idShowRole: {
      type: Boolean,
      default: true
    },
    isWork: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // 修改
    editClick(row) {
      this.$emit('showDialog', true)
      console.log(row)
      this.$emit('editRole', row)
    },
    // 新增
    addRole() {
      this.$emit('showDialog', true)
    },
    // 删除
    async delClick(id) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await delRoleAPI(id)
        this.$emit('delConfirm')
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 查看详情
    viewClick(row) {
      this.$emit('viewRole', row)
    }
  }
}
</script>

<style lang="scss" scoped>
.result{
  padding: 20px 15px 19px 17px;
  background-color: #fff;
  .el-button--primary{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px!important;
    height: 36px;
    padding: 0;
    margin-bottom: 20px;
    background: linear-gradient(135deg,#ff9743,#ff5e20)!important;
    border: none;
  }
  .el-button--text.delBtn{
    color: #ff5a5a;
  }
}
::v-deep .el-table__row {
   height: 44px;
 }
</style>
