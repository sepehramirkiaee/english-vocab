<template>
  <div class="flex flex-col gap-4 md:w-1/2 md:mx-auto lg:w-1/3 xl:w-1/4 p-4">
    <header-toolbar>Vocabulary</header-toolbar>
    <div
      v-if="meaning"
      class="flex flex-col gap-4 px-6 py-8 bg-white rounded-lg shadow-md"
    >
      <p class="text-2xl capitalize font-bold">{{ meaning.title }}</p>
      <div
        v-for="meaning_item in meaning.meaning"
        :key="meaning_item.id"
        class="flex flex-col gap1"
      >
        <p class="text-sm text-gray-400">{{ meaning_item.type }}</p>
        <p class="font-medium mb-2">{{ meaning_item.meaning }}</p>
        <p class="text-sm border-l-2 pl-4">{{ meaning_item.sample }}</p>
      </div>
    </div>
    <div v-else class="flex flex-col gap-8 justify-center items-center">
      <img
        class="w-2/3 opacity-90"
        src="../assets/illustration/not_found_word.svg"
      />
      <router-link
        :to="{ name: 'vocab' }"
        class="bg-blue-500 text-white px-6 py-3 rounded"
        >Back to My List</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  props: ["id"],

  data() {
    return {
      meaning: null,
    };
  },

  beforeMount() {
    this.meaning = this.$store.getters.getVocabById(this.id);
    console.log(this.meaning)
    if (!this.meaning) {
      this.axios.get("/sampleData/meaning.json").then((response) => {
        console.log(response)
        if (response.status == 200) {
          if (response.data) {
            this.meaning = response.data;
          }
        }
      });
    }
  },
};
</script>