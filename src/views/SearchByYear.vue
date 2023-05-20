<template>
  <v-main class="text-center">
    <v-text-field clearable label="Digite um ano" prepend-icon="mdi-magnify" v-model="viewState.year"></v-text-field>
    <v-progress-circular indeterminate v-if="viewState.showProgress()"></v-progress-circular>
    <template v-if="!viewState.loadingData && viewState.loadedData">
      <v-expansion-panels variant="popout">
        <template v-for="register in viewState.data">
          <RegisterDisplay :register="register"></RegisterDisplay>
        </template>
      </v-expansion-panels>
    </template>
  </v-main>
</template>

<script>
  import { dataStore, searchByYearStore } from '@/stores'
  import RegisterDisplay from "@/components/register-display.vue"

  export default {
    components: {
      RegisterDisplay
    },
    data() {
      return {
        dataStore: dataStore(),
        viewState: searchByYearStore()
      }
    },
    watch: {
      "viewState.year" () {
        this.viewState.updateData()
      }
    }
  }
</script>