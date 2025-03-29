<template>
  <div class="container py-5 animate__animated animate__fadeIn" style="min-height: 100vh; background: #f5f5f5;">
    <div class="row">
      <!-- Left Column: Display restaurant details if available -->
      <div class="col-md-8" v-if="selectedRestaurant">
        <div class="card mb-4 shadow-lg">
          <img :src="selectedRestaurant.imageUrl" class="card-img-top" :alt="selectedRestaurant.name" />
          <div class="card-body">
            <h2 class="card-title">{{ selectedRestaurant.name }}</h2>
            <div class="d-flex align-items-center mb-3">
              <span class="badge bg-warning text-dark me-2">{{ selectedRestaurant.rating || '4.5' }}</span>
              <span class="text-muted">500 reseñas</span>
            </div>
            <h5 class="text-secondary mb-3">{{ selectedRestaurant.cuisine }}</h5>
            <p class="card-text">
              {{ selectedRestaurant.description }}
            </p>
            <p class="card-text">
              <strong>Horarios:</strong> Lunes - Domingo, 12:00 PM - 10:00 PM
            </p>
            <p class="card-text">
              <strong>Ubicación:</strong> {{ selectedRestaurant.location }}
            </p>
          </div>
        </div>
      </div>
      
      <!-- Right Column: Reservation Form -->
      <div class="col-md-4">
        <div class="card shadow-lg">
          <div class="card-header bg-primary text-white">
            <h5 class="mb-0">Crear Reservación</h5>
          </div>
          <div class="card-body">
            <form @submit.prevent="createReservation">
              <div class="mb-3">
                <label class="form-label">Usuario</label>
                <input
                  type="text"
                  class="form-control"
                  :value="user?.email"
                  disabled
                />
              </div>
              <div class="mb-3">
                <label for="fecha" class="form-label">Fecha</label>
                <input
                  v-model="reservationForm.fecha"
                  type="date"
                  id="fecha"
                  class="form-control"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="hora" class="form-label">Hora</label>
                <input
                  v-model="reservationForm.hora"
                  type="time"
                  id="hora"
                  class="form-control"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="cantidad" class="form-label">Cantidad de personas</label>
                <input
                  v-model="reservationForm.cantidad"
                  type="number"
                  id="cantidad"
                  class="form-control"
                  min="1"
                  required
                />
              </div>
              <button type="submit" class="btn btn-success w-100">
                Crear Reservación
              </button>
            </form>
            <div v-if="message && !error" class="alert alert-success mt-3" role="alert">
              {{ message }}
            </div>
            <div v-if="error" class="alert alert-danger mt-3" role="alert">
              {{ message }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "ReservationPage",
  props: ["restaurantId"],
  data() {
    return {
      selectedRestaurant: null,
      reservationForm: {
        fecha: "",
        hora: "",
        cantidad: 1
      },
      message: "",
      error: false,
      user: null
    };
  },
  created() {
    // Check if user is authenticated
    const userStr = localStorage.getItem("user");
    if (userStr) {
      this.user = JSON.parse(userStr);
    } else {
      // Redirect to login if not authenticated
      this.$router.push("/");
    }

    // If restaurantId is provided, look up the corresponding restaurant
    if (this.restaurantId) {
      // For demonstration, we use a hardcoded list.
      // In a real app, replace this with an API call or global store.
      const mockRestaurants = [
        {
          id: 1,
          name: "Tanoshii",
          location: "Francisco Morazán, Honduras",
          description: "Disfruta de auténticos platillos japoneses: sushi, ramen y tempura.",
          imageUrl: require("@/assets/tanoshi.png"),
          cuisine: "Japonesa",
          rating: 4.5
        },
        {
          id: 2,
          name: "Casa Italiana",
          location: "Tegucigalpa, Honduras",
          description: "Pasta fresca, pizzas al horno y postres clásicos italianos.",
          imageUrl: require("@/assets/cuisinette.png"),
          cuisine: "Italiana",
          rating: 4.7
        }
      ];
      // Find the restaurant that matches the restaurantId prop
      const found = mockRestaurants.find(r => r.id === parseInt(this.restaurantId, 10));
      if (found) {
        this.selectedRestaurant = found;
      }
    }
  },
  methods: {
    async createReservation() {
      try {
        if (!this.user) {
          this.error = true;
          this.message = "Debes iniciar sesión para crear una reservación";
          return;
        }

        // Build the reservation payload with the authenticated user's ID
        const reservationData = {
          usuario: this.user.id,
          fecha: this.reservationForm.fecha,
          hora: this.reservationForm.hora,
          cantidad: this.reservationForm.cantidad
        };

        const response = await axios.post("http://localhost:5000/api/reservas", reservationData);
        
        if (response.status === 201) {
          this.message = "Reservación creada exitosamente";
          this.error = false;
          // Reset the form
          this.reservationForm = {
            fecha: "",
            hora: "",
            cantidad: 1
          };
        }
      } catch (err) {
        console.error("Error al crear la reservación:", err);
        this.error = true;
        this.message = err.response?.data?.error || "Error al crear la reservación";
      }
    }
  }
};
</script>

<style scoped>
/* Additional styling as needed */
</style>