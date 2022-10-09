<template>
  <span>
    <el-button class="add" type="text" @click="xgList">修改</el-button>

    <el-dialog title="修改策略" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules">
        <el-form-item label="策略名称" prop="policyName" :label-width="formLabelWidth">
          <el-input
            v-model="form.policyName"
            type="text"
            placeholder="请输入内容"
            maxlength="15"
            show-word-limit
          />
        </el-form-item>
        <el-form-item label="策略方案" prop="discount" :label-width="formLabelWidth">
          <el-input-number v-model="form.discount" class="num" controls-position="right" :min="1" placeholder="请输入内容" @change="handleChange" />
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
import { reviseVms } from '@/api/strategy'
export default {
  props: {
    currentRow: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
      addList: [],
      form: {
        discount: '',
        policyName: ''
      },
      formLabelWidth: '120px',
      rules: {
        policyName: [{ required: true, trigger: 'blur', message: '请填写' }],
        discount: [{ required: true, trigger: 'blur', message: '请填写' }]
      }
    }
  },
  methods: {
    handleChange() {
      this.num + 1
    },
    xgList() {
      this.dialogFormVisible = true
      this.form = this.currentRow
    },
    async qr() {
      try {
        await reviseVms(this.currentRow)
        this.dialogFormVisible = false
      } catch (error) {
        console.log(error)
      }
    },
    qx() {
      this.dialogFormVisible = false
    }
  }
}
</script>

  <style lang="scss" scoped>
  .add {
      color: #409eff !important;
      font-size: 12px;
  }
  .num {
      width: 100%;
  }
  </style>

