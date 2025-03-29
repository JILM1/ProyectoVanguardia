<template>
    <nav class="navbar navbar-expand-lg navbar-dark custom-navbar shadow-lg animate__animated animate__fadeIn">
      <div class="container">
        <a class="navbar-brand" href="#">ConectaCent</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarContent">
          <div class="d-flex">

            <!-- Botón para ver la lista de reservaciones, visible solo en ReservationPage -->
            <button
              v-if="showListButton"
              class="btn btn-outline-primary me-2"
              @click="goToReservationList"
            >
              Ver Lista de Restaurantes
            </button>
            <button class="btn btn-danger" @click="logout">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: "NavBar",
    computed: {
      // Retorna true si la ruta actual es Reservation (página de crear reservación)
      isReservationPage() {
        return this.$route.name === "Reservation";
      },
      // Por ejemplo, mostrar el botón de "Ver Reservaciones" solo si ya estás en la página de reservación
      showListButton() {
        return this.$route.name === "Reservation";
      }
    },
    methods: {
      logout() {
        localStorage.removeItem("user");
        this.$router.push("/");
      },
      goToReservationList() {
        this.$router.push("/reservation-list");
      },
      goToReservationPage() {
        this.$router.push("/reservation");
      }
    }
  };
  </script>
  
  <style scoped>
  .custom-navbar {
    background: linear-gradient(90deg, #2c3e50, #4ca1af);
  }
  </style>
  