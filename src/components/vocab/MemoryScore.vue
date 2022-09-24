<template>
  <div class="flex my-4 gap-2">
    <div
      @click="next('notknow')"
      class="bg-rose-200 dark:bg-rose-800 active:dark:bg-rose-900 btn-action"
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
      @click="next('notsure')"
      class="btn-action bg-cyan-200 dark:bg-cyan-700 active:dark:bg-cyan-900"
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
      @click="next('sure')"
      class="btn-action bg-lime-200 dark:bg-lime-600 active:dark:bg-lime-900"
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
</template>

<script>
export default {
  props: ["isLoading"],
  emits: ["next"],
  methods: {
    next(score) {
      this.$emit("next",score);
    },
  },
};
</script>