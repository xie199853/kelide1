<template>
  <span>
    <el-button class="button" type="text" @click="tcxq">查看详情</el-button>

    <el-dialog title="策略详情" :visible.sync="dialogTableVisible">
      <el-table :data="gridData">
        <el-table-column type="index" label="序号" width="150" />
        <el-table-column property="nodeName" label="点位名称" width="200" />
        <el-table-column property="innerCode" label="设备编号" />
      </el-table>
    </el-dialog>
  </span>
</template>

<script>
import { vmPolicy } from '@/api/strategy'
export default {
  props: {
    currentRow: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      gridData: [{
        nodeName: '',
        innerCode: ''
      }],
      dialogTableVisible: false,
      dialogFormVisible: false
    }
  },
  methods: {
    async tcxq() {
      this.dialogTableVisible = true
      try {
        const { data: { currentPageRecords }} = await vmPolicy(this.currentRow.policyId)
        this.gridData = currentPageRecords
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

  <style scoped lang="scss">
      .button {
          font-size: 12px;
      }

  </style>

