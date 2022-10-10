<template>
  <div class="search">
    <div class="title">合作商：</div>
    <el-select v-model="form.partner" placeholder="请选择">
      <el-option
        v-for="item in Partners"
        :key="item.value"
        :label="item.name"
        :value="item.name"
      />
    </el-select>
    <div class="title">日期：</div>
    <el-date-picker
      v-model="form.value1"
      size="small"
      format="yyyy-MM-dd"
      value-format="yyyy-MM-dd"
      type="daterange"
      range-separator="~"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      class="date-picker"
    />
    <el-button
      type="primary"
      icon="el-icon-search"
      @click="searchBtn"
    >查询</el-button>
  </div>

</template>

<script>
import { getPartnersAPI } from '@/api'
// import moment from 'moment'
export default {
  props: {
    form: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      // form: {
      //   partner: '',
      //   value1: [moment(moment().add('month', 0).format('YYYY-MM') + '-01').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]
      // },
      roleList: [],
      pageIndex: '1',
      pageSize: 10,
      Partners: []
    }
  },
  created() {
    this.getPartners(this.pageIndex, this.pageSize)
  },
  methods: {
    searchBtn() {
      this.$emit('selectData', this.form)
    },
    async getPartners(pageIndex, pageSize) {
      const { data } = await getPartnersAPI(pageIndex, pageSize)
      this.Partners = data.currentPageRecords
    }
  }
}
</script>

<style lang="scss" scoped>
.search{
  display: flex;
    min-height: 64px;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 20px;
    padding-left: 17px;
    align-items: center;
    background-color: #fff;
    .title{
      font-size: 14px;
      color: #606266;
      box-sizing: border-box;
      padding: 0 12px 0 0;
      &:nth-of-type(3){
        padding: 0px 12px 0 10px;
     }
    }
    .el-button--primary{
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #5f84ff;
      min-width: 80px;
      margin-left: 10px;
      height: 36px;
    }
  }
  ::v-deep .el-range-input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: none;
    outline: none;
    display: inline-block;
    height: 100%;
    margin: 0;
    padding: 0;
    width: 39%;
    text-align: center;
    color: #606266;
}
::v-deep .el-input__inner{
  height: 36px;
}
</style>
