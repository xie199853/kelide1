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
            <el-input-number v-if="scope.row.need" v-model="scope.row.index" controls-position="right" :min="1" :max="scope.row.maxCapacity" />
            <span v-else>货道暂无商品</span>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer btn">
        <el-button class="configurationBtn" @click="closeReplenishmentDetails">取 消</el-button>
        <el-button type="primary" class="newBtn" @click="closeReplenishmentDetails">确 定</el-button>
      </div>
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

<style lang="scss" scoped>
.btn{
    margin-bottom: 20px;
    width: 100%;
    height: 36px;
    .newBtn{
      height: 36px;
      width: 80px;
      font-size: 16px;
      border: none;
      color: #fff;
      background-image: linear-gradient(to bottom right, #ff913f, #ff6021);;
    }
    .configurationBtn{
      height: 36px;
      width: 80px;
      border: none;
      padding: 10px 14px !important;
      text-align: center;
      font-size: 16px;
      background-color: #fbf4f0;
    }
  }
</style>
