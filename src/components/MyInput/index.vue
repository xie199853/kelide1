<template>
  <div class="MyInput">
    <div v-for="(item,index) in inputArr" :key="index" class="ipt">
      {{ item.title }}：
      <el-input
        v-if="item.type === 'input'"
        v-model="item.value"
        clearable
        :placeholder="item.placeholder"
      />
      <!-- 下拉选择 -->
      <el-select v-if="item.type ==='select'" v-model="item.value" clearable :placeholder="item.placeholder">
        <el-option v-for="(selectItem,key) in item.selectItem" :key="key" :label="selectItem.lable" :value="selectItem.value" />
      </el-select>
      <!-- 时间 -->
      <el-date-picker
        v-if="item.type ==='date'"
        v-model="item.value"
        type="daterange"
        range-separator="~"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd"
        format="yyyy 年 MM 月 dd 日"
      >
        />

      </el-date-picker></div>
    <el-button icon="el-icon-search" type="primary" class="querybBtn" @click="clickSelect">查询</el-button>
  </div>

</template>

<script>
export default {
  props: {
    inputArr: {
      type: Array,
      default: () => ({})
    }
  },
  data() {
    return {
      input: ''

    }
  },
  methods: {
    clickSelect() {
      this.$emit('clickSelect')
    }
  }
}
</script>

<style lang="scss" scoped>
.MyInput{
margin-bottom: 15px;
padding-left: 17px;
height: 64px;
width: 100%;
border-radius: 5px;
background-color: #fff;
display: flex;
align-items: center;
justify-content: start;
  .ipt{
     margin: 15px;
  }
  .el-input {
    width: 205px ;
   }
}
</style>
