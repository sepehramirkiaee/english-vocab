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
        <transition name="slide">
          <meaning-item
            :meaning="item"
            ref="item"
            v-if="showMainItem"
          ></meaning-item>
        </transition>
      </div>
      <div class="flex my-4 gap-2">
        <div
          @click="next"
          class="
            bg-rose-200
            dark:bg-rose-800
            active:dark:bg-rose-900
            btn-action
          "
        >
          <span
            class="
              btn-icon
              material-symbols-outlined
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
            btn-action
            bg-cyan-200
            dark:bg-cyan-700
            active:dark:bg-cyan-900
          "
        >
          <span
            class="
              btn-icon
              material-symbols-outlined
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
            btn-action
            bg-lime-200
            dark:bg-lime-600
            active:dark:bg-lime-900
          "
        >
          <span
            class="
              btn-icon
              material-symbols-outlined
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
      showMainItem: true,
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
        this.showMainItem = false;
        setTimeout(() => {
          this.index++;
          this.showMainItem = true;
        }, 300);
        this.$refs.item.reset();
      } else {
        this.$router.push({ name: "vocab" });
      }
    },
  },

  beforeMount() {
    if (!this.vocabList) {
      this.axios
        .get("http://localhost:8080/sampleData/vocab.json")
        .then((response) => {
          if (response.status == 200 || response.status == 304) {
            if (response.data) {
              this.$store.dispatch("setVocabList", response.data);
            }
          }
        });
    }
  },
};
</script>

<style>
.slide-leave-to {
  @apply -translate-x-full;
}
.slide-enter-from {
  @apply translate-x-full;
}
.slide-enter-to {
  @apply translate-x-0;
}
.slide-leave-active,
.slide-enter-active {
  @apply transition-all duration-300;
}

.btn-action {
  @apply p-1 grow text-center shadow-sm rounded-md select-none transition-all duration-75 active:scale-95 cursor-pointer;
}

.btn-icon {
  @apply text-5xl leading-tight;
}
</style>