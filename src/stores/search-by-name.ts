import { defineStore } from 'pinia'

import { dataStore } from '@/stores'
import { type Register } from "@/datatypes/register"

export const searchByNameStore = defineStore("searchByNameStore", {
  state: () => ({
    loadingData: false,
    loadedData: false,
    name: "",
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
    showData(): boolean {
      return !this.loadingData && this.loadedData
    },
    updateData(): void {
      this.startDataLoading()
      this.data = this.dataStore.searchByName(this.name)
      this.finishDataLoadingWithDelay()
    }
  }
})