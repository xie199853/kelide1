<template>
  <div class="myPagination">
    <div class="text">
      <span style="margin-right:10px;">共{{ totalCount }}条记录</span>
      <span>第 {{ pageIndex }}/{{ totalPage }} 页</span>
    </div>
    <div class="btn">
      <el-row>
        <el-button style="background-color: #d5ddf8; color:black; border:none;margin-right:20px;" @click="prePage">上一页</el-button>
        <el-button style="background-color: #d5ddf8; color:black; border:none" @click="nextPage">下一页</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
export default { //   props: ['totalPage', 'totalCount', 'pageIndex'],
  props: {
    totalPage: {
      type: [String, Number],
      default: '0'
    },
    totalCount: {
      type: [String, Number],
      default: '0'
    },
    pageIndex: {
      type: [String, Number],
      default: '0'
    }
  },
  data() {
    return {

    }
  },
  methods: {
    prePage() {
      console.log(this.pageIndex)
      if (+this.pageIndex !== '1') {
        console.log(11)
        this.$emit('prePage', +this.pageIndex - 1)
      }
    },
    nextPage() {
      if (+this.pageIndex !== this.totalPage) {
        this.$emit('nextPage', +this.pageIndex + 1)
      }
    }
  }
}
</script>

  <style lang="scss" scoped>
  .myPagination{
      width: 90%;
      height: 96px;
      padding: 32px 16px;
      display: flex;
      align-items: center;
      .text{
          flex: 1;
          font-size: 16px;
          color: #ccc;
          text-align: left;
      }
      .btn{
          flex: 1;
          text-align: right;

      }
  }
  </style>>

