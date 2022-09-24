export default {
    state: {
        isAuthenticated: false,
        userMenu: [
            {
                title: "My List",
                icon: "view_agenda",
                link: {
                    name: "vocab",
                },
            },
            {
                title: "Practice",
                icon: "view_carousel",
                link: {
                    name: "practice",
                },
            },
            {
                title: "Add Word",
                icon: "variables",
                link: {
                    name: "addWord",
                },
            },
        ],
        userProfileMenu: [
            {
                title: "Change Password",
                icon: "key",
                link: {
                    name: "changePassword",
                },
            },
            {
                title: "Logout",
                icon: "logout",
                link: {
                    name: "logout",
                },
            },
        ],
        user: {}
    },
    mutations: {
        setAuthentication(state, payload) {
            state.isAuthenticated = true
            state.user = payload
        },
        unsetAuthentication(state) {
            state.isAuthenticated = false
            state.user = {}
        }
    },
    actions: {
        setAuthentication(context, payload) {
            context.commit('setAuthentication', payload)
        },

        unsetAuthentication(context) {
            context.commit('unsetAuthentication')
        },

    },
    getters: {
        getAuthStatus(state) {
            return state.isAuthenticated
        },

        getUserMenu(state) {
            return state.userMenu
        },

        getUserProfileMenu(state) {
            return state.userProfileMenu
        },

        getUserInfo(state) {
            return state.user
        }
    }
}