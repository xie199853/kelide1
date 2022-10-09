import { loginAPI, getUserInfoAPI } from '@/api'
import { Message } from 'element-ui'
export default {
  namespaced: true,
  state: {
    token: null,
    userId: '',
    userInfo: {}
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    SET_USERID(state, id) {
      state.userId = id
    },
    SET_USER_INFO(state, data) {
      state.userInfo = data
    },
    RMOVE_TOKEN(state) {
      state.token = null
    }
  },
  actions: {
    async loginAction({ commit }, loginData) {
      const { data } = await loginAPI(loginData)
      try {
        if (data.token !== null) {
          commit('setToken', data.token)
          commit('SET_USERID', data.userId)
          Message.success(data.msg)
        } else {
          Message.error(data.msg)
        }
      } catch (err) {
        throw Error(err.message)
      }
    },
    async getUserInfo({ commit }, id) {
      // 获取用户基本信息
      const result = await getUserInfoAPI(id)
      commit('SET_USER_INFO', result.data)
    },
    logout({ commit }) {
      // 清除用户数据  token
      commit('RMOVE_TOKEN')
    }
  }
}
