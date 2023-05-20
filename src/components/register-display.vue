<template>
  <v-expansion-panel>
    <v-expansion-panel-title>{{register.Nome}}</v-expansion-panel-title>
    <v-expansion-panel-text>
      <p><strong>Curso</strong>: {{register.Curso}}</p>
      <p><strong>Programa</strong>: {{register.Programa}}</p>
      <p><strong>Ordem</strong>: {{register.Ordem}}</p>
      <p><strong>Nome</strong>: {{register.Nome}}</p>
      <p><strong>Data</strong>: {{register.Data}}</p>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script>
  export default {
    props: ["register"]
  }
</script>