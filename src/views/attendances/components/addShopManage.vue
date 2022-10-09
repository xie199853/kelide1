<template>
  <div>
    <el-button
      type="text"
      icon="el-icon-circle-plus-outline"
      class="newBtn"
      @click="xg"
    >新建
    </el-button>

    <el-dialog title="新增商品" :modal-append-to-body="false" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules">

        <el-form-item label="商品名称" :label-width="formLabelWidth" prop="skuName">
          <el-input v-model="form.skuName" autocomplete="off" show-word-limit maxlength="15" />
        </el-form-item>

        <el-form-item label="品牌" :label-width="formLabelWidth" prop="brandName">
          <el-input v-model="form.brandName" autocomplete="off" show-word-limit maxlength="15" />
        </el-form-item>

        <el-form-item label="商品价格" :label-width="formLabelWidth" prop="price">
          <el-input-number
            v-model="form.price"
            controls-position="right"
            class="num"
            :min="1"
            :step="0.50"
            @change="handleChange"
          />
        </el-form-item>

        <el-form-item label="商品类型" :label-width="formLabelWidth" prop="classId">

          <el-select v-model="form.classId" class="num" placeholder="请选择商品类型">
            <el-option label="饮料" :value="value[0]" />
            <el-option label="零食" :value="value[1]" />
            <el-option label="食品" :value="value[2]" />
            <el-option label="玩具" :value="value[3]" />
            <el-option label="电子产品" :value="value[4]" />
            <el-option label="首饰" :value="value[5]" />
          </el-select>

        </el-form-item>

        <el-form-item label="规格" :label-width="formLabelWidth" prop="unit">
          <el-input v-model="form.unit" autocomplete="off" show-word-limit maxlength="10" />
        </el-form-item>

        <el-form-item label="商品图片" style="margin-left:50px" prop="skuImage">
          <!-- <img style="height:100px;border:1px solid #ccc" :src="form.skuImage" alt=""> -->
          <el-upload
            class="upload-demo"
            drag
            action="http://likede2-admin.itheima.net/likede/api/vm-service/sku/fileUpload"
            multiple
          >
            <i class="el-icon-upload" />
            <div slot="tip" class="el-upload__tip">支持扩展名:jpg、png,文件不得大于100kb</div>
          </el-upload>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="qr">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addSku } from '@/api/shop'
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
      form: {
        skuName: '',
        brandName: '',
        price: '',
        classId: '',
        unit: '',
        skuImage: ''
      },
      formLabelWidth: '120px',
      dialogVisible: false,
      value: [1, 2, 3, 4, 5, 6],
      rules: {
        skuName: [{ required: true }],
        brandName: [{ required: true }],
        price: [{ required: true }],
        classId: [{ required: true }],
        unit: [{ required: true }],
        skuImage: [{ required: true }]
      }
    }
  },
  methods: {
    handleChange(value) {
      console.log(value)
    },
    xg() {
      this.dialogFormVisible = true
    },
    async qr() {
      await addSku(this.form)
    }
  }
}
</script>

<style>
.num {
  width: 100%;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .el-upload__tip {
    margin-left: 70px;
    font-size: 14px;
    color: #bac0cd
  }
  .text {
  font-size: 14px;
  color: #606266;
}
.input {
  width: 209px;
  height: 36px;
  margin-right: 10px;
  margin-left: 10px;
}
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
.img {
  margin-left: 60px;
}
</style>

