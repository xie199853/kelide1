<template>
  <div class="user-task-stats">
    <show-header />
    <el-row :gutter="20">
      <el-col :span="18"><ticket-status /></el-col>
      <el-col :span="6"><human-ratings /></el-col>
    </el-row>

  </div>
</template>

<script>
import HumanRatings from './components/humanRatings.vue'
import ShowHeader from './components/showHeader.vue'
import TicketStatus from './components/ticketStatus.vue'
export default {
  components: {
    ShowHeader,
    TicketStatus,
    HumanRatings
  },
  data() {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
