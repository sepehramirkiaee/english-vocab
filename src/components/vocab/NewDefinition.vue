<template>
  <primary-card class="p-6 flex flex-col gap-6">
    
    <div>
      <the-select v-model="type" :options="typeOptions" @change="changeType"
        >Type</the-select
      >
    </div>
    <div>
      <the-input v-model.trim="meaning" @input="changeMeaning"
        >Definition</the-input
      >
    </div>
    <div>
      <the-textarea v-model="sample" @input="changeSample"
        >Samples</the-textarea
      >
    </div>
    <slot></slot>
  </primary-card>
</template>

<script>
import TheTextarea from "../form/TheTextarea.vue";
export default {
  components: { TheTextarea },
  props: ["detail"],
  emits: ["changeType", "changeMeaning", "changeSample"],

  data() {
    return {
      id: this.detail.id,
      type: this.detail.type,
      meaning: this.detail.meaning,
      sample: this.detail.sample,
      typeOptions: [
        { title: "noun" },
        { title: "adjective" },
        { title: "verb" },
        { title: "adverb" },
        { title: "collocation" },
        { title: "expression" },
        { title: "pronoun" },
        { title: "preposition" },
        { title: "conjunction" },
        { title: "interjection" },
      ],
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