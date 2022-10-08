<template>
  <div class="search">
    <el-form ref="form" :model="form" inline>
      <el-form-item label="人员搜索：">
        <el-input v-model.trim="form.name" placeholder="请输入" />
      </el-form-item>
      <!-- <el-form-item label="角色：">
        <el-select v-model.trim="form.region" placeholder="请选择">
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="searchBtn">查询</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
export default {
  props: {
    tableData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      form: {
        name: '',
        region: ''
      }
    }
  },
  methods: {
    searchBtn() {
      const arr = this.tableData.filter(item => {
        return (item.userName.indexOf(this.form.name) !== -1)
      })
      this.$emit('searchRes', [arr, false])
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
