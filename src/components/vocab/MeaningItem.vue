<template>
  <primary-card
    class="
      flex flex-col
      gap-4
      pl-6
      pr-2
      pt-8
      pb-2
      relative
      select-none
      shrink-0
      w-full
      grow
    "
  >
    <teleport to="#dialog">
      <the-dialog
        v-if="showDialog"
        @accept="removeItem"
        @close="toggleRemoveDialog"
        >Are you sure you want to remove this item from your list?</the-dialog
      >
    </teleport>
    <div class="flex items-center justify-between">
      <p class="text-2xl capitalize font-bold">{{ meaning.title }}</p>
    </div>
    <transition name="meaning">
      <div
        class="opacity-0 gap-7 flex flex-col overflow-auto grow h-1 pr-4"
        :class="{ 'opacity-100': visibleMeaning }"
        ref="content"
      >
        <div
          v-for="meaning_item in meaning.meanings"
          :key="meaning_item.id"
          class="flex flex-col gap-1"
        >
          <p class="text-sm text-gray-400">{{ meaning_item.type }}</p>
          <p class="font-medium mb-2">{{ meaning_item.meaning }}</p>
          <p class="text-sm border-l-2 pl-4">{{ meaning_item.sample }}</p>
        </div>
      </div>
    </transition>

    <transition name="show">
      <div
        v-if="!visibleMeaning"
        class="
          absolute
          top-1/2
          left-1/2
          -translate-x-1/2 -translate-y-1/2
          flex
          items-center
          gap-1
          border
          px-4
          py-2
          rounded-md
          bg-white
          dark:bg-gray-700
          whitespace-nowrap
          cursor-pointer
        "
        @click="show"
      >
        <span class="material-symbols-outlined">visibility</span
        ><span>Show Meaning</span>
      </div>
    </transition>

    <div class="flex justify-end gap-4">
      <span
        @click="toggleRemoveDialog"
        class="
          material-symbols-outlined
          text-gray-500
          cursor-pointer
          dark:text-white
          p-2
          border
          dark:border-gray-500
          rounded
        "
        >delete</span
      >
      <router-link :to="{ name: 'editWord', params: { id: this.meaning.id } }">
        <span
          class="
            material-symbols-outlined
            text-gray-500
            cursor-pointer
            dark:text-white
            p-2
            border
            dark:border-gray-500
            rounded
          "
          >edit</span
        ></router-link
      >
    </div>
  </primary-card>
</template>

<script>
import PrimaryCard from "../UI/PrimaryCard.vue";
export default {
  components: { PrimaryCard },
  props: ["meaning", "mode"],

  data() {
    return {
      visibleMeaning: false,
      showDialog: false,
    };
  },

  methods: {
    show() {
      this.visibleMeaning = true;
    },

    reset() {
      this.visibleMeaning = false;
      this.mainContentScroll();
    },

    mainContentScroll() {
      this.$refs.content.scrollTop = 0;
    },

    toggleRemoveDialog() {
      this.showDialog = !this.showDialog;
    },

    removeItem() {
      this.axios
        .delete("/api/vocab/" + this.meaning.id)
        .then((response) => {
          if (response.status == 204) {
            this.$store.dispatch("removeFromVocabList", this.meaning.id);
            if (this.mode && this.mode == "single") {
              this.$router.back();
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

};
</script>

<style>
.show-leave-to {
  @apply opacity-0;
}

.show-leave-active,
.meaning-enter-active {
  @apply transition-all duration-300;
}
</style>