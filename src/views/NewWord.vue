<template>
  <header-toolbar :backButton="true">{{ pageTitle }}</header-toolbar>
  <content-wrapper>
    <user-side-menu></user-side-menu>
    <div class="self-stretch w-full flex flex-col">
      <form
        v-if="!isLoading"
        @submit.prevent="handleFunction"
        class="flex flex-col gap-3 w-full"
      >
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
      <div
        v-else-if="isLoading"
        class="
          flex flex-col
          gap-2
          mt-8
          justify-center
          items-center
          grow
          dark:text-gray-400
        "
      >
        <span
          class="
            material-symbols-outlined
            text-9xl text-gray-300
            dark:text-gray-600
          "
        >
          hourglass_top
        </span>
        <p class="text-xl">Please Wait ...</p>
      </div>
    </div>
  </content-wrapper>
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
      isLoading: false,
      // api_id: "d156b09c",
      // api_key: "8ab08e6ccafaa7580af1731f57f02b5f",
      // language: "en-gb",
    };
  },

  computed: {
    pageTitle() {
      return this.$route.params.id ? "Edit Word" : "Add Word";
    },
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
      this.isLoading = true;
      this.axios
        .post("/api/vocab", { title: this.title, meaning: this.meaning })
        .then((response) => {
          if (response.status == 201) {
            this.$store.dispatch("setNotification", {
              message: "New word has been added",
              type: "success",
            });
            this.$router.back();
          }
        })
        .catch((error) => {
          this.$store.dispatch("setNotification", {
            message: error.response.data.message,
            type: "error",
          });
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    editWord() {
      this.isLoading = true;
      this.axios
        .put("/api/vocab/" + this.id, {
          title: this.title,
          meaning: this.meaning,
        })
        .then((response) => {
          if (response.status == 200) {
            this.$store.dispatch("setNotification", {
              message: "This word has been edited",
              type: "success",
            });
            this.$router.back();
          }
        })
        .catch((error) => {
          this.$store.dispatch("setNotification", {
            message: error.response.data.message,
            type: "error",
          });
        })
        .finally(() => {
          this.isLoading = false;
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

    getData(id) {
      this.isLoading = true;
      this.axios
        .get("/api/vocab/" + id)
        .then((response) => {
          if (response.status == 200) {
            this.id = response.data.data.id;
            this.title = response.data.data.title;
            if (response.data.data.meanings.length > 0) {
              this.meaning = response.data.data.meanings;
            }
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
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
      this.getData(this.$route.params.id);
    }
  },

  updated() {
    if (!this.$route.params.id) {
      this.id = uuidv4();
      this.title = "";
      this.meaning = [
        {
          id: uuidv4(),
          type: "",
          meaning: "",
          sample: "",
        },
      ];
    } else {
      this.getData(this.$route.params.id);
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