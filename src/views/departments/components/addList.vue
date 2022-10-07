<template>
  <el-dialog title="新增区域" :visible.sync="dialogFormVisible" width="630px">
    <el-form :model="form" :rules="rules">
      <el-form-item label="区域名称:" label-width="83px" prop="name">
        <el-input v-model="form.name" maxlength="15" show-word-limit placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="备注说明:" :label-width="formLabelWidth" prop="textarea">
        <el-input type="textarea" :rows="4" placeholder="请输入备注（不超过40字）" v-model="form.textarea" maxlength="40" show-word-limit></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button style="background:#fbf4f0;border: none;" @click="dialogFormVisible = false">取 消</el-button>
      <el-button class="btn-qued" type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogFormVisible: true,
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
  }
}

</script>

<style lang="scss" scoped>

::deep(.el-dialog__header){
  background: #fff;
  }
.el-dialog__header{
  background: #fff;
}
.el-input{
  width: 84%;
}
.el-textarea{
  width: 72%;
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
