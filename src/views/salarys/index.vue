<template>
  <div class="dashboard-container" style="width: 1450px">
    <div>
      <span class="text">策略搜索:</span>
      <el-input
        v-model="input"
        class="input"
        placeholder="请输入内容"
        clearable
      />

      <el-button type="primary" icon="el-icon-search" @click="searchList">搜索</el-button>
    </div>

    <div>
      <addList
        class="newBtn"
        type="danger"
        @qqq="qqsj"
      />
    </div>

    <div class="table">
      <el-table
        border:false
        :data="tableData"
        style="width: 100%"
        height="800px"
      >
        <el-table-column
          fixed
          type="index"
          label="序号"
          width="80"
        />
        <el-table-column
          prop="policyName"
          label="策略名称"
          width="459"
        />
        <el-table-column
          prop="discount"
          label="策略方案"
          width="458"
        />
        <el-table-column
          prop="createTime"
          label="创建日期"
          width="160"
        />
        <el-table-column
          prop="address"
          label="操作"
          width="200"
        >
          <template slot-scope="scope">
            <lookList :current-row="scope.row" @click="handleClick(scope.row)" />
            <reviseList :current-row="scope.row" @click="handleClick(scope.row)" />
            <el-button type="text" size="small" @click="delList">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getVms, delVms, searchVms } from '@/api/strategy'
import addList from './components/addList.vue'
import lookList from './components/lookList.vue'
import reviseList from './components/reviseList.vue'

export default {
  name: 'Dashboard',
  components: {
    addList,
    lookList,
    reviseList
  },
  data() {
    return {
      input: '',
      tableData: [],
      Id: 0
    }
  },
  computed: {
    ...mapGetters(['name'])
  },
  created() {
    this.qqsj()
  },
  methods: {
    handleClick(row) {
      console.log(row)
    },
    async qqsj() {
      try {
        const { data } = await getVms()
        this.tableData = data
      } catch (error) {
        console.log(error)
      }
    },
    async delList() {
      this.tableData.map((item, index) => {
        this.Id = index
      })
      try {
        await delVms(this.tableData[this.Id].policyId)
        this.tableData.splice(this.Id, 1)
      } catch (error) {
        console.log(error)
      }
    },
    async searchList() {
      const Obj = {
        pageIndex: 1,
        pageSize: 10,
        policyName: this.input
      }
      try {
        const { data } = await searchVms(Obj)
        this.tableData = data.currentPageRecords
      } catch (error) {
        console.log(error)
      }
    },
    xgList(scope) {
      console.log(scope)
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>

    <style>
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

.newBtn {
  margin-top: 40px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  width: 80px !important;
  height: 36px;
  padding: 0;
  background: linear-gradient(135deg, #ff9743, #ff5e20) !important;
  border: none;
}
.table {
  margin-top: 20px;
  width: 1400px;
background-color: red;
}
</style>

