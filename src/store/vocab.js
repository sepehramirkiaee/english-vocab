export default {
    state: {
        vocab: false
    },
    mutations: {
        setVocabList(state, payload) {
            state.vocab = payload
        }
    },
    actions: {
        setVocabList(context, payload) {
            context.commit('setVocabList', payload)
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