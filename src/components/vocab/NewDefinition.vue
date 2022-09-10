<template>
  <div
    class="p-4 bg-white shadow-sm rounded flex flex-col gap-2 dark:bg-gray-800"
  >
    <div>
      <label class="dark:text-gray-400">Type</label>
      <select
        v-model="type"
        @change="changeType"
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
      >
        <option></option>
        <option>noun</option>
        <option>adjective</option>
        <option>verb</option>
        <option>adverb</option>
        <option>collocation</option>
        <option>expression</option>
        <option>pronoun</option>
        <option>preposition</option>
        <option>conjunction</option>
        <option>interjection</option>
      </select>
    </div>
    <div>
      <the-input v-model.trim="meaning" @input="changeMeaning"
        >Definition</the-input
      >
    </div>
    <div>
      <label class="dark:text-gray-400">Samples</label>
      <textarea
        v-model.trim="sample"
        @input="changeSample"
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
      ></textarea>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ["detail"],
  emits: ["changeType", "changeMeaning", "changeSample"],

  data() {
    return {
      id: this.detail.id,
      type: this.detail.type,
      meaning: this.detail.meaning,
      sample: this.detail.sample,
    };
  },

  methods: {
    changeType() {
      this.$emit("changeType", this.type, this.id);
    },

    changeMeaning() {
      this.$emit("changeMeaning", this.meaning, this.id);
    },

    changeSample() {
      this.$emit("changeSample", this.sample, this.id);
    },
  },
};
</script>