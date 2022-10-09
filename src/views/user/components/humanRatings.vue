<template>
  <div class="humanRatings">
    <div class="head">
      <div class="title">人效排名（月度）</div>
      <el-select v-model="value" class="regions" size="small" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div class="role-group">
      <div class="role-list">
        <div class="item is-checked">运营人员</div>
        <div class="item">运维人员</div>
      </div>
    </div>
    <div class="chart">
      <img src="http://likede2-admin.itheima.net/img/empty.87c4f71b.png" alt="">
      <div class="tips">暂无数据</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'second',
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '全部'
    }
  }
}
</script>

<style lang="scss" scoped>
  .humanRatings{
    display: flex;
    padding: 20px;
    border-radius: 20px;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
    height: calc(75vh - 90px);
    min-height: 542px;
    margin-top: 20px;
    background: #fff;
    .head{
      display: flex;
      align-items: center;
    }
    .title{
      -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        font-size: 16px;
        font-family: PingFangSC-Semibold,PingFang SC;
        font-weight: 600;
        color: #333;
    }
    .regions{
      width: 88px;
    }
    .role-group {
    width: 177px;
    margin: 15px auto 0;
    .role-list{
      display: flex;
      justify-content: center;
      align-items: center;
      .item{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 78px;
      height: 25px;
      font-size: 14px;
      color: #9ca3b4;
      cursor: pointer;
    }
    .is-checked{
      background: #fff;
      box-shadow: 0 0 4px 0 rgb(0 0 0 / 11%);
      border-radius: 7px;
      font-weight: 600;
      color: #333;
    }
    }
 }
 .chart{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    .tips{
      margin-top: 25px;
      color: #20232a;
      font-size: 14px;
    }
  }
  }
  </style>
