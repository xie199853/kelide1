<template>
  <div class="addRole">
    <el-dialog title="新增人员" :visible.sync="dialogFormVisible" :before-close="handleClose">
      <el-form :model="form" :rules="rules">
        <el-form-item label="人员名称:" :label-width="formLabelWidth" prop="userName">
          <el-input
            v-model="form.userName"
            autocomplete="off"
            placeholder="请输入"
            maxlength="5"
            show-word-limit
          />
        </el-form-item>
        <el-form-item label="角色:" :label-width="formLabelWidth" prop="region">
          <el-select v-model="form.roleId" placeholder="请选择">
            <el-option v-for="item in roleList" :key="item.roleId" :label="item.roleName" :value="item.roleId" />
          </el-select>
        </el-form-item>
        <el-form-item label="联系电话:" :label-width="formLabelWidth" prop="mobile">
          <el-input
            v-model="form.mobile"
            autocomplete="off"
            placeholder="请输入"
            maxlength="11"
            show-word-limit
          />
        </el-form-item>
        <el-form-item label="负责区域:" :label-width="formLabelWidth" prop="regionName">
          <el-select v-model="form.regionId" placeholder="请选择" @change="regionChange">
            <el-option
              v-for="item in areaList"
              ref="area"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="头像:" :label-width="formLabelWidth" prop="image">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="form.image" :src="form.image" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
          <div class="el-upload__tip">支持扩展名：jpg、png，文件不得大于100kb</div>
        </el-form-item>
        <el-form-item label="状态:" :label-width="formLabelWidth">
          <el-checkbox v-model="form.status">是否启用</el-checkbox>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="confirm">确 认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getAreaListAPI, getRoleListAPI, addRoleAPI } from '@/api'
export default {
  props: {
    dialogFormVisible: {
      type: Boolean,
      default: false
    },
    tableData: {
      type: Array,
      required: true
    }
  },
  data() {
    const ruleMobile = (rule, value, callback) => {
      const reg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
      console.log(reg.test(value))
      if (reg.test(value)) {
        callback()
      } else {
        callback('手机号格式错误')
      }
    }
    return {
      form: {
        userName: '',
        roleId: '',
        regionId: '',
        mobile: '',
        regionName: '',
        image: '',
        status: true
      },
      areaList: [],
      roleList: [],
      formLabelWidth: '120px',
      rules: {
        userName: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入', trigger: 'blur' },
          { validator: ruleMobile }
        ],
        regionName: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        image: [
          { required: true, message: '请上传', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getAreaList()
    this.getRoleList()
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.form.image = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 100kB!')
      }
      return isJPG && isLt2M
    },
    handleClose() {
      this.$emit('update:dialogFormVisible', false)
    },
    regionChange() {
      this.areaList.forEach(item => {
        if (item.id === this.form.regionId) {
          this.form.regionName = item.name
        }
      })
    },
    // 确认提交
    async confirm() {
      try {
        await addRoleAPI(this.form)
        this.$message.success('新增成功')
        this.$emit('addConfirm')
      } catch (error) {
        this.$message.error('新增失败')
        throw Error
      } finally {
        this.$emit('update:dialogFormVisible', false)
      }
    },
    // 获取区域列表
    async getAreaList() {
      const { data } = await getAreaListAPI(1, 10000)
      this.areaList = data.currentPageRecords
    },
    // 获取角色列表
    async getRoleList() {
      const { data } = await getRoleListAPI()
      this.roleList = data
    }
  }
}

</script>

<style lang="scss" scoped>
::v-deep .el-dialog{
  width: 630px;
  border-radius: 10px;
  margin: 0 auto 50px;
  label{
    font-weight: normal;
  }
  .el-upload {
    position: relative;
    overflow: hidden;
    background: #f3f6fb;
    border: 1px dashed #d8dde3;
    border-radius: 4px;
    cursor: pointer;
    &:hover{
      border:1px dashed #818693
    }
    .avatar-uploader-icon {
        width: 84px;
        height: 84px;
        line-height: 84px;
        text-align: center;
        color: #bac0cd;
      }
      .avatar{
        width: 76px;
        height: 76px;
        margin: 4px;
        display: block;
        -o-object-fit: contain;
        object-fit: contain;
      }
    }
    .el-upload__tip {
  font-size: 14px;
  color: #bac0cd;
}
  .el-form-item {
    margin-bottom: 20px;
}
.el-button{
  width: 80px;
}
.el-button--default{
  background-color: #fbf4f0!important;
    border: none;
    color: #655b56!important;
}
.el-button--primary{
  background: linear-gradient(135deg,#ff9743,#ff5e20)!important;
    border: none;
    margin-left: 34px;
}
.el-form-item__content{
  margin-right: 50px;
  margin-left: 140px;
}
  .el-input {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 100%;
}
  .el-input__inner{
    height: 36px;
    line-height: 36px;
  }
  .el-select{
    width: 100%;
  }
  .el-input__inner:hover {
    border-color: #818693;
}
}
::v-deep .el-dialog__header{
  background-color: transparent;
  .el-dialog__title{
    color: #333;
  }
  .el-dialog__close::before{
    color: #909399;
  }
}.avatar-uploader .el-upload {
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

</style>
