<template>
  <div id="app" class="d-flex flex-column min-vh-100 bg-light animate__animated animate__fadeIn">
    <NavBar />
    <main class="flex-grow container py-4">
      <router-view />
    </main>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'

export default {
  name: "App",
  components: {
    NavBar
  }
}
</script>

<style>
/* Estilos globales adicionales, si los necesitas */
</style>
