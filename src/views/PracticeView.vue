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
    <header-toolbar :backButton="true">Review</header-toolbar>
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
        <transition name="slide" v-if="vocabList.length > 0">
          <meaning-item
            :meaning="item"
            ref="item"
            v-if="showMainItem"
          ></meaning-item>
        </transition>
      </div>
      <memory-score @next="next"></memory-score>
    </div>
  </div>
</template>

<script>
import MeaningItem from "../components/vocab/MeaningItem.vue";
import MemoryScore from "../components/vocab/MemoryScore.vue"
import { mapActions } from "vuex";

export default {
  components: { MeaningItem, MemoryScore },
  data() {
    return {
      index: 0,
      showMainItem: true,
      links: {
        next: null,
      },
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
    ...mapActions(["setVocabList", "addToVocabList"]),

    next() {
      if (this.index + 1 < this.vocabList.length) {
        this.showMainItem = false;
        setTimeout(() => {
          this.index++;
          this.showMainItem = true;
          if (this.index + 1 == this.vocabList.length) {
            this.getMoreVocab();
          }
        }, 300);
        this.$refs.item.reset();
      } else {
        this.$router.push({ name: "vocab" });
      }
    },

    getMoreVocab() {
      if (this.links.next) {
        this.axios.get(this.links.next).then((response) => {
          if (response.status == 200) {
            if (response.data.data) {
              this.addToVocabList(response.data.data);
            }
            this.links.next = response.data.links.next;
          }
        });
      }
    },
  },

  beforeMount() {
    if (this.vocabList.length == 0) {
      this.axios.get("/api/vocab").then((response) => {
        if (response.status == 200) {
          if (response.data.data) {
            this.setVocabList(response.data.data);
          }
          this.links.next = response.data.links.next;
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