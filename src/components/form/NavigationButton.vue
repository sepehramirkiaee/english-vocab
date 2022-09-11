<template>
  <div class="text-center py-3 p-4 text-white rounded-md shadow-sm flex items-center gap-4 justify-center">
    <span v-if="icon" class="material-symbols-outlined">{{icon}}</span>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ["icon"],
};
</script>