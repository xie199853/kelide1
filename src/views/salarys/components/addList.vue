<template>
  <div>
    <el-button class="add" type="text" icon="el-icon-circle-plus-outline" @click="dialogFormVisible = true">新建</el-button>

    <el-dialog title="新增策略" :visible.sync="dialogFormVisible">
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
  </div>
</template>

<script>
import { addVms } from '@/api/strategy'
export default {
  name: 'AddList',
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
    qx() {
      this.dialogFormVisible = false
      this.form.discount = ''
      this.form.policyName = ''
    },
    async qr() {
      try {
        const { config: { data }} = await addVms(this.form)
        this.addList.push(data)
        this.$emit('qqq')
      } catch (error) {
        console.log(error)
      }
      this.dialogFormVisible = false
      this.form.discount = ''
      this.form.policyName = ''
    }
  }
}
</script>

  <style lang="scss" scoped>
  .add {
      color: #fff !important;
      font-size: 16px;
  }
  .num {
      width: 640px;
  }
  </style>

