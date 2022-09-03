<template>
  <div>
    <label class="dark:text-gray-400"><slot></slot></label>
    <input
      :value="modelValue"
      @input="updateValue"
      :type="type"
      :placeholder="placeholder"
      :pattern="pattern"
      class="
        border border-gray-300
        w-full
        rounded
        p-2
        placeholder:text-gray-300
        focus:border-blue-700
        focus:ring-2
        focus:ring-blue-700
        focus:shadow-sm
        focus:border-transparent
        focus:outline-none
        dark:bg-gray-900
        dark:text-white
        dark:border-gray-400
        dark:focus:ring-blue-400
        dark:placeholder:text-gray-500
      "
    />
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      require: true,
    },
    type: {
      default: "text",
    },
    placeholder: String,
    pattern: String,
  },

  methods: {
    updateValue(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>