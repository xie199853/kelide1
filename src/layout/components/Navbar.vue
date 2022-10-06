<template>
  <div class="navbar">
    <img src="~@/assets/common/logoone.png" alt="" class="bg">
    <div class="right-menu wecome">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img
            src="~@/assets/common/user.png"
            class="user-avatar"
          >
          <div>欢迎您, admin</div>
          <span>退出</span>
          <el-tooltip class="item" effect="dark" content="退出登录" placement="bottom" :offset="18">
            <i class="el-icon-caret-bottom" @click="logout" />
          </el-tooltip>
        </div>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      console.log(111)
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  z-index: 999;
  width: 100%;
  height: 60px;
  position: fixed;
  top: 0;
  left: 0;
  background:url('~@/assets/common/backgroundone.png');
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  .hamburger-container {
    line-height: 56px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 60px;
    margin-right: 30px;

    &:focus {
      outline: none;
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        position: relative;
        // 开启flex
        display: flex;
        align-items: center;
        color: #fff;
        div{
          margin-right: 15px;
        }

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          margin-right: 15px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -17px;
          font-size: 18px;
          color: #fff;
        }
      }
    }
  }
}
.bg{
  margin-top: 10px;
  margin-left: 15px;
  width: 88px;
}
</style>
