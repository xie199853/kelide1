<template>
  <div>
    <el-button
      type="text"
      size="small"
      @click="xg"
    >修改</el-button>

    <el-dialog title="收货地址" :modal-append-to-body="false" :visible.sync="dialogFormVisible">
      <el-form :model="form">

        <el-form-item label="商品名称" :label-width="formLabelWidth">
          <el-input v-model="form.skuName" autocomplete="off" show-word-limit maxlength="15" />
        </el-form-item>

        <el-form-item label="品牌" :label-width="formLabelWidth">
          <el-input v-model="form.brandName" autocomplete="off" show-word-limit maxlength="15" />
        </el-form-item>

        <el-form-item label="商品价格" :label-width="formLabelWidth">
          <el-input-number
            v-model="form.price"
            controls-position="right"
            class="num"
            :min="1"
            :step="0.50"
            @change="handleChange"
          />
        </el-form-item>

        <el-form-item label="商品类型" :label-width="formLabelWidth">

          <el-select v-model="form.classId" class="num" placeholder="请选择商品类型">
            <el-option label="饮料" :value="value[0]" />
            <el-option label="零食" :value="value[1]" />
            <el-option label="食品" :value="value[2]" />
            <el-option label="玩具" :value="value[3]" />
            <el-option label="电子产品" :value="value[4]" />
            <el-option label="首饰" :value="value[5]" />
          </el-select>

        </el-form-item>

        <el-form-item label="规格" :label-width="formLabelWidth">
          <el-input v-model="form.unit" autocomplete="off" show-word-limit maxlength="10" />
        </el-form-item>

        <el-form-item label="商品图片" style="margin-left:50px">
          <img style="height:100px;border:1px solid #ccc" :src="form.skuImage" alt="">
          <!-- <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload> -->
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
import { reviseSku } from '@/api/shop'
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
      value: [1, 2, 3, 4, 5, 6]
    }
  },
  methods: {
    handleChange(value) {
      console.log(value)
    },
    xg() {
      this.form = this.currentRow
      console.log(this.currentRow)
      this.dialogFormVisible = true
    },
    async qr() {
      await reviseSku(this.currentRow)
      console.log(this.currentRow)
      if (this.form.classId === this.value) {
        this.value = '["饮料","零食","食品","玩具","电子产品","首饰"]'
      }
      this.dialogFormVisible = false
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
</style>
