<template>
  <div>
    <!-- 搜索框 -->
    <div class="search">
      <!-- <MyInput /> -->
      <MyInput :input-arr="inputArr" @clickSelect="selectData" />
    </div>
    <!-- main -->
    <div class="operation">
      <!-- List -->
      <el-table
        :header-cell-style="{ 'border': 'none' ,'backgroundColor':'#f3f6fb', }"
        :cell-style="{ 'border': 'none' ,'font-size': '16px'}"
        :data="orderData"
        style="width: 100%"
      >
        <el-table-column
          type="index"
          label="序号"
          width="80"
        />
        <el-table-column
          prop="orderNo"
          label="订单编号"
        />
        <el-table-column
          prop="skuName"
          label="商品名称"
        />
        <el-table-column
          label="订单金额"
        >
          <template slot-scope="scope">
            {{ (scope.row.amount/100).toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="innerCode"
          label="设备编号"
        />

        <el-table-column label="订单状态">
          <template slot-scope="scope">
            {{ status[scope.row.status] }}
          </template>
        </el-table-column>
        <el-table-column label="订单日期">
          <template slot-scope="scope">
            {{ changeDateStr(scope.row.createTime) }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="100"
        >
          <template slot-scope="scope">
            <a href="#" class="view-details" @click="showDetail(scope.row)">查看详情</a>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <MyPagination :total-page="totalPage" :total-count="totalCount" :page-index="pageIndex" @nextPage="changePage" @prePage="changePage" />
      <!-- 订单详情 -->
      <el-dialog
        custom-class="custom-class"
        title="订单详情"
        :visible.sync="viewDetials"
        width="630px"
        :close-on-click-modal="false"
        :before-close="close"
      >
        <div class="await">
          <i style="flex:1;font-size:30px;color:#79e192;" class="el-icon-success" />
          <span style="flex:8">{{ status[orderDetails.status] }}</span>
          <div style="flex:4">
            <img src="http://likede2-admin.itheima.net/img/pic_2.3b5af41c.png" alt="">
          </div>
        </div>
        <el-descriptions :content-style="{'font-size':'16px'}" :label-style="{'margin-left':'25px','font-size':'16px'}" :column="2">
          <el-descriptions-item label="订单编号">{{ orderDetails.orderNo }}</el-descriptions-item>
          <el-descriptions-item label="商品名称">{{ orderDetails.skuName }}</el-descriptions-item>
          <el-descriptions-item label="订单金额">{{ (orderDetails.amount/100).toFixed(2) }}</el-descriptions-item>
          <el-descriptions-item label="设备编号">{{ orderDetails.innerCode }}</el-descriptions-item>
          <el-descriptions-item label="创建时间">{{ orderDetails.createTime }}</el-descriptions-item>
          <el-descriptions-item label="完成时间">{{ orderDetails.updateTime }}</el-descriptions-item>
          <el-descriptions-item label="支付方式">{{ orderDetails.payType===1?'支付宝':'微信' }}</el-descriptions-item>
          <el-descriptions-item label="设备地址">{{ orderDetails.addr }}</el-descriptions-item>
        </el-descriptions>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import MyInput from '@/components/MyInput'
import MyPagination from '@/components/MyPagination'

import { getOrder } from '@/api'
import * as dayjs from 'dayjs'

export default {
  components: {
    MyInput,
    MyPagination
  },
  data() {
    return {
      inputArr: [
        {
          title: '工单编号',
          placeholder: '请输入',
          type: 'input',
          value: ''
        },
        {
          title: '选择日期',
          placeholder: '请输入',
          type: 'date',
          value: []
        }
      ],
      pageIndex: '0',
      pageSize: '10',
      orderData: null,
      totalPage: '0',
      totalCount: '0',
      status: {
        0: '创建',
        1: '支付完成',
        2: '出货成功',
        3: '出货失败'
      },
      viewDetials: false,
      orderDetails: {}
    }
  },
  created() {
    this.getOrder(1)
  },
  methods: {
    async getOrder(pageIndex) {
      let startTime = this.inputArr[1].value[0]
      let endTime = this.inputArr[1].value[1]
      if (!startTime) {
        startTime = ''
      }
      if (!endTime) {
        endTime = ''
      }
      const { data } = await getOrder(pageIndex, this.pageSize, this.inputArr[0].value, startTime, endTime)
      this.totalPage = data.totalPage
      this.totalCount = data.totalCount
      this.pageIndex = data.pageIndex
      this.orderData = data.currentPageRecords
    },
    // 搜索
    selectData() {
      this.getOrder(1)
    },
    changeDateStr(dateStr) {
      return dayjs(dateStr).format('YYYY.MM.DD hh:mm:ss')
    },
    showDetail(scope) {
      this.viewDetials = true
      this.orderDetails.status = scope.status
      this.orderDetails.orderNo = scope.orderNo
      this.orderDetails.skuName = scope.skuName
      this.orderDetails.amount = scope.amount
      this.orderDetails.innerCode = scope.innerCode
      this.orderDetails.createTime = this.changeDateStr(scope.createTime)
      this.orderDetails.updateTime = this.changeDateStr(scope.updateTime)
      this.orderDetails.payType = scope.payType
      this.orderDetails.addr = scope.addr
    },
    changePage(page) {
      this.getOrder(page)
    },
    close() {
      this.viewDetials = false
    }
  }
}
</script>

<style lang="scss" scoped>
.operation{
  border-radius: 5px;
  padding: 20px;
  background-color: #fff;
  .view-details{
    color: blue;
  }
}

.await{
display: flex;
justify-content: left;
align-items: center;
width:590px;
height:55px;
background:#f8f8f8;
margin-top:-18px;
margin-bottom:25px;
line-height: 40px;
padding-left:20px;
}
</style>
<style>
.custom-class{
  border-radius: 12px;
}
</style>
