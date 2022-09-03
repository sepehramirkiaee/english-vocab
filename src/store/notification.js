import { v4 as uuidv4 } from 'uuid';

export default {
    state: {
        notifications: []
    },
    getters: {
        getNotifications(state) {
            return state.notifications
        }
    },
    actions: {
        setNotification(context, payload) {
            payload.id = uuidv4();
            context.commit('setNotification', payload)
            setTimeout(() => {
                context.commit('removeNotificationById', payload.id)
            }, 5000)
        },
        removeNotificationById(context,payload){
            context.commit('removeNotificationById', payload)
        }
    },
    mutations: {
        setNotification(state, payload) {
            state.notifications.unshift(payload);
        },
        removeNotificationById(state, payload) {
            state.notifications = state.notifications.filter(function (value) {
                return value.id != payload;
            });
        }
    }
}