import { createStore } from 'vuex'
import notificationModule from './notification.js'
import userModule from './user.js'
import vocabModule from './vocab.js'

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
      localStorage.setItem("darkMode", state.darkMode)
    },

    setDarkMode(state, payload) {
      state.darkMode = payload
    }
  },
  actions: {
    toggleDarkMode(context) {
      context.commit('toggleDarkMode');
    },

    setDarkMode(context, payload) {
      context.commit('setDarkMode', (payload === 'true'))
    }
  },
  modules: {
    notification: notificationModule,
    user: userModule,
    vocab: vocabModule
  }
})
