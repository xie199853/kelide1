<template>
  <div class="result">
    <div class="stats">
      <span class="label">笔数统计：</span>&nbsp;&nbsp;
      <span class="value">{{ strokeCount }}</span>&nbsp;&nbsp;
      <span class="unit">个</span>
      <span class="label">收入统计：</span>&nbsp;&nbsp;
      <span class="value">{{ incomeCount }}</span>&nbsp;&nbsp;
      <span class="unit">元</span>
      <span class="label">分成统计：</span>&nbsp;&nbsp;
      <span class="value">{{ totalBillCount }}</span>&nbsp;&nbsp;
      <span class="unit">元</span>
    </div>
    <div class="table">
      <el-table
        :data="tablePartners"
        style="width: 100%"
      >
        <el-table-column
          prop="date"
          label="订单日期"
          width="275"
        />
        <el-table-column
          prop="ownerName"
          label="合作商"
          width="275"
        />
        <el-table-column
          prop="ratio"
          label="分成比例"
          width="275"
        />
        <el-table-column
          prop="orderTotalMoney"
          label="收入（元）"
          width="275"
        />
        <el-table-column
          prop="orderCount"
          label="笔数"
          width="275"
        />
        <el-table-column
          prop="totalBill"
          label="分成金额（元）"
        />
      </el-table>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    partners: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
    }
  },
  computed: {
    tablePartners() {
      this.partners.forEach(item => {
        item.ratio = `${item.ratio}%`
        item.orderTotalMoney = +`+${(item.orderTotalMoney / 100).toFixed(2)}`
        item.totalBill = +`+${(item.totalBill / 100).toFixed(2)}`
      })
      return this.partners
    },
    strokeCount() {
      const a = this.partners.reduce((sum, item) => {
        sum += item.orderCount
        return sum
      }, 0)
      return a
    },
    incomeCount() {
      const a = this.partners.reduce((sum, item) => {
        sum += item.orderTotalMoney
        return sum
      }, 0)
      return a.toFixed(2)
    },
    totalBillCount() {
      const b = this.partners.reduce((sum, item) => {
        sum += item.totalBill
        return sum
      }, 0)
      return b.toFixed(2)
    }
  },
  methods: {
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
