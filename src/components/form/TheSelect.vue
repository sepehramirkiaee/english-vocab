<template>
  <field-wrapper>
    <label class="dark:text-gray-400 text-sm"><slot></slot></label>
    <span
      class="
        material-symbols-outlined
        absolute
        text-md
        right-2
        bottom-1.5
        text-gray-500
        dark:text-gray-400
        pointer-events-none
      "
      >expand_more</span
    >
    <select
      :value="modelValue"
      @change="updateValue"
      :placeholder="placeholder"
      class="
        appearance-none
        border border-gray-300 shadow-sm
        w-full
        rounded-md
        p-2
        text-sm text-gray-500
        placeholder:text-gray-300
        focus:border-blue-700
        focus:ring-2
        focus:ring-blue-700
        focus:shadow-sm
        focus:border-transparent
        focus:outline-none
        dark:bg-gray-900
        dark:text-white
        dark:border-gray-600
        dark:focus:ring-blue-400
        dark:placeholder:text-gray-500
      "
    >
      <option v-for="option in options" :key="option.title">
        {{ option.title }}
      </option>
    </select>
  </field-wrapper>
</template>

<script>
export default {
  props: {
    modelValue: {
      require: true,
    },
    options: Object,
    placeholder: String,
  },

  methods: {
    updateValue(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>