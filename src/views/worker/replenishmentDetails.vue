<template>
  <div>
    <el-dialog title="补货详情" :close-on-click-modal="false" :before-close="closeReplenishmentDetails" :visible.sync="replenishmentDetails" :lock-scroll="true">
      <el-table height="400" :header-cell-style="{'background-color': '#f3f6fb'}" :data="channelList">
        <el-table-column property="channelCode" label="货道编号" width="125" />
        <el-table-column
          label="商品名称"
          width="125"
        >
          <template slot-scope="scope">
            {{ scope.row.need? scope.row.sku.skuName :'-' }}
          </template>
        </el-table-column>
        <el-table-column label="当前数量" width="125">
          <template slot-scope="scope">
            {{ scope.row.need? scope.row.currentCapacity :'-' }}
          </template>
        </el-table-column>
        <el-table-column label="还可添加" width="125">
          <template slot-scope="scope">
            {{ scope.row.need? scope.row.canAdd :'-' }}
          </template>
        </el-table-column>
        <el-table-column property="expectCapacity" label="补满数量" width="200">
          <template slot-scope="scope">
            {{ scope.row.need? scope.row.expectCapacity :'货道暂无商品' }}
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
export default {

  props: {
    replenishmentDetails: {
      type: Boolean,
      default: false
    },
    channelList: {
      type: Array,
      default: null
    }
  },
  data() {
    return {

    }
  },
  methods: {
    closeReplenishmentDetails() {
      this.$emit('closeReplenishmentDetails')
    }
  }
}
</script>

<style>

</style>
