export default {
    state: {
        isAuthenticated: false
    },
    mutations: {
        setAuthentication(state, payload) {
            if (payload) {
                state.isAuthenticated = true
            }
        },
        unsetAuthentication(state) {
            state.isAuthenticated = false
        }
    },
    actions: {
        setAuthentication(context) {
            context.commit('setAuthentication', true)
        },

        unsetAuthentication(context) {
            context.commit('unsetAuthentication')
        }

    },
    getters: {
        getAuthStatus(state) {
            return state.isAuthenticated
        }
    }
}