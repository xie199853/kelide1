<template>
  <div class="search">
    <el-form ref="form" :model="form" inline>
      <el-form-item label="人员搜索：">
        <el-input v-model.trim="form.name" placeholder="请输入" />
      </el-form-item>
      <el-form-item v-if="isWork" label="角色：">
        <el-select v-model.trim="form.region" placeholder="请选择">
          <el-option
            v-for="item in roleList"
            :key="item.roleId"
            :label="item.roleName"
            :value="item.roleName"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="searchBtn">查询</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
import { getRoleListAPI } from '@/api'
export default {
  props: {
    tableData: {
      type: Array,
      required: true
    },
    isWork: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        name: '',
        region: ''
      },
      roleList: []
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    searchBtn() {
      if (this.isWork) {
        const arr = this.tableData.filter(item => {
          return (item.userName.indexOf(this.form.name) !== -1) && (item.roleName.indexOf(this.form.region) !== -1)
        })
        console.log(arr)
        this.$emit('searchRes', [arr, false])
      } else {
        const arr = this.tableData.filter(item => {
          return (item.userName.indexOf(this.form.name) !== -1)
        })
        this.$emit('searchRes', [arr, false])
      }
    },
    async getRoleList() {
      const { data } = await getRoleListAPI()
      this.roleList = data
    }
  }
}
</script>

<style lang="scss" scoped>
.search{
  display: flex;
    height: 64px;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    margin-bottom: 20px;
    padding-left: 17px;
    align-items: center;
    background-color: #fff;
    .el-form{
      display: flex;
      justify-content: center;
      align-items: center;
      .el-form-item{
        margin-bottom: unset;
        width: 288px;
        height: 36px;
      }
      .el-form-item__label {
          text-align: right;
          vertical-align: middle;
          font-size: 14px;
          font-weight: 500 !important;
          color: #606266;
          padding: 0 12px 0 0;
          box-sizing: border-box;
        }
    }
}
.el-button--primary{
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #5f84ff;
  min-width: 80px;
    height: 36px;
}
::v-deep label {
  font-weight: 500 !important;
}
</style>
