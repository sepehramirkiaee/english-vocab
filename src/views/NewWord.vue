<template>
  <div class="flex flex-col gap-4 md:w-1/2 md:mx-auto lg:w-1/3 xl:w-1/4 p-4">
    <header-toolbar :backButton="true">Add Word</header-toolbar>
    <form @submit.prevent="handleFunction" class="flex flex-col gap-3">
      <primary-card class="p-4">
        <the-input v-model.trim="title">Enter The Word</the-input>
      </primary-card>
      <transition-group name="list">
        <new-definition
          v-for="(definition, index) in meaning"
          :key="definition.id"
          :detail="definition"
          @changeType="changeType"
          @changeMeaning="changeMeaning"
          @changeSample="changeSample"
        >
          <div class="flex gap-2 justify-end">
            <primary-button
              v-if="meaning.length > 1"
              @click="removeDefinition(definition.id)"
              class="
                self-end
                !bg-white
                flex
                items-center
                justify-center
                gap-2
                !text-gray-500
                dark:!bg-gray-800 dark:!text-gray-400
              "
              type="button"
              ><span class="material-symbols-outlined">delete</span
              >Remove</primary-button
            >

            <primary-button
              v-if="index === meaning.length - 1"
              @click="addDefinition"
              class="
                self-end
                bg-emerald-600
                dark:bg-emerald-700
                hover:bg-emerald-500
                flex
                items-center
                justify-center
                gap-2
              "
              type="button"
              ><span class="material-symbols-outlined text-sm">add</span>Add
              Definition</primary-button
            >
          </div>
        </new-definition>
      </transition-group>
      <primary-button>Submit</primary-button>
    </form>
  </div>
</template>

<script>
import NewDefinition from "../components/vocab/NewDefinition.vue";
import { v4 as uuidv4 } from "uuid";
import PrimaryCard from "@/components/UI/PrimaryCard.vue";
export default {
  components: { NewDefinition, PrimaryCard },

  data() {
    return {
      id: uuidv4(),
      title: "",
      meaning: [
        {
          id: uuidv4(),
          type: "",
          meaning: "",
          sample: "",
        },
      ],
      // api_id: "d156b09c",
      // api_key: "8ab08e6ccafaa7580af1731f57f02b5f",
      // language: "en-gb",
    };
  },

  methods: {
    handleFunction() {
      if (this.$route.params.id) {
        this.editWord();
      } else {
        this.addWord();
      }
    },

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

    editWord() {
      this.axios
        .put("/api/editWord/" + this.id, {
          title: this.title,
          meaning: this.meaning,
        })
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

    removeDefinition(id) {
      this.meaning = this.meaning.filter((item) => item.id != id);
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

    // getMeaningApi() {
    //   this.axios
    //     .get(
    //       "https://od-api.oxforddictionaries.com/api/v2/" +
    //         this.language +
    //         "/" +
    //         this.title.toLowerCase()
    //     )
    //     .then((response) => {
    //       console.log(response);
    //     });
    // },
  },

  beforeMount() {
    if (this.$route.params.id) {
      this.axios
        .get("/api/getWord/" + this.$route.params.id)
        .then((response) => {
          if (response.status == 200) {
            this.id = response.data.id;
            this.title = response.data.title;
            this.meaning = response.data.meaning;
          }
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
};
</script>

<style scoped>
.list-leave-to,
.list-enter-from {
  @apply opacity-0;
}

.list-enter-to {
  @apply opacity-100;
}

.list-leave-active,
.list-enter-active {
  @apply transition-all;
}
</style>