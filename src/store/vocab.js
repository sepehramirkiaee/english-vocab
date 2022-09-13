export default {
    state: {
        vocab: []
    },
    mutations: {
        setVocabList(state, payload) {
            state.vocab = payload
        },

        addToVocabList(state, payload) {
            payload.forEach((value) => {
                state.vocab.push(value)
            })
        }
    },
    actions: {
        setVocabList(context, payload) {
            context.commit('setVocabList', payload)
        },

        addToVocabList(context, payload) {
            context.commit('addToVocabList', payload)
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
        }
    }
}