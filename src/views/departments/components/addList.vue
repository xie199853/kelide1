<template>
  <el-dialog class="add" title="新增区域" :visible.sync="dialogFormVisible" width="630px">
    <el-form :model="form" :rules="rules">
      <el-form-item label="区域名称:" label-width="83px" prop="name">
        <el-input v-model="form.name" maxlength="15" show-word-limit placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="备注说明:" :label-width="formLabelWidth" prop="textarea">
        <el-input type="textarea" :rows="4" placeholder="请输入备注（不超过40字）" v-model="form.textarea" maxlength="40" show-word-limit></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button style="background:#fbf4f0;" @click="dialogFormVisible = false">取 消</el-button>
      <el-button style="background:#ff712b;" type="primary" @click="dialogFormVisible = false">确 定</el-button>
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
</style>
