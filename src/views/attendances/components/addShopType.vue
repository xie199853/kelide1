<template>
  <div>
    <el-button type="text" icon="el-icon-circle-plus-outline" class="newBtn" @click="dialogFormVisible = true">新建</el-button>

    <el-dialog title="新增商品类型" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules">
        <el-form-item label="商品类型名称:" :label-width="formLabelWidth" prop="className">
          <el-input v-model="form.className" autocomplete="off" maxlength="10" show-word-limit />
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
import { addSkuClass } from '@/api/shop'
export default {
  data() {
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
      currentPageRecords: [],
      form: {
        className: ''
      },
      rules: {
        className: [{ required: true, trigger: 'blur', message: '请填写' }]
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    async qr() {
      try {
        const { data } = await addSkuClass(this.form)
        if (data === true) {
          this.currentPageRecords.push(this.form.className)
          this.$emit('zdsx')
        }
      } catch (error) {
        console.log(error)
      }
      this.dialogFormVisible = false
      this.form.className = ''
    },
    qx() {
      this.dialogFormVisible = false
      this.form.className = ''
    }
  }
}

</script>

  <style scoped lang="scss">
  .newBtn{
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      width: 80px!important;
      height: 36px;
      padding: 0;
      background: linear-gradient(135deg,#ff9743,#ff5e20)!important;
      border: none;
      color: #fff !important;
      font-size: 16px;
      margin-top: 50px;
      margin-bottom: 40px;
  }
  </style>

