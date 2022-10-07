<template>
  <div>
    <el-dialog title="补货详情" :close-on-click-modal="false" :before-close="closeViewTaskDetDialsReplenishment" :visible.sync="showViewTaskDetDialsReplenishment" :lock-scroll="true">
      <el-table height="400" :header-cell-style="{'background-color': '#f3f6fb'}" :data="ReplenishmentData">
        <el-table-column property="channelCode" label="货道编号" width="150" />
        <el-table-column property="skuName" label="商品" width="250" />
        <el-table-column property="expectCapacity" label="补货数量" width="150" />
      </el-table>
    </el-dialog>

  </div>
</template>

<script>
import { getTaskDetails } from '@/api'

export default {

  props: {
    showViewTaskDetDialsReplenishment: {
      type: Boolean,
      default: false
    },
    taskId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      ReplenishmentData: null

    }
  },
  watch: {
    showViewTaskDetDialsReplenishment: function(newQuestion, oldQuestion) {
      if (newQuestion) {
        this.getTaskDetails()
      }
    }

  },
  methods: {
    closeViewTaskDetDialsReplenishment() {
      this.$emit('closeViewTaskDetDialsReplenishment')
    },
    async getTaskDetails() {
      const { data } = await getTaskDetails(this.taskId)
      this.ReplenishmentData = data
      console.log(data)
    }
  }
}
</script>

<style>

</style>
