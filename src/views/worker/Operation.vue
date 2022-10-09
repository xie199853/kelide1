<template>
  <div>
    <!-- 搜索框 -->
    <div class="search">
      <!-- <MyInput /> -->
      <MyInput :input-arr="inputArr" @clickSelect="selectData" />
    </div>
    <!-- main -->
    <div class="operation">
      <!-- 按钮 -->
      <el-row class="btn">
        <el-button icon="el-icon-circle-plus-outline" class="newBtn" @click="newTask=true" @closeNewTask="closeNewTask">新建</el-button>
        <el-button class="configurationBtn" @click="showSupplyAlertValue">工单配置</el-button>
      </el-row>
      <!-- List -->
      <el-table
        :header-cell-style="{ 'border': 'none' ,'backgroundColor':'#f3f6fb', }"
        :cell-style="{ 'border': 'none' ,'font-size': '16px'}"
        :data="searchWork"
        style="width: 100%"
      >
        <el-table-column
          type="index"
          label="序号"
          width="80"
        />
        <el-table-column
          prop="taskCode"
          label="工单编号"
        />
        <el-table-column
          prop="innerCode"
          label="社备编号"
        />
        <el-table-column
          prop="taskType.typeName"
          label="工单类型"
        />
        <el-table-column
          label="工单方式"
        >
          <template slot-scope="scope">
            {{ createType[scope.row.createType] }}
          </template>
        </el-table-column>
        <el-table-column
          label="工单状态"
        >
          <template slot-scope="scope">
            {{ taskStatus[scope.row.taskStatus] }}
          </template>
        </el-table-column>
        <el-table-column
          prop="userName"
          label="运营人员"
        />
        <el-table-column
          label="创建日期"
        >
          <template slot-scope="scope">
            {{ changeDateStr(scope.row.createTime) }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="100"
        >
          <template slot-scope="scope">
            <a href="#" class="view-details" @click="showDetail(scope.row.taskId)">查看详情</a>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <MyPagination :total-page="totalPage" :total-count="totalCount" :page-index="pageIndex" @nextPage="changePage" @prePage="changePage" />
    </div>
    <!-- 新建弹出窗--新增工单 -->
    <Newtask :new-task="newTask" :cope-task="copeData" @closeNewTask="newTask=false;copeData={}" />
    <!-- 查看详情 -->
    <ViewDetials :task-id="selectTaskId" :view-detials="viewDetials" @closeViewDetials="closeViewDetials" @copeNewTask="copeNewTask" />
    <!-- 工单配置 -->
    <el-dialog title="工单配置" style=" font-weight: 700;" :visible.sync="supplyConfig">

      <span style="margin-left:35px;font-size:15px;">补货警戒线：</span>
      <el-input-number v-model="alertValue.alertValue" controls-position="right" class="input-number" />
      <el-row class="btn" style="text-align: center;margin-top:25px;">
        <el-button class="configurationBtn" style="margin-right:15px;width:90px;height:45px;border:none;" @click="supplyConfig=false">取消</el-button>
        <el-button class="newBtn" style="width:90px;height:45px;border:none;" @click="supplyAlertValue">确认</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getWorkSearch, autoSupplyConfig, supplyAlertValue } from '@/api'
import * as dayjs from 'dayjs'
import MyInput from '@/components/MyInput'
import MyPagination from '@/components/MyPagination'
import Newtask from './newTask.vue'
import ViewDetials from './ViewDetails.vue'
export default {
  components: {
    MyPagination,
    MyInput,
    Newtask,
    ViewDetials
  },
  data() {
    return {
      copeData: {},
      selectTaskId: '',
      inputArr: [
        {
          title: '工单编号',
          placeholder: '请输入',
          type: 'input',
          value: ''
        }, {
          title: '工单状态',
          placeholder: '请选择',
          type: 'select',
          value: '',
          selectItem: [
            {
              lable: '待办中',
              value: 1
            },
            {
              lable: '进行中',
              value: 2
            },
            {
              lable: '已取消',
              value: 3
            },
            {
              lable: '已完成',
              value: 4
            }
          ]
        }
      ],
      searchWork: null,
      taskStatus: {
        1: '待办',
        2: '进行',
        3: '取消',
        4: '完成'
      },
      createType: {
        0: '自动',
        1: '手动'
      },
      totalPage: '0',
      totalCount: '0',
      pageIndex: '0',
      newTask: false,
      viewDetials: false,
      supplyConfig: false,
      alertValue: {
        alertValue: 0
      }
    }
  },
  created() {
    this.getWorkSearch(1)
  },
  methods: {
    async getWorkSearch(pageIndex) {
      const { data } = await getWorkSearch(pageIndex, this.inputArr[0].value, this.inputArr[1].value)
      console.log(data)
      this.totalPage = data.totalPage
      this.totalCount = data.totalCount
      this.pageIndex = data.pageIndex
      this.searchWork = data.currentPageRecords
    },
    changeDateStr(dateStr) {
      return dayjs(dateStr).format('YYYY.MM.DD hh:mm:ss')
    },
    changePage(page) {
      this.getWorkSearch(page)
    },
    selectData() {
      this.getWorkSearch(1)
    },
    closeNewTask() {
      this.newTask = false
    },
    showDetail(taskId) {
      this.selectTaskId = taskId
      this.viewDetials = true
    },
    closeViewDetials() {
      this.viewDetials = false
    },
    copeNewTask(copeData) {
      this.copeData = copeData
      this.newTask = true
    },
    async showSupplyAlertValue() {
      this.supplyConfig = true
      const { data } = await supplyAlertValue()
      this.alertValue.alertValue = data
    },
    async supplyAlertValue() {
      try {
        // console.log(this.alertValue)
        await autoSupplyConfig(this.alertValue)
        this.supplyConfig = false
      } catch (error) {
        throw Error
      }
      // console.log(this.alertValue)
    }
    // async autoSupplyConfig() {
    //   const data = await autoSupplyConfig(this.alertValue)
    //   console.log(data)
    // }
  }
}
</script>

<style lang="scss" scoped>
.search{
  display: flex;
}
.operation{
  border-radius: 5px;
  padding: 20px;
  background-color: #fff;
  .view-details{
    color: blue;
  }

}
.el-select {
    width: 100%;
}
.btn{
    margin-bottom: 20px;
    width: 100%;
    height: 36px;
    .newBtn{
      font-size: 16px;
      color: #fff;
      background-image: linear-gradient(to bottom right, #ff913f, #ff6021);;
    }
    .configurationBtn{
      padding: 10px 14px !important;
      text-align: center;
      font-size: 16px;
      background-color: #fbf4f0;
    }
  }
  .input-number{
    width: 500px;
  }
</style>

<style>
</style>
