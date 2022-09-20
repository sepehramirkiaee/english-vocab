<template>
  <div
    class="
      flex flex-col
      gap-4
      md:w-1/2 md:mx-auto
      lg:w-1/3
      xl:w-1/4
      h-screen
      p-4
      overflow-hidden
      relative
    "
  >
    <header-toolbar :backButton="true">Vocabulary</header-toolbar>
    <div class="flex flex-col grow">
      <meaning-item v-if="meaning" :meaning="meaning" mode="single"></meaning-item>
      <div
        v-else
        class="
          flex flex-col
          gap-2
          mt-8
          justify-center
          items-center
          dark:text-gray-400
          grow
        "
      >
        <span
          class="
            material-symbols-outlined
            text-9xl text-gray-300
            dark:text-gray-600
          "
        >
          hourglass_top
        </span>
        <p class="text-xl">Please Wait ...</p>
      </div>
    </div>
    <memory-score @next="score"></memory-score>
  </div>
</template>

<script>
import MeaningItem from "../components/vocab/MeaningItem.vue";
import MemoryScore from "../components/vocab/MemoryScore.vue";

export default {
  props: ["id"],

  components: { MeaningItem, MemoryScore },

  data() {
    return {
      meaning: null,
    };
  },

  methods: {
    score() {
      this.$router.push({ name: "vocab" });
    },
  },

  mounted() {
    this.meaning = this.$store.getters.getVocabById(this.id);
    if (this.meaning == null) {
      this.axios.get("/api/vocab/" + this.id).then((response) => {
        if (response.status == 200) {
          if (response.data.data) {
            this.meaning = response.data.data;
          }
        }
      });
    }
  },
};
</script>