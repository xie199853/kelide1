<template>
  <div>
    <!-- 区域搜索 -->
    <div class="level">
      <span style="padding: 10px;">区域搜所:</span>
      <el-input
        v-model="input"
        placeholder="请输入内容"
        clearable
        style="width:206px; padding: 10px;"
      />
      <el-button type="primary" icon="el-icon-search">搜索</el-button>
    </div>
    <!-- 新建 -->
    <div class="list-container">
      <!-- 按钮 -->
      <div class="button"><el-button type="warning" icon="el-icon-circle-plus-outline">新建</el-button></div>
      <!-- 内容 -->
      <el-table
        ref="singleTable"
        :data="tableData"
        highlight-current-row
        style="width: 100%"
        @current-change="handleCurrentChange"
      >
        <el-table-column
          label="序号"
          type="index"
          width="80"
        />
        <el-table-column
          property="name"
          label="区域名称"
          width="270"
        />
        <el-table-column
          property="nodeCount"
          label="点位数"
          width="270"
        />
        <el-table-column
          property="remark"
          label="备注说明"
          width="270"
        />
        <el-table-column
          label="操作"
        >
          <el-button type="text">查看详情</el-button>
          <el-button type="text">修改</el-button>
          <el-button type="text" style="color:red;">删除</el-button>

        </el-table-column>
      </el-table>
      <el-row :gutter="24" style="margin-top: 20px;">
        <el-col :span="20"><span>共{{ totalCount }}条记录  第 {{ pageIndex+'/'+totalPage }} 页</span></el-col>
        <el-col :span="4"><span>
          <el-button type="primary" size="mini" plain :disabled="pageIndex === '1'? true:false">上一页</el-button>
          <el-button type="primary" size="mini" plain :disabled="pageIndex === totalPage?true:false">下一页</el-button>
        </span></el-col>
      </el-row>
    </div>
    <addList></addList>
  </div>
</template>

<script>
import { getSearch } from '@/api/attendances'
import addList from './components/addList'
export default {
  components: {
    addList
  },
  data() {
    return {
      input: '', // 搜索内容
      tableData: [], // 数据
      currentRow: null, // 默认选中
      pageIndex: '', // 当前页码
      pageSize: '', // 每页数量
      totalCount: '', // 总数量
      totalPage: '' // 总页数
    }
  },
  created() {
    this.getSearchs()
  },
  methods: {
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row)
    },
    handleCurrentChange(val) {
      this.currentRow = val
    },
    async getSearchs() {
      const { data } = await getSearch()
      console.log(data)
      this.tableData = data.currentPageRecords
      this.pageIndex = data.pageIndex
      this.pageSize = data.pageSize
      this.totalCount = data.totalCount
      this.totalPage = data.totalPage
    }
  }
}
</script>

<style lang="scss" scoped>
  .level{
    font-size: 14px;
    height: 64px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    height: 64px;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    margin-bottom: 20px;
    padding-left: 17px;
    background-color: #fff
  }
  .list-container {
    padding: 20px 15px 19px 17px;
    background-color: #fff;
  }
</style>
