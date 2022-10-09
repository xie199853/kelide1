<template>
  <div>
    <!-- 新建弹出窗--新增工单 -->
    <el-dialog
      title="新增工单"
      :visible.sync="newTask"
      width="630px"
      :close-on-click-modal="false"
      :before-close="closeNewTask"
    >
      <el-form ref="form" :model="taskData" class="myDialog" :rules="rules">
        <!-- 文本框 -->
        <el-form-item label="设备编号：" prop="innerCode" :label-width="formLabelWidth">
          <el-input v-model="taskData.innerCode" autocomplete="off" placeholder="请输入" @input="getOperatorList" />
        </el-form-item>
        <!-- 下拉选择 -->
        <el-form-item label="工单类型：" prop="productType" :label-width="formLabelWidth">
          <el-select v-model="taskData.productType" placeholder="请选择">
            <el-option label="补货工单" value="2" />
          </el-select>
        </el-form-item>
        <!-- 补货数量 -->
        <el-form-item style="color:#6487ff;;" label="补货数量：" :label-width="formLabelWidth">
          <span class="el-icon-edit-outline" style="margin-right:5px;font-size:16px" />
          <a style="font-size:15px" @click="showReplenishmentDetails">补货清单</a>
        </el-form-item>
        <!-- 下拉选择 -->
        <el-form-item label="运营人员：" :label-width="formLabelWidth" prop="userId">
          <el-select v-model="taskData.userId" placeholder="请选择">
            <el-option v-for="(item,index) in taskUser" :key="index" :label="item.userName" :value="item.userId" />
          </el-select>
        </el-form-item>
        <!-- 文本域 -->
        <el-form-item label="备注：" :label-width="formLabelWidth" prop="desc">
          <el-input v-model="taskData.desc" type="textarea" autocomplete="off" />
        </el-form-item>

        <el-form-item class="btn">
          <el-button type="primary" class="newBtn" @click="submitForm">立即创建</el-button>
          <el-button class="configurationBtn" @click="resetForm">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 新建弹出窗--补货详情 -->
    <replenishmentDetails :channel-list="taskData.details" :replenishment-details="replenishmentDetails" @closeReplenishmentDetails="closeReplenishmentDetails" />
  </div>
</template>

<script>
import replenishmentDetails from './replenishmentDetails.vue'
import { getChannelList, getOperatorList, createTask } from '@/api'

export default {
  components: {
    replenishmentDetails
  },
  props: {
    newTask: {
      type: Boolean,
      default: false
    },
    copeTask: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      taskData: {
        assignorId: 40,
        createType: 1,
        innerCode: '',
        userId: '',
        productType: '',
        desc: '',
        details: [],
        region: ''
      },
      taskUser: [],
      formLabelWidth: '100px',
      rules: {
        innerCode: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        productType: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        userId: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请输入', trigger: 'blur' }
        ]
      },
      replenishmentDetails: false,
      channelList: null
    }
  },
  watch: {
    copeTask: function(newTask, oldTask) {
      if (JSON.stringify(newTask) !== '{}') {
        this.taskData.createType = newTask.createType
        this.taskData.innerCode = newTask.innerCode
        this.taskData.userId = newTask.userId
        this.taskData.productType = newTask.productTypeId + ''
        this.taskData.desc = newTask.desc
        this.taskData.details = newTask.details
        this.taskData.region = newTask.region
        this.getOperatorList()
      } else {
        this.taskData = {
          assignorId: 40,
          createType: 1,
          innerCode: '',
          userId: '',
          productType: '',
          desc: '',
          details: [],
          region: ''
        }
      }
    }

  },
  methods: {
    closeNewTask() {
      this.resetForm()
      this.$emit('closeNewTask')
    },
    closeReplenishmentDetails() {
      this.replenishmentDetails = false
    },
    async showReplenishmentDetails() {
      if (this.taskData.innerCode) {
        this.replenishmentDetails = true
        const { data } = await getChannelList(this.taskData.innerCode)
        this.taskData.details = data
        this.taskData.details.forEach(item => {
          item.need = item.skuId !== '0'
          if (item.need) {
            item.canAdd = item.maxCapacity - item.currentCapacity
            if (item.canAdd < 0) {
              item.canAdd = 0
            }
            item.expectCapacity = item.canAdd
          }
        })
      } else {
        this.taskData.details = []
      }
    },
    async getOperatorList() {
      if (this.taskData.innerCode) {
        const data = await getOperatorList(this.taskData.innerCode)
        this.taskUser = data.data
      } else {
        this.taskUser = []
      }
    },
    async createTask() {
      this.taskData.details = this.taskData.details.filter(item => item.need)
      this.taskData.details.forEach(item => {
        item.skuName = item.sku.skuName
        item.skuImage = item.sku.skuImage
      })
      try {
        // console.log(this.taskData)
        await createTask(this.taskData)
        this.resetForm()
      } catch (error) {
        throw Error
      }
    },
    submitForm() {
      console.log('aaa')
      this.$refs['form'].validate((valid) => {
        if (valid) {
          console.log('bb')
          this.createTask()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm() {
      console.log(this.copeTask)
      this.$emit('closeNewTask')
      this.$refs['form'].resetFields()
    }
  }
}
</script>

<style>
.myDialog {
    padding: 30px 60px 30px 40px;
    color: #606266;
    font-size: 14px;
    word-break: break-all;
}
</style>
<style lang="scss" scoped>
.btn{
    margin-bottom: 0px;
    text-align: center;
    width: 100%;
    height: 36px;
    .newBtn{
      padding: 0;
      height: 36px;
      width: 80px;
      font-size: 16px;
      border: none;
      color: #fff;
      background-image: linear-gradient(to bottom right, #ff913f, #ff6021);;
    }
    .configurationBtn{
      height: 36px;
      width: 80px;
      border: none;
      padding: 10px 14px !important;
      text-align: center;
      font-size: 16px;
      background-color: #fbf4f0;
    }
  }
</style>
