import _ from "underscore"

import { defineStore } from 'pinia'
import { type Register } from "@/datatypes/register"


async function getAllRegisters(): Promise<Register[]> {
  let url = "http://thanos.icmc.usp.br:4567/api/v1/defesas"
  const response = await fetch(url)
  const json = await response.json();
  let listOfRegisters: Register[] = json["items"]
  return listOfRegisters
}

const sortStringColumn = (sortBy: string): Function => {
  return (a: Register, b: Register): boolean => a[sortBy].localeCompare(b[sortBy])
}

const sortDateColumn = (a: Register, b: Register): boolean => {
  const firstSplited = a.Data.split('/')
  const secondSplited = b.Data.split('/')
  return firstSplited[2] - secondSplited[2] || firstSplited[1] - secondSplited[1] || firstSplited[0] - secondSplited[0]
}

const registers = await getAllRegisters()

export const dataStore = defineStore("dataStore", {
  state: () => ({ 
    registers: registers,
    numberOfPages: 1
  }),
  actions: {
    getPaginetedRegisters(pageSize: number, pageNumber: number, sortBy: string): Register[] {
      const currentNumberOfPages = Math.floor(this.registers.length / pageSize)
      const firstIndex = pageNumber * pageSize
      const lastIndex = (pageNumber + 1) * pageSize > this.registers.length ? this.registers.length : (pageNumber + 1) * pageSize
      this.numberOfPages = currentNumberOfPages
      if(sortBy==="Data") return this.registers.slice().sort(sortDateColumn).slice(firstIndex, lastIndex)
      else if(sortBy === "NaoOrdenar") return this.registers.slice().slice(firstIndex, lastIndex)
      return this.registers.slice().sort(sortStringColumn(sortBy)).slice(firstIndex, lastIndex)
    },
    searchByYear(year: string): Register[] {
      return this.registers.filter((register: Register) => register.Data.includes(year))
    },
    searchByName(name: string): Register[] {
      return this.registers.filter((register: Register) => register.Nome.includes(name))
    },
    searchByCourse(course: string, pageNumber: number): Register[] {
      const pageSize = 50
      const data = this.registers.filter((register: Register) => register.Curso.includes(course))
      console.log(data.length)
      const currentNumberOfPages = Math.floor(data.length / pageSize)
      this.numberOfPages = currentNumberOfPages > 0 ? currentNumberOfPages : 1
      const firstIndex = pageNumber * pageSize > data.length ? 0 : pageNumber * pageSize
      const lastIndex = (pageNumber + 1) * pageSize > data.length ? data.length : (pageNumber + 1) * pageSize
      return data.slice(firstIndex, lastIndex)
    },
    searchByProgram(program: string, pageNumber: number): Register[] {
      const pageSize = 50
      const data = this.registers.filter((register: Register) => register.Programa.includes(program))
      console.log(data.length)
      const currentNumberOfPages = Math.floor(data.length / pageSize)
      this.numberOfPages = currentNumberOfPages > 0 ? currentNumberOfPages : 1
      const firstIndex = pageNumber * pageSize > data.length ? 0 : pageNumber * pageSize
      const lastIndex = (pageNumber + 1) * pageSize > data.length ? data.length : (pageNumber + 1) * pageSize
      return data.slice(firstIndex, lastIndex)
    },
    getUniqueCourses(): string[] {
      const courses: string[] = []
      this.registers.forEach((element: Register) => {
        if(!courses.includes(element.Curso)) courses.push(element.Curso)
      });
      return courses
    },
    getUniquePrograms(): string[] {
      const programs: string[] = []
      this.registers.forEach((element: Register) => {
        if(!programs.includes(element.Programa)) programs.push(element.Programa)
      });
      return programs
    }
  }
})