import { createStore } from 'vuex'
import notificationModule from './notification.js'
import userModule from './user.js'

export default createStore({
  state: {
    darkMode: false
  },
  getters: {
    darkMode(state) {
      return state.darkMode
    }
  },
  mutations: {
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode
    }
  },
  actions: {
    toggleDarkMode(context) {
      context.commit('toggleDarkMode');
    }
  },
  modules: {
    notification: notificationModule,
    user: userModule
  }
})
