<template>
  <div class="result">
    <div class="stats">
      <span class="label">笔数统计：</span>&nbsp;&nbsp;
      <span class="value">1</span>&nbsp;&nbsp;
      <span class="unit">个</span>
      <span class="label">收入统计：</span>&nbsp;&nbsp;
      <span class="value">1</span>&nbsp;&nbsp;
      <span class="unit">个</span>
      <span class="label">分成统计：</span>&nbsp;&nbsp;
      <span class="value">1</span>&nbsp;&nbsp;
      <span class="unit">个</span>
    </div>
    <div class="table">
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          prop="date"
          label="订单日期"
          width="275"
        />
        <el-table-column
          prop="name"
          label="合作商"
          width="275"
        />
        <el-table-column
          prop="name"
          label="分成比例"
          width="275"
        />
        <el-table-column
          prop="name"
          label="收入（元）"
          width="275"
        />
        <el-table-column
          prop="name"
          label="笔数"
          width="275"
        />
        <el-table-column
          prop="name"
          label="分成金额（元）"
        />
      </el-table>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  }
}
</script>

<style lang="scss" scoped>
.stats{
  background-color: #fff;
  padding: 10px 0 0 18px;
  .label{
    font-size: 14px;
    color: #333;
    font-weight: 500;
  }
  .value{
    font-size: 20px;
    color: #ff5757;
    font-weight: 500;
  }
  .unit{
    margin-right: 50px;
    font-size: 12px;
    color: #000;
  }
}
.table{
  padding: 20px 15px 19px 17px;
  background-color: #fff;
}
</style>
