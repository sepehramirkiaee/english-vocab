<template>
  <button :type="type" class="bg-blue-700 text-white p-2 rounded dark:bg-blue-600">
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