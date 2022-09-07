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
    "
  >
    <header-toolbar>Review</header-toolbar>
    <div class="flex gap-5 items-center">
      <div
        class="
          grow
          h-3
          rounded-full
          bg-gray-200
          overflow-hidden
          dark:bg-gray-500
        "
      >
        <div
          class="bg-green-500 h-3 transition-all duration-300"
          :style="{ width: percent + '%' }"
        ></div>
      </div>
      <router-link :to="{ name: 'vocab' }">
        <div
          class="
            p-2
            w-10
            h-10
            flex
            items-center
            justify-center
            rounded-full
            border
            text-white
            bg-gray-500
            border-gray-600
            dark:bg-gray-800
          "
        >
          <span class="material-symbols-outlined">close</span>
        </div>
      </router-link>
    </div>
    <div class="flex flex-col grow">
      <div class="flex grow gap-2">
        <transition-group name="slide">
            <meaning-item :meaning="item" ref="item" v-if="showMainItem"></meaning-item>
            <meaning-item :meaning="item" v-else></meaning-item>
        </transition-group>
      </div>
      <div class="flex my-4 gap-2">
        <div
          @click="next"
          class="
            p-1
            bg-rose-200
            grow
            text-center
            shadow-sm
            rounded-md
            select-none
            dark:bg-rose-800
          "
        >
          <span
            class="
              material-symbols-outlined
              text-5xl
              leading-tight
              text-rose-800
              dark:text-rose-200
            "
          >
            sentiment_dissatisfied
          </span>
        </div>
        <div
          @click="next"
          class="
            p-1
            bg-cyan-200
            grow
            text-center
            shadow-sm
            rounded-md
            select-none
            dark:bg-cyan-700
          "
        >
          <span
            class="
              material-symbols-outlined
              text-5xl
              leading-tight
              text-cyan-700
              dark:text-cyan-200
            "
          >
            sentiment_neutral
          </span>
        </div>
        <div
          @click="next"
          class="
            p-1
            bg-lime-200
            grow
            text-center
            shadow-sm
            rounded-md
            select-none
            dark:bg-lime-600
          "
        >
          <span
            class="
              material-symbols-outlined
              text-5xl
              leading-tight
              text-lime-700
              dark:text-lime-200
            "
          >
            sentiment_satisfied
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MeaningItem from "../components/vocab/MeaningItem.vue";

export default {
  components: { MeaningItem },
  data() {
    return {
      index: 0,
      showMainItem: true
    };
  },

  computed: {
    vocabList() {
      return this.$store.getters.getVocabList;
    },

    item() {
      return this.vocabList[this.index];
    },

    percent() {
      return ((this.index + 1) * 100) / this.vocabList.length;
    },
  },

  methods: {
    next() {
      if (this.index + 1 < this.vocabList.length) {
        this.showMainItem = false
        // this.index++;
        this.$refs.item.reset();
      } else {
        this.$router.push({ name: "vocab" });
      }
    },
  },

  beforeMount() {
    if (!this.vocabList) {
      this.axios.get("/sampleData/vocab.json").then((response) => {
        if (response.status == 200) {
          if (response.data) {
            this.setVocabList(response.data);
          }
        }
      });
    }
  },
};
</script>

<style>
    .slide-enter-to,
    .slide-leave-to{
        @apply -translate-x-1/2
    }
    .slide-enter-active,
    .slide-leave-active{
        @apply transition-all
    }
</style>