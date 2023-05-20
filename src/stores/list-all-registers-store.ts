import { defineStore } from 'pinia'

import { dataStore } from '@/stores'
import { type Register } from "@/datatypes/register"

export const listAllRegistersStore = defineStore("listAllRegistersStore", {
  state: () => ({
    loadingData: false,
    loadedData: false,
    currentPage: -1,
    linesPerPage: 10,
    sortBy: "Nome",
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
    updatePagination(): void {
      this.startDataLoading()
      this.data = this.dataStore.getPaginetedRegisters(this.linesPerPage, this.currentPage, this.sortBy)
      this.finishDataLoadingWithDelay()
    }
  }
})