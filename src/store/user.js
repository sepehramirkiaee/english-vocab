export default {
    state: {
        isAuthenticated: false
    },
    mutations: {
        setAuthentication(state, payload) {
            if (payload) {
                state.isAuthenticated = true
            }
        }
    },
    actions: {
        setAuthentication(context) {
            context.commit('setAuthentication', true)
        }
    },
    getters: {
        getAuthStatus(state) {
            return state.isAuthenticated
        }
    }
}