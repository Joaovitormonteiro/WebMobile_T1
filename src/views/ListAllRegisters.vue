<template>
  <v-main class="text-center">
    <v-radio-group inline v-model="viewState.sortBy">
      <v-radio label="Não ordenar" value="NaoOrdenar"></v-radio>
      <v-radio label="Ordenar por curso" value="Curso"></v-radio> 
      <v-radio label="Ordenar por programa" value="Programa"></v-radio>
      <v-radio label="Ordenar por ordem" value="Ordem"></v-radio>
      <v-radio label="Ordernar por nome" value="Nome"></v-radio>
      <v-radio label="Ordernar por data" value="Data"></v-radio>
    </v-radio-group>
    <v-pagination :length="dataStore.numberOfPages" v-model="viewState.currentPage" active-color="#f00">
    </v-pagination>
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
  import { dataStore } from '@/stores'
  import { listAllRegistersStore } from '@/stores'
  import RegisterDisplay from "@/components/register-display.vue"

  export default {
    components: {
      RegisterDisplay
    },
    created() {
      if(this.viewState.currentPage == -1) this.viewState.currentPage = 1
    },
    data() {
      return {
        dataStore: dataStore(),
        viewState: listAllRegistersStore(),
      }
    },
    watch: {
      "viewState.currentPage" () {
        this.viewState.updatePagination()
      },
      "viewState.sortBy" () {
        this.viewState.updatePagination()
      }
    }
  }
</script>