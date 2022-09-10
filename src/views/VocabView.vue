<template>
  <div class="flex flex-col gap-4 md:w-1/2 md:mx-auto lg:w-1/3 xl:w-1/4 p-4">
    <header-toolbar>Vocabulary</header-toolbar>
    <router-link :to="{ name: 'practice' }">
      <div
        class="
          text-center
          p-4
          bg-lime-500
          text-white
          font-bold
          rounded-md
          shadow-sm
          dark:bg-lime-600
        "
      >
        Start Practicing
      </div>
    </router-link>
    <router-link :to="{ name: 'addWord' }">
      <div
        class="
          text-center
          p-4
          bg-cyan-500
          text-white
          font-bold
          rounded-md
          shadow-sm
          dark:bg-cyan-600
        "
      >
        Add New Word
      </div>
    </router-link>
    <div
      v-if="vocab"
      class="border-t pt-4 flex flex-col gap-4 dark:border-gray-500"
    >
      <list-item v-for="item in vocab" :key="item.id" :item="item"></list-item>
    </div>
    <div v-else class="flex flex-col gap-8 justify-center items-center">
      <img
        class="w-2/3 opacity-90"
        src="../assets/illustration/empty_list.svg"
      />
      <router-link
        :to="{ name: 'login' }"
        class="bg-blue-500 text-white px-6 py-3 rounded"
        >Add New Word</router-link
      >
    </div>
  </div>
</template>

<script>
import ListItem from "../components/vocab/ListItem.vue";
import { mapActions } from "vuex";

export default {
  components: {
    ListItem,
  },
  computed: {
    vocab() {
      return this.$store.getters.getVocabList;
    },
  },

  methods: {
    ...mapActions(["setVocabList"]),
  },

  mounted() {
    this.axios
      .get("http://localhost:8080/sampleData/vocab.json")
      .then((response) => {
        if (response.status == 200) {
          if (response.data) {
            this.setVocabList(response.data);
          }
        }
      });
  },
};
</script>