<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <v-app>
    <v-app-bar app>
      <img src="@/assets/logoICMC.jpeg">
      <nav>
        <RouterLink id="firstLink" to="/listAllRegisters">Listar todos</RouterLink>
        <RouterLink to="/searchByYear">Busca por ano</RouterLink>
        <RouterLink to="/searchByName">Busca por nome</RouterLink>
        <RouterLink to="/searchByCourse">Busca por curso</RouterLink>
        <RouterLink to="/searchByProgram">Busca por programa</RouterLink>
        <RouterLink to="/about">Sobre</RouterLink>
      </nav>
    </v-app-bar>
    <RouterView />
    <v-footer fixed app>Trabalho 1 da disciplina</v-footer>
  </v-app>
</template>

<style scoped>
  img {
    height: 100%;
  }

  nav *{
    padding-right: 10px;
  }

  #firstLink {
    padding-left: 10px;
  }
</style>
