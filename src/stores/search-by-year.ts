import { defineStore } from 'pinia'

import { dataStore } from '@/stores'
import { type Register } from "@/datatypes/register"

export const searchByYearStore = defineStore("searchByYearStore", {
  state: () => ({
    loadingData: false,
    loadedData: false,
    year: "2022",
    dataStore: dataStore(),
    data: [] as Register[]
  }),
  actions: {
    startDataLoading(): void {
      this.loadingData = true
      this.loadedData = false
    },
    finishDataLoading(): void {
      this.loadingData = false
      this.loadedData = true
    },
    finishDataLoadingWithDelay(): void {
      setTimeout(() => {
        this.finishDataLoading()
      }, 1000)
    },
    showProgress(): boolean {
      return !this.loadedData && this.loadingData
    },
    updateData(): void {
      this.startDataLoading()
      this.data = this.dataStore.searchByYear(this.year)
      this.finishDataLoadingWithDelay()
    }
  }
})