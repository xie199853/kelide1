<template>
  <el-dialog title="新增区域" :before-close="handleClose" :visible.sync="dialogFormVisible" width="630px">
    <el-form :model="form" :rules="rules">
      <el-form-item label="区域名称:" label-width="83px" prop="name">
        <el-input v-model="form.name" maxlength="15" show-word-limit placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="备注说明:" label-width="83px" prop="textarea">
        <el-input type="textarea" :rows="4" placeholder="请输入备注（不超过40字）" v-model="form.textarea" maxlength="40" show-word-limit></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button style="background:#fbf4f0;border: none;" @click="handleClose">取 消</el-button>
      <el-button class="btn-qued" type="primary" @click="getdirect">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getNewAdditions } from '@/api/departments'
export default {
  props: {
    dialogFormVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        name: '',
        textarea: ''
      },
      rules: {
        name: [{ required: true, message: '区域名称不能为空', trigger: 'blur' },
          { min: 1, max: 15, message: '区域名称要求1-15个字符', trigger: 'blur' }],
        textarea: [{ required: true, message: '备注不能为空', trigger: 'blur' },
          { min: 1, max: 40, message: '备注要求1-50个字符', trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleClose() {
      // 关闭弹窗
      this.$emit('update:dialogFormVisible', false)
    },
    async getdirect() {
      try {
        const res = await getNewAdditions(this.form)
        console.log(res)
        this.$message.success('新增成功')
        this.$parent.getSearchs()
        this.handleClose()
      } catch (error) {
        console.log(error)
      }
    }
  }
}

</script>

<style lang="scss" scoped>

::deep(.el-dialog__header){
  background: #fff;
    background-image: initial;
    background-position-x: initial;
    background-position-y: initial;
    background-size: initial;
    background-repeat-x: initial;
    background-repeat-y: initial;
    background-attachment: initial;
    background-origin: initial;
    background-clip: initial;
    background-color:#fff;
  }
.el-input{
  width: 84%;
}
.el-textarea{
  width: 84%;
}
.btn-qued{
  background: linear-gradient(135deg,#ff9743,#ff5e20)!important;
    background-image: linear-gradient(135deg, rgb(255, 151, 67), rgb(255, 94, 32)) !important;
    background-position-x: initial !important;
    background-position-y: initial !important;
    background-size: initial !important;
    background-repeat-x: initial !important;
    background-repeat-y: initial !important;
    background-attachment: initial !important;
    background-origin: initial !important;
    background-clip: initial !important;
    background-color: initial !important;
    border: none;
}
</style>
