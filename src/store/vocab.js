export default {
    state: {
        vocab: [],
        practiceIndex: 0
    },
    mutations: {
        setVocabList(state, payload) {
            state.vocab = payload
        },

        addToVocabList(state, payload) {
            payload.forEach((value) => {
                state.vocab.push(value)
            })
        },

        removeFromVocabList(state, payload) {
            state.vocab = state.vocab.filter((item) => item.id !== payload)
        },

        changePracticeIndex(state, payload) {
            state.practiceIndex = payload
        }
    },
    actions: {
        setVocabList(context, payload) {
            context.commit('setVocabList', payload)
        },

        addToVocabList(context, payload) {
            context.commit('addToVocabList', payload)
        },

        removeFromVocabList(context, payload) {
            context.commit('removeFromVocabList', payload)
        },

        changePracticeIndex(context, payload) {
            context.commit('changePracticeIndex', payload)
        }
    },
    getters: {
        getVocabList(state) {
            return state.vocab
        },

        getVocabById: (state) => (id) => {
            if (state.vocab) {
                return state.vocab.find(vocab => vocab.id == id)
            }
            else {
                return false
            }
        },

        getPracticeIndex(state){
            return state.practiceIndex
        }
    }
}