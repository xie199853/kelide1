<template>
  <span>
    <el-button type="text" size="small" @click="xg">修改</el-button>

    <el-dialog title="修改商品类型" :modal-append-to-body="false" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="商品类型名称" :label-width="formLabelWidth">
          <el-input v-model="form.className" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="qx">取 消</el-button>
        <el-button type="primary" @click="qr">确 定</el-button>
      </div>
    </el-dialog>
  </span>

</template>

<script>
import { reviseClass } from '@/api/shop'
export default {
  props: {
    currentRow: {
      type: Object,
      default: () => ({})
    },
    tableData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      form: {
        className: '',
        classId: 0
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    xg() {
      this.dialogFormVisible = true
      this.form = this.currentRow
    },
    qx() {
      this.dialogFormVisible = false
    },
    async qr() {
      try {
        const { config: { data }} = await reviseClass(this.form)
        this.tabledata = data
      } catch (error) {
        console.log(error)
      }
      this.dialogFormVisible = false
    }
  }
}
</script>

  <style>

  </style>

