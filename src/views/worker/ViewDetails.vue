<template>
  <div>
    <el-dialog
      title="工单详情"
      :visible.sync="viewDetials"
      width="630px"
      :close-on-click-modal="false"
      :before-close="closeViewDetials"
    >
      <div class="await">
        <span>{{ taskDetDials.taskStatusTypeEntity.statusName }}</span>
      </div>
      <el-descriptions :label-style="{'margin-left':'25px'}" :column="2">
        <el-descriptions-item label="设备编号">{{ taskDetDials.innerCode }}</el-descriptions-item>
        <el-descriptions-item label="创建日期">{{ taskDetDials.createTime }}</el-descriptions-item>
        <el-descriptions-item v-if="taskDetDials.taskStatusTypeEntity.statusName==='取消'" label="取消日期">{{ taskDetDials.updateTime }}</el-descriptions-item>
        <el-descriptions-item label="运营人员">{{ taskDetDials.userName }}</el-descriptions-item>
        <el-descriptions-item label="工单类型">{{ taskDetDials.taskType.typeName }}</el-descriptions-item>
        <el-descriptions-item label="补货数量" :content-style="{'color':'blue','cursor':'pointer'}"><span @click="showViewTaskDetDialsReplenishment=true">补货详情</span></el-descriptions-item>
        <el-descriptions-item label="工单方式">{{ taskDetDials.productType===0?'自动':'手动' }}</el-descriptions-item>
        <el-descriptions-item label="备注">{{ taskDetDials.desc }}</el-descriptions-item>
      </el-descriptions>
      <el-button v-if="taskDetDials.taskStatusTypeEntity.statusName==='取消'" class="recreateBtn" @click="copeNewTask">重新创建</el-button>
      <el-button v-else class="cancelBtn">取消工单</el-button>
    </el-dialog>
    <viewTaskDetDialsReplenishment :task-id="taskId" :show-view-task-det-dials-replenishment="showViewTaskDetDialsReplenishment" @closeViewTaskDetDialsReplenishment="showViewTaskDetDialsReplenishment=false" />
    <!-- <newTask :new-task="showNewTask" :copy-task="taskDetDials" :from-detail="true" @closeNewTask="closeNewTask" /> -->
  </div>
</template>

<script>
import { getTaskInfo } from '@/api'
import viewTaskDetDialsReplenishment from './viewTaskDetDialsReplenishment.vue'
export default {
  components: {
    viewTaskDetDialsReplenishment
  },
  props: {
    viewDetials: {
      type: Boolean,
      default: false
    },
    taskId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      taskDetDials: {
        taskType: {},
        taskStatusTypeEntity: {}
      },
      showViewTaskDetDialsReplenishment: false,
      ReplenishmentData: '',
      showNewTask: false
    }
  },
  watch: {
    viewDetials: function(newDetials, oldDetials) {
      if (newDetials) {
        this.getTaskInfo()
      }
    }

  },
  methods: {
    closeViewDetials() {
      this.$emit('closeViewDetials')
    },
    async getTaskInfo() {
      const { data } = await getTaskInfo(this.taskId)
      this.taskDetDials = data
    },
    closeNewTask() {
      this.showNewTask = false
    },
    copeNewTask() {
      this.$emit('copeNewTask', this.taskDetDials)
    }

  }
}
</script>

<style lang="scss" scoped>
.await{
width:590px;
height:40px;
background:#f8f8f8;
margin-top:-18px;
margin-bottom:25px;
line-height: 40px;
padding-left:20px;
}
.recreateBtn,
.cancelBtn{
    margin-left: 254px;
    background-color: #fbf4f0;
}

</style>>

