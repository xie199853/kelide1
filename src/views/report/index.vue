<template>
  <div v-loading="loading" class="report">
    <show-head />
    <div class="content">
      <headers :form.sync="form" :loading.sync="loading" @selectData="getPartnerCollect($event.value1[0], $event.value1[1],pageIndex,pageSize)" />
      <result :partners="partners" />
      <MyPagination
        v-if="isShow"
        :page-index="pageIndex"
        :total-count="totalCount"
        :total-page="totalPage"
        @prePage="getPartnerCollect(form.value1[0], form.value1[1],$event,pageSize)"
        @nextPage="getPartnerCollect(form.value1[0], form.value1[1],$event,pageSize)"
      />
    </div>
  </div>
</template>

<script>
import Result from './components/result.vue'
import Headers from './components/headers.vue'
import showHead from './components/showHead.vue'
import { getPartnerCollectAPI } from '@/api'
import moment from 'moment'
import MyPagination from '@/components/MyPagination/index.vue'
export default {
  name: 'Report',
  components: { showHead, Headers, Result, MyPagination },

  data() {
    return {
      partners: [],
      pageIndex: '1',
      pageSize: 10,
      totalCount: '',
      totalPage: '',
      isShow: false,
      loading: false,
      form: {
        partner: '',
        value1: [moment(moment().add('month', 0).format('YYYY-MM') + '-01').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]
      }
    }
  },

  mounted() {

  },
  created() {
    this.getPartnerCollect(this.form.value1[0], this.form.value1[1], this.pageIndex, this.pageSize)
  },
  methods: {
    async getPartnerCollect(start, end, pageIndex, pageSize) {
      try {
        this.loading = true
        const { data } = await getPartnerCollectAPI(start, end, pageIndex, pageSize)
        this.partners = data.currentPageRecords
        this.pageIndex = data.pageIndex
        this.pageSize = data.pageSize
        this.totalCount = data.totalCount
        this.totalPage = data.totalPage
        if (this.partners.length >= 10) {
          this.isShow = true
        }
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.content{
  background-color: #fff;
}
</style>
