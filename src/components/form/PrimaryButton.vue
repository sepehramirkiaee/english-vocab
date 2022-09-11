<template>
  <button
    :type="type"
    class="
      bg-blue-700
      hover:bg-blue-500
      transition-all
      text-white
      text-sm
      py-3
      px-4
      rounded
      dark:bg-blue-600
    "
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    type: {
      default: "submit",
    },
  },
};
</script>