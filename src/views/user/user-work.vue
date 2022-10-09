<template>
  <div class="user-task-stats">
    <headers
      :is-work="true"
      :table-data="tableData"
      @searchRes="[tableData=$event[0],isShow=$event[1]]"
    />
    <result
      :id-show-role="idShowRole"
      :table-data="tableData"
      :is-work="true"
      @viewRole="viewRole"
    />
    <MyPagination
      v-if="isShow"
      :total-page="totalPage"
      :total-count="totalCount"
      :page-index="pageIndex"
      @prePage="getStaffList($event)"
      @nextPage="getStaffList($event)"
    />
    <detail
      ref="detail"
      :user-info="userInfo"
      :current-role="currentRole"
      :dialog-table-visible.sync="dialogTableVisible"
    />
  </div>
</template>

<script>
import headers from './components/headers.vue'
import Result from './components/result.vue'
import { getStaffListAPI, getUserInfoAPI } from '@/api'
import MyPagination from '@/components/MyPagination'
import Detail from './components/detail.vue'
export default {
  components: { headers, Result, MyPagination, Detail },
  data() {
    return {
      isShow: true,
      idShowRole: false,
      isWork: true,
      pageIndex: '1',
      pageSize: 10,
      totalPage: '',
      totalCount: '',
      tableData: [],
      currentRole: {},
      dialogTableVisible: false,
      userInfo: {}
    }
  },
  created() {
    this.getStaffList(this.pageIndex, this.pageSize)
  },
  methods: {
    async getStaffList(pageIndex, pageSize) {
      const { data } = await getStaffListAPI(pageIndex, pageSize)
      this.tableData = data.currentPageRecords
      this.totalCount = data.totalCount
      this.totalPage = data.totalPage
      this.pageIndex = data.pageIndex
    },
    async viewRole(row) {
      const { data } = await getUserInfoAPI(row.userId)
      this.userInfo = data
      this.dialogTableVisible = true
      this.currentRole = row
      this.$refs.detail.show()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
