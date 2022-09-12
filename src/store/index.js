import { createStore } from 'vuex'
import notificationModule from './notification.js'
import userModule from './user.js'
import vocabModule from './vocab.js'

export default createStore({
  state: {
    darkMode: false,
    isLoading: false
  },
  getters: {
    darkMode(state) {
      return state.darkMode
    },

    isLoading(state) {
      return state.isLoading
    }
  },
  mutations: {
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode
      localStorage.setItem("darkMode", state.darkMode)
    },

    setDarkMode(state, payload) {
      state.darkMode = payload
    },

    setIsLoading(state, payload) {
      state.isLoading = payload
    }
  },
  actions: {
    toggleDarkMode(context) {
      context.commit('toggleDarkMode');
    },

    setDarkMode(context, payload) {
      context.commit('setDarkMode', (payload === 'true'))
    },

    setIsLoading(context, payload) {
      context.commit('setIsLoading', payload)
    }
  },
  modules: {
    notification: notificationModule,
    user: userModule,
    vocab: vocabModule
  }
})
