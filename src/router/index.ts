import { createRouter, createWebHistory } from 'vue-router'
import AboutView from "@/views/About.vue"
import ListAllRegistersView from "@/views/ListAllRegisters.vue"
import SearchByYearView from "@/views/SearchByYear.vue"
import SearchByNameView from "@/views/SearchByName.vue"
import SearchByCourseView from "@/views/SearchByCourse.vue"
import SearchByProgramView from "@/views/SearchByProgram.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/about', name: 'about', component: AboutView },
    { path: '/listAllRegisters', name: 'listAllRegisters', component: ListAllRegistersView },
    { path: '/searchByYear', name: 'searchByYear', component: SearchByYearView },
    { path: '/searchByName', name: 'searchByName', component: SearchByNameView },
    { path: '/searchByCourse', name: 'searchByCourse', component: SearchByCourseView },
    { path: '/searchByProgram', name: 'searchByProgram', component: SearchByProgramView }
  ]
})

export default router
