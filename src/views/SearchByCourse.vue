<template>
  <v-main class="text-center">
    <v-radio-group inline v-model="viewState.course">
      <template v-for="course in dataStore.getUniqueCourses()">
        <v-radio :label="course" :value="course"></v-radio>
      </template>
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
  import { dataStore, searchByCourseStore } from '@/stores'
  import RegisterDisplay from "@/components/register-display.vue"

  export default {
    components: {
      RegisterDisplay
    },
    created() {
      if(this.viewState.course == -1) this.viewState.course = this.dataStore.getUniqueCourses()[0]
    },
    data() {
      return {
        dataStore: dataStore(),
        viewState: searchByCourseStore()
      }
    },
    watch: {
      "viewState.course" () {
        this.viewState.updateData()
      },
      "viewState.currentPage" () {
        this.viewState.updateData()
      }
    }
  }
</script>