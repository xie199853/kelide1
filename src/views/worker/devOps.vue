<template>
  <div>
    <!-- 搜索框 -->
    <MyInput :input-arr="inputArr" @clickSelect="selectData" />
    <!-- main -->
    <div class="operation">
      <!-- 按钮 -->
      <el-row class="btn">
        <el-button size="medium" icon="el-icon-circle-plus-outline" class="newBtn" @click="newTask=true" @closeNewTask="closeNewTask">新建</el-button>
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
          label="运维人员"
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
          width="90"
        >
          <template slot-scope="scope">
            <a href="#" class="view-details" @click="showDetail(scope.row.taskId)">查看详情</a>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <MyPagination :total-page="totalPage" :total-count="totalCount" :page-index="pageIndex" @nextPage="changePage" @prePage="changePage" />
      <!-- 新建弹出窗--新增工单 -->
      <Newtask :new-task="newTask" :cope-task="copeData" @closeNewTask="newTask=false;copeData={}" />
      <!-- 查看详情 -->
      <ViewDetials :task-id="selectTaskId" :view-detials="viewDetials" @closeViewDetials="closeViewDetials" @copeNewTask="copeNewTask" />
    </div>
  </div>
</template>

<script>
import MyInput from '@/components/MyInput'
import * as dayjs from 'dayjs'
import MyPagination from '@/components/MyPagination'
import Newtask from './newTask.vue'
import ViewDetials from './ViewDetails.vue'
import { getWorkSearch } from '@/api'
export default {
  components: {
    MyInput,
    MyPagination,
    Newtask,
    ViewDetials
  },
  data() {
    return {
      newTask: false,
      viewDetials: false,
      selectTaskId: '',
      copeData: {},
      inputArr: [{
        title: '工单编号',
        placeholder: '请输入',
        type: 'input',
        value: ''
      }],
      createType: {
        0: '自动',
        1: '手动'
      },
      taskStatus: {
        1: '待办',
        2: '进行',
        3: '取消',
        4: '完成'
      },
      searchWork: null,
      totalPage: '0',
      totalCount: '0',
      pageIndex: '0'
    }
  },
  created() {
    this.getWorkSearch(1)
  },
  methods: {
    async getWorkSearch(pageIndex) {
      try {
        const { data } = await getWorkSearch(pageIndex, this.inputArr[0].value, '', true)
        // console.log(data)
        this.totalPage = data.totalPage
        this.totalCount = data.totalCount
        this.pageIndex = data.pageIndex
        this.searchWork = data.currentPageRecords
      } catch (e) {
        console.log(e)
      }
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
    }
  }
}
</script>

<style style lang="scss" scoped>
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
.btn{
    margin-bottom: 20px;
    width: 100%;
    height: 36px;
   .newBtn{
      font-size: 16px;
      color: #fff;
      background-image: linear-gradient(to bottom right, #ff913f, #ff6021);
    }
}
</style>
