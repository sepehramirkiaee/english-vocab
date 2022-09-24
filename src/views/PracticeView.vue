<template>
  <header-toolbar :backButton="true">Review</header-toolbar>

  <content-wrapper>
    <user-side-menu></user-side-menu>
    <div class="flex flex-col gap-4 grow self-stretch">
      <div
        class="flex flex-col gap-4 w-full grow"
        v-if="vocabList.length > 0 && !isLoading"
      >
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
          <div class="flex grow gap-2 overflow-hidden">
            <transition name="slide" v-if="vocabList.length > 0">
              <meaning-item
                :meaning="item"
                ref="item"
                v-if="showMainItem"
              ></meaning-item>
            </transition>
          </div>
          <memory-score @next="next($event, item.id)"></memory-score>
        </div>
      </div>
      <div
        v-else-if="isLoading"
        class="
          flex flex-col
          gap-2
          mt-8
          justify-center
          items-center
          grow
          dark:text-gray-400
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
      <div
        v-else
        class="
          flex flex-col
          gap-2
          mt-8
          justify-center
          items-center
          grow
          dark:text-gray-400
        "
      >
        <span
          class="
            material-symbols-outlined
            text-9xl text-gray-300
            dark:text-gray-600
          "
        >
          sentiment_dissatisfied
        </span>
        <p class="text-xl">Nothing found in your list</p>
        <p>You can add new words in your list</p>
      </div>
    </div>
  </content-wrapper>
</template>

<script>
import MeaningItem from "../components/vocab/MeaningItem.vue";
import MemoryScore from "../components/vocab/MemoryScore.vue";
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
      isLoadingMore: false,
      isLoading: false,
    };
  },

  watch: {
    vocabList(newValue) {
      if (this.index == newValue.length && !this.isLoading) {
        this.$router.push({ name: "vocab" });
      }
      this.getMoreVocab();
    },

    index() {
      this.getMoreVocab();
    },
  },

  computed: {
    vocabList() {
      return this.$store.getters.getVocabList;
    },

    item() {
      if (this.vocabList[this.index]) {
        return this.vocabList[this.index];
      } else {
        return { id: 0, title: "", meanings: {} };
      }
    },

    percent() {
      return ((this.index + 1) * 100) / this.vocabList.length;
    },
  },

  methods: {
    ...mapActions(["setVocabList", "addToVocabList"]),

    next(score, id) {
      if (!this.isLoadingMore) {
        if (this.index + 1 < this.vocabList.length) {
          this.isLoadingMore = true;
          this.showMainItem = false;
          this.axios.put("/api/score", { id, score });
          setTimeout(() => {
            this.index++;
            this.showMainItem = true;
            this.isLoadingMore = false;
          }, 300);
          this.$refs.item.reset();
        } else {
          this.$router.push({ name: "vocab" });
        }
      }
    },

    getMoreVocab() {
      if (
        this.links.next != null &&
        this.index + 5 >= this.vocabList.length &&
        !this.isLoadingMore
      ) {
        this.isLoadingMore = true;
        this.axios
          .get(this.links.next)
          .then((response) => {
            if (response.status == 200) {
              if (response.data.data) {
                this.addToVocabList(response.data.data);
              }
              this.links.next = response.data.links.next;
            }
          })
          .finally(() => {
            this.isLoadingMore = false;
          });
      }
    },
  },

  beforeMount() {
    this.setVocabList([]);
    this.isLoading = true;
    this.axios
      .get("/api/vocab")
      .then((response) => {
        if (response.status == 200) {
          if (response.data.data) {
            this.setVocabList(response.data.data);
          }
          this.links.next = response.data.links.next;
        }
      })
      .finally(() => {
        this.isLoading = false;
      });
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