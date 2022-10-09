<template>
  <div class="result">
    <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addRole">新增</el-button>
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
        prop="regionName"
        label="归属区域"
        width="180"
      />
      <el-table-column
        prop="role.roleName"
        label="角色"
      />
      <el-table-column
        prop="mobile"
        label="联系电话"
      />
      <el-table-column
        fixed="right"
        label="操作"
        width="100"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editClick(scope.row)">修改</el-button>
          <el-button type="text" size="small" class="delBtn" @click="delClick(scope.row.id)">删除</el-button>
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
::v-deep .el-table{
  thead {
     color: #666;
    }
    th{
     font-weight: 500;
   }
}
  ::v-deep .el-table th.el-table__cell{
    background-color: #f3f6fb;
  }
::v-deep .el-table__row {
   height: 44px;
 }
</style>
