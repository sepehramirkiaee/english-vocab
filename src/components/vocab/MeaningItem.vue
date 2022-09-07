<template>
  <div
    class="
      flex flex-col
      gap-4
      pl-6
      pr-2
      py-8
      bg-white
      rounded-lg
      shadow
      dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600
      relative
      select-none
      
      shrink-0
      w-full
    "
  >
    <p class="text-2xl capitalize font-bold">{{ meaning.title }}</p>
    <transition name="meaning">
      <div
        class="opacity-0 gap-7 flex flex-col overflow-auto grow h-1 pr-4"
        :class="{ 'opacity-100': visibleMeaning }"
        ref="content"
      >
        <div
          v-for="meaning_item in meaning.meaning"
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
        "
        @click="show"
      >
        <span class="material-symbols-outlined">visibility</span
        ><span>Show Meaning</span>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: ["meaning"],

  data() {
    return {
      visibleMeaning: false,
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