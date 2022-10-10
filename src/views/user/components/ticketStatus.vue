<template>
  <div class="ticketStatus">
    <div class="head">
      <div class="title">工单状态</div>
      <el-date-picker
        v-model="value1"
        size="small"
        format="yyyy-MM-dd"
        type="daterange"
        range-separator="~"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        class="date-picker"
      />
      <div ref="time" class="week-month-year">
        <span class="item is-checked" @click="tigger">周</span>
        <span class="item" @click="tigger">月</span>
        <span class="item" @click="tigger">年</span>
      </div>
    </div>
    <div class="chart">
      <img src="http://likede2-admin.itheima.net/img/empty.87c4f71b.png" alt="">
      <div class="tips">暂无数据</div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import dayjs from 'dayjs'
export default {
  data() {
    return {
      monthStartTime: '',
      yearStartTime: '',
      weekStartTime: '',
      endTime: '',
      isChecked: false,
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)]
    }
  },
  created() {
    this.getTime()
  },
  methods: {
    tigger() {
    },
    getTime() {
      this.endTime = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
      // 获取当前时间为本周
      // 本周的开始时间  计算今天是这周第几天 周日为一周中的第一天
      this.weekStartTime = moment().weekday(0).format('YYYY-MM-DD HH:mm:ss')
      // 获取本月开始时间
      const start = moment().add('month', 0).format('YYYY-MM') + '-01'
      this.monthStartTime = moment(start).format('YYYY-MM-DD HH:mm:ss')
      // 获取本年开始时间
      this.yearStartTime = moment().startOf('year').format('YYYY-MM-DD HH:mm:ss')
      this.value1 = [this.weekStartTime, this.endTime]
    }
  }
}
</script>

<style lang="scss" scoped>
.ticketStatus{
  display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
    height: calc(75vh - 90px);
    min-height: 542px;
    margin-top: 20px;
    background: #fff;
    padding: 20px;
    border-radius: 20px;
    .head{
      display: flex;
    }
    .title{
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      font-size: 16px;
      font-family: PingFangSC-Semibold,PingFang SC;
      font-weight: 600;
      color: #333;
    }
    .date-picker{
      width: 230px;
    margin-right: 21px;
    }
    .week-month-year {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 129px;
      height: 34px;
      background: rgba(233,243,255,.37);
      border-radius: 10px;
    .item{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 37px;
      height: 25px;
      font-size: 14px;
      color: #9ca3b4;
      cursor: pointer;
    }
    .is-checked{
      background: #fff;
      box-shadow: 0 0 4px 0 rgb(0 0 0 / 11%);
      border-radius: 7px;
      font-weight: 600;
      color: #333;
    }
}
  .chart{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    .tips{
      margin-top: 25px;
      color: #20232a;
      font-size: 14px;
    }
  }
}
</style>
