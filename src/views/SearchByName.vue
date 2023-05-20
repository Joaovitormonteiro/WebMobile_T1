<template>
  <v-main class="text-center">
    <v-text-field clearable label="Digite o nome" prepend-icon="mdi-magnify" v-model="viewState.name"></v-text-field>
    <v-progress-circular indeterminate v-if="viewState.showProgress()"></v-progress-circular>
    <template v-if="viewState.showData()">
      <v-expansion-panels variant="popout">
        <template v-for="register in viewState.data">
          <RegisterDisplay :register="register"></RegisterDisplay>
        </template>
      </v-expansion-panels>
    </template>
  </v-main>
</template>

<script>
  import { dataStore, searchByNameStore } from '@/stores'
  import RegisterDisplay from "@/components/register-display.vue"

  export default {
    components: {
      RegisterDisplay
    },
    data() {
      return {
        dataStore: dataStore(),
        viewState: searchByNameStore()
      }
    },
    watch: {
      "viewState.name" () {
        this.viewState.updateData()
      }
    }
  }
</script>