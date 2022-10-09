<template>
  <div v-loading="loading" class="user-work">
    <headers
      :table-data="tableData"
      @searchRes="[tableData=$event[0],isShow=$event[1]]"
    />
    <result
      :table-data="tableData"
      @delConfirm="getUserSearch"
      @showDialog="dialogFormVisible = $event"
      @editRole="editRole"
    />
    <MyPagination
      v-if="isShow"
      :total-page="totalPage"
      :total-count="totalCount"
      :page-index="pageIndex"
      @prePage="getUserSearch($event)"
      @nextPage="getUserSearch($event)"
    />
    <addRole
      ref="addRole"
      :table-data="tableData"
      :dialog-form-visible.sync="dialogFormVisible"
      :current-role="currentRole"
      @addConfirm="getUserSearch"
    />
  </div>
</template>

<script>
import headers from './components/headers.vue'
import Result from './components/result.vue'
import MyPagination from '@/components/MyPagination'
import addRole from '@/views/user/components/addRole'
import { userSearch } from '@/api'
export default {
  components: { headers, Result, MyPagination, addRole },
  data() {
    return {
      tableData: [],
      isShow: true,
      pageIndex: '1',
      pageSize: 10,
      totalPage: '',
      totalCount: '',
      dialogFormVisible: false,
      currentRole: {},
      loading: false
    }
  },
  created() {
    this.getUserSearch(this.pageIndex, this.pageSize)
  },
  methods: {
    async getUserSearch(pageIndex, pageSize) {
      try {
        this.loading = true
        const { data } = await userSearch(pageIndex, pageSize)
        this.tableData = data.currentPageRecords
        this.totalCount = data.totalCount
        this.totalPage = data.totalPage
        this.pageIndex = data.pageIndex
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    editRole(row) {
      this.currentRole = row
      this.$refs.addRole.form = row
    }
  }
}
</script>

<style>

</style>
