<template>
  <div class="dashboard-container" style="width: 1450px">
    <div>
      <span class="text">商品类型搜索:</span>
      <el-input
        v-model="input"
        class="input"
        placeholder="请输入"
        clearable
      />

      <el-button type="primary" icon="el-icon-search" @click="searchClass">搜索</el-button>
    </div>

    <addShopType @zdsx="qqsj" />

    <div>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column
          fixed
          prop="date"
          type="index"
          label="序号"
          width="200"
        />
        <el-table-column
          prop="className"
          label="商品类型名称"
          width="1000"
        />
        <el-table-column
          fixed="right"
          label="操作"
          width="200"
        >
          <template slot-scope="scope">

            <reviseShopType :table-data="tableData" :current-row="scope.row" @click="handleClick(scope.row)" />
            <el-button type="text" size="small" @click="delshopType(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getSkuClass, delSkuClass, searchClass } from '@/api/shop'
import addShopType from '../attendances/components/addShopType.vue'
import reviseShopType from '../attendances/components/reviseShopType.vue'
export default {
  components: {
    addShopType,
    reviseShopType
  },
  data() {
    return {
      tableData: [{ className: '' }
      ],
      index: 0,
      input: ''
    }
  },
  created() {
    this.qqsj()
  },
  methods: {
    handleClick(row) {
      console.log(row)
    },
    async qqsj() {
      const { data: { currentPageRecords }} = await getSkuClass()
      this.tableData = currentPageRecords
    },
    async delshopType(row) {
      this.tableData.map((item, index) => {
        this.index = index
      })
      try {
        const { data } = await delSkuClass(row.classId)
        if (data === true) {
          // this.$nextTick(() => {
          //   this.tableData.splice(row, 1)
          // })
          this.tableData.splice(row, 1)
        }
        this.qqsj()
      } catch (error) {
        console.log(error)
      }
    },
    async searchClass() {
      const Obj = {
        pageIndex: 1,
        pageSize: 10,
        className: this.input
      }
      try {
        const { data } = await searchClass(Obj)
        this.tableData = data.currentPageRecords
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped lang="less">
.text {
  font-size: 14px;
  color: #606266;
}
.input {
  width: 209px;
  height: 36px;
  margin-right: 10px;
  margin-left: 10px;
}
.newBtn{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    width: 80px!important;
    height: 36px;
    padding: 0;
    background: linear-gradient(135deg,#ff9743,#ff5e20)!important;
    border: none;
    color: #fff !important;
    font-size: 16px;
    margin-top: 50px;
    margin-bottom: 40px;
}
</style>
