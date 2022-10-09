<template>
  <el-dialog
    title="人员详情"
    :visible.sync="dialogTableVisible"
    width="630px"
    :before-close="handleClose"
  >
    <div v-loading="loading">
      <el-row class="user-info">
        <el-col :span="9">人员名称：{{ userInfo.userName }}</el-col>
        <el-col :span="7">角色：{{ userInfo.roleName }}</el-col>
        <el-col :span="8">联系电话：{{ userInfo.mobile }}</el-col>
        <el-col :span="24" class="region-name">负责区域：{{ userInfo.regionName }}</el-col>
      </el-row>
      <el-row class="user-work">
        <el-col class="item" :span="5">0</el-col>
        <el-col class="item" :span="5">总工单数</el-col>
        <el-col class="item" :span="5">拒绝工单</el-col>
        <el-col class="item" :span="5">完成工单</el-col>
        <el-col class="item" :span="5">进行中工单</el-col>
      </el-row>
      <el-row class="user-work">
        <el-col class="item" :span="5">本周</el-col>
        <el-col class="item" :span="5">{{ weekTaskReportInfo.total }}</el-col>
        <el-col class="item" :span="5">{{ weekTaskReportInfo.cancelCount }}</el-col>
        <el-col class="item" :span="5">{{ weekTaskReportInfo.workCount }}</el-col>
        <el-col class="item" :span="5">{{ weekTaskReportInfo.progressTotal }}</el-col>
      </el-row>
      <el-row class="user-work">
        <el-col class="item" :span="5">本月</el-col>
        <el-col class="item" :span="5">{{ monthTaskReportInfo.total }}</el-col>
        <el-col class="item" :span="5">{{ monthTaskReportInfo.cancelCount }}</el-col>
        <el-col class="item" :span="5">{{ monthTaskReportInfo.workCount }}</el-col>
        <el-col class="item" :span="5">{{ monthTaskReportInfo.progressTotal }}</el-col>
      </el-row>
      <el-row class="user-work">
        <el-col class="item" :span="5">本年</el-col>
        <el-col class="item" :span="5">{{ yearTaskReportInfo.total }}</el-col>
        <el-col class="item" :span="5">{{ yearTaskReportInfo.cancelCount }}</el-col>
        <el-col class="item" :span="5">{{ yearTaskReportInfo.workCount }}</el-col>
        <el-col class="item" :span="5">{{ yearTaskReportInfo.progressTotal }}</el-col>
      </el-row>
    </div>
  </el-dialog>
</template>

<script>
import { getUserWorkAPI } from '@/api'
import moment from 'moment'
import dayjs from 'dayjs'
export default {
  props: {
    dialogTableVisible: {
      type: Boolean,
      default: false
    },
    userInfo: {
      type: Object,
      required: true
    },
    currentRole: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      monthStartTime: '',
      yearStartTime: '',
      weekStartTime: '',
      endTime: '',
      monthTaskReportInfo: {},
      weekTaskReportInfo: {},
      yearTaskReportInfo: {},
      isRepair: false,
      loading: false
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:dialogTableVisible', false)
    },
    async getTaskReportInfo() {
      try {
        this.loading = true
        const res1 = await getUserWorkAPI(this.userInfo.userId, this.weekStartTime, this.endTime)
        this.weekTaskReportInfo = res1.data
        const res2 = await getUserWorkAPI(this.userInfo.userId, this.monthStartTime, this.endTime)
        this.monthTaskReportInfo = res2.data
        const res3 = await getUserWorkAPI(this.userInfo.userId, this.yearStartTime, this.endTime)
        this.yearTaskReportInfo = res3.data
      } catch (error) {
        throw Error
      } finally {
        this.loading = false
      }
    },
    async show() {
      await this.getTime()
      this.getTaskReportInfo()
      if (this.userInfo.roleName === '运营员') {
        this.isRepair = true
      } else {
        this.isRepair = false
      }
    },
    created() {
      this.getTime()
      this.getTaskReportInfo()
    },
    getTime() {
      this.endTime = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
      // 获取当前时间为本周
      const weekOfday = parseInt(moment().format(this.endTime))
      // 本周的开始时间  计算今天是这周第几天 周日为一周中的第一天
      this.weekStartTime = (moment().subtract(weekOfday, this.endTime).format('YYYY-MM-DD 00:00:00'))
      // 获取本月开始时间
      const start = moment().add('month', 0).format('YYYY-MM') + '-01'
      this.monthStartTime = moment(start).format('YYYY-MM-DD HH:mm:ss')
      // 获取本年开始时间
      this.yearStartTime = moment().startOf('year').format('YYYY-MM-DD HH:mm:ss')
      // console.log(this.endTime, this.weekStartTime, this.monthStartTime, this.yearStartTime)
    }
  }
}
</script>

<style lang="scss" scoped>
.user-info {
    height: 86px;
    padding: 19px 19px 0;
    background: #f3f6fb;
}
::v-deep .el-dialog{
    margin: 0 auto 50px;
    border-radius: 10px;
    .el-dialog__body {
    color: #666;
    font-size: 14px;
    word-break: break-all;
}
    .region-name{
      margin-top: 15px;
    }
    .el-col-5 {
    width: 20%;
}
}
.user-work {
    border-top: 1px solid #d8dde3;
    border-left: 1px solid #d8dde3;
    &:nth-child(2){
      margin-top: 26px;
      background: #f7f8fd;
    }
    &:nth-child(5){
      border-bottom: 1px solid #d8dde3;
    }
    .item{
      line-height: 40px;
      border-right: 1px solid #d8dde3;
      text-align: center;
    }
}
</style>
