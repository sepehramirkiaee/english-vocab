<template>
  <div class="flex flex-col gap-4 md:w-1/2 md:mx-auto lg:w-1/3 xl:w-1/4 p-4">
    <header-toolbar :backButton="true">Add Word</header-toolbar>
    <form @submit.prevent="addWord" class="flex flex-col gap-3">
      <div class="p-4 bg-white shadow-sm rounded dark:bg-gray-800">
        <the-input v-model.trim="title">Enter The Word</the-input>
      </div>
      <new-definition
        v-for="(definition, index) in meaning"
        :key="definition.id"
        :detail="definition"
        @changeType="changeType"
        @changeMeaning="changeMeaning"
        @changeSample="changeSample"
      >
        <button
          v-if="index === meaning.length - 1"
          type="button"
          class="p-4 bg-slate-600 text-white rounded w-max text-sm self-end"
          @click="addDefinition"
        >
          Add Another Definition
        </button>
      </new-definition>
      <button
        class="
          p-4
          bg-sky-600
          active:bg-sky-500
          text-white
          rounded
          dark:bg-sky-800 dark:active:bg-sky-600
        "
      >
        Submit
      </button>
    </form>
  </div>
</template>

<script>
import NewDefinition from "../components/vocab/NewDefinition.vue";
import { v4 as uuidv4 } from "uuid";
export default {
  components: { NewDefinition },

  data() {
    return {
      title: "",
      meaning: [
        {
          id: uuidv4(),
          type: "",
          meaning: "",
          sample: "",
        },
      ],
    };
  },

  methods: {
    addWord() {
      this.axios
        .post("/api/addWord", { title: this.title, meaning: this.meaning })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    addDefinition() {
      this.meaning.push({
        id: uuidv4(),
        type: "",
        meaning: "",
        sample: "",
      });
    },

    changeType(value, id) {
      this.meaning.forEach((element, index) => {
        if (element.id === id) {
          this.meaning[index].type = value;
        }
      });
    },

    changeMeaning(value, id) {
      this.meaning.forEach((element, index) => {
        if (element.id === id) {
          this.meaning[index].meaning = value;
        }
      });
    },

    changeSample(value, id) {
      this.meaning.forEach((element, index) => {
        if (element.id === id) {
          this.meaning[index].sample = value;
        }
      });
    },
  },
};
</script>