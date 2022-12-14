<template>
  <header-toolbar>Vocabulary</header-toolbar>
  <content-wrapper>
    <user-side-menu></user-side-menu>
    <div class="flex flex-col gap-4 grow self-stretch">
      <router-link :to="{ name: 'practice' }" v-if="vocab.length">
        <navigation-button class="bg-orange-600" icon="view_carousel"
          >Start Practicing</navigation-button
        >
      </router-link>
      <router-link :to="{ name: 'addWord' }">
        <navigation-button class="bg-blue-600" icon="variables"
          >Add New Word</navigation-button
        >
      </router-link>
      <div
        v-if="vocab.length && !isLoading"
        ref="vocabContainer"
        class="border-t pt-4 flex flex-col gap-4 dark:border-gray-500 grow"
      >
        <list-item
          v-for="item in vocab"
          :key="item.id"
          :item="item"
          class="last:mb-8"
        ></list-item>
        <p
          v-if="!this.links.next"
          class="text-center text-sm dark:text-gray-400"
        >
          That's the end of your list
        </p>
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
import ListItem from "../components/vocab/ListItem.vue";
import { mapActions } from "vuex";

export default {
  components: {
    ListItem,
  },

  data() {
    return {
      isLoading: false,
      isLoadingMore: false,
      links: {
        next: null,
      },
    };
  },

  computed: {
    vocab() {
      return this.$store.getters.getVocabList;
    },
  },

  methods: {
    ...mapActions(["setVocabList", "addToVocabList"]),

    handleScroll() {
      let element = this.$refs.vocabContainer;
      if (
        element.getBoundingClientRect().bottom < window.innerHeight &&
        this.links.next &&
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

  mounted() {
    window.addEventListener("scroll", this.handleScroll);

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

  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>