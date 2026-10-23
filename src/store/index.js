import { createStore } from 'vuex'
import { login,getInfo } from '@/api/manager'
import { setToken, removeToken } from '@/composables/auth.js'


const store = createStore({
  state() {
    return {
      user: {},
      asideWith:"250px",
      menus:[],
      ruleNames:[]
         }
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    handleAsideWith(state) {
      state.asideWith = state.asideWith === "250px" ? "64px" : "250px"
    },
    setMenu(state, menus) {
      state.menus = menus
    },
    setRuleNames(state, ruleNames) {
      state.ruleNames = ruleNames
    }
  },
  actions: {
    login({commit}, {username, password }) {
      return login(username, password).then(res => {
        setToken(res.token)
        return res
      })
    },
    getInfo({commit}) {
     return new Promise((resolve, reject) => {
      getInfo().then(res => {
        commit('setUser', res)
        commit('setMenu', res.menus || [])
        commit('setRuleNames', res.ruleNames || [])
        console.log('getInfo res:', res)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
     })
    },
    logout({commit}) {
      return new Promise((resolve, reject) => {
        removeToken()
        commit('setUser', {})
        resolve()
      })
    }
    
  }
})
export default store