<template>
  <div class="dashboard-container" style="width: 1450px">
    <div>
      <span class="text">商品搜索:</span>
      <el-input
        v-model="input"
        class="input"
        placeholder="请输入"
        clearable
      />

      <el-button
        type="primary"
        icon="el-icon-search"
        @click="search"
      >搜索</el-button>
    </div>

    <template>
      <addShopManage />
    </template>

    <div>
      <el-table
        :data="tableData"
        border
        style="width: 90%"
      >
        <el-table-column
          fixed
          type="index"
          prop="date"
          label="序号"
          width="120"
        />
        <el-table-column
          prop="brandName"
          label="商品名称"
          width="200"
        />
        <el-table-column label="商品图片" width="200">
          <template slot-scope="scope">
            <el-image :src="scope.row.skuImage" class="img" style="height:50px;weight:50px" />
          </template>
        </el-table-column>>
        <el-table-column
          prop="skuName"
          label="品牌"
          width="120"
        />
        <el-table-column
          prop="unit"
          label="规格"
          width="120"
        />
        <el-table-column
          prop="price"
          label="商品价格"
          width="120"
        />
        <el-table-column
          prop="skuClass.className"
          label="商品类型"
          width="120"
        />
        <el-table-column
          prop="updateTime"
          label="创建日期"
          width="180"
        />
        <el-table-column
          fixed="right"
          label="操作"
          width="120"
        >
          <template slot-scope="scope">
            <reviseShopManage
              :current-row="scope.row"
              @click="handleClick(scope.row)"
            />
          </template>
        </el-table-column>
      </el-table>
    </div>

    <template>
      <fenye :total-page="totalPage" :page-index="Objs.pageIndex" :total-count="totalCount" @prePage="changePage" @nextPage="changePage" />
    </template>
  </div>
</template>

<script>
import { getSku, searchSku } from '@/api/shop'
import fenye from '@/components/fenye.vue'
import reviseShopManage from './components/reviseShopManage.vue'
import addShopManage from './components/addShopManage.vue'
export default {
  components: {
    fenye,
    reviseShopManage,
    addShopManage
  },
  data() {
    return {
      tableData: [{
        updateTime: '',
        brandName: '',
        skuName: '',
        unit: '',
        skuClass: {},
        skuImage: '',
        price: ''
      }],
      Objs: {
        pageIndex: '1',
        pageSize: '10'
      },
      input: '',
      totalPage: '0',
      totalCount: ''
    }
  },
  async created() {
    this.qqsj()
  },
  methods: {
    prices(row) {
      console.log(row)
    },
    async qqsj() {
      const { data } = await getSku(this.Objs)

      this.tableData = data.currentPageRecords
      this.tableData.map((item, index) => {
        item.price = item.price / 100
      })
      this.totalPage = data.totalPage
      this.totalCount = data.totalCount
    },
    handleClick(row) {
      console.log(row)
    },
    async search() {
      const Obj = {
        pageIndex: 1,
        pageSize: 100,
        skuName: this.input
      }
      try {
        const { data: { currentPageRecords }} = await searchSku(Obj)
        this.tableData = currentPageRecords
      } catch (error) {
        console.log(error)
      }
    },
    changePage(page) {
      this.Objs.pageIndex = page
      this.qqsj()
    }
  }
}
</script>

<style scoped lang="scss">
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
.img {
  margin-left: 60px;
}
</style>
