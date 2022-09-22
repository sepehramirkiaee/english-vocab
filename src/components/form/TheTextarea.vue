<template>
  <field-wrapper>
    <label class="dark:text-gray-400 text-sm"><slot></slot></label>
    <textarea
      :value="modelValue"
      @input="updateValue"
      :placeholder="placeholder"
      class="
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
    ></textarea>
  </field-wrapper>
</template>

<script>
export default {
  props: {
    modelValue: {
      require: true,
    },
    placeholder: String,
  },

  methods: {
    updateValue(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>