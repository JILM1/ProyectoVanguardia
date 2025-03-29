<template>
  <div class="container py-5 bg-light min-vh-100 animate__animated animate__fadeIn">
    <h2 class="mb-4 text-center">Elige tu Restaurante</h2>

    <!-- Example of a "card grid" using Bootstrap -->
    <div class="row">
      <div 
        v-for="(restaurant, index) in restaurants" 
        :key="index" 
        class="col-sm-6 col-md-4 col-lg-3 mb-4 d-flex align-items-stretch"
      >
        <div class="card shadow-sm w-100">
          <!-- Restaurant image -->
          <img
            :src="restaurant.imageUrl"
            class="card-img-top"
            :alt="restaurant.name"
            style="height: 180px; object-fit: cover;"
          />

          <!-- Card body with details -->
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">{{ restaurant.name }}</h5>
            <p class="card-text text-muted mb-1">
              {{ restaurant.location }}
            </p>
            <p class="card-text" style="flex: 1;">
              {{ restaurant.description }}
            </p>

            <!-- "Reservar" or "Book Now" button -->
            <button
              class="btn btn-primary mt-auto"
              @click="goToReservation(restaurant)"
            >
              Reservar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Optional alert for errors -->
    <div v-if="error" class="alert alert-danger mt-3" role="alert">
      {{ error }}
    </div>
  </div>
</template>

<script>
export default {
  name: "RestaurantList",
  data() {
    return {
      error: "",
      // For the example, we hardcode some restaurants.
      // You can replace this with data fetched from your API.
      restaurants: [
        {
          id: 1,
          name: "Tanoshii",
          location: "Francisco Morazán, Honduras",
          description: "Disfruta de auténticos platillos japoneses: sushi, ramen y tempura.",
          imageUrl: require("@/assets/tanoshi.png") // Example local asset
        },
        {
          id: 2,
          name: "Casa Italiana",
          location: "Tegucigalpa, Honduras",
          description: "Pasta fresca, pizzas al horno y postres clásicos italianos.",
          imageUrl: require("@/assets/cuisinette.png")
        },
        {
          id: 3,
          name: "Carnes y Asados Marinas",
          location: "San Pedro Sula, Honduras",
          description: "Cocina hondureña tradicional con un giro moderno.",
          imageUrl: require("@/assets/marinas.jpg")
        },
        {
          id: 4,
          name: "Parrilla Argentina",
          location: "Santa Lucía, Honduras",
          description: "Carnes a la parrilla al estilo argentino, con salsas y guarniciones únicas.",
          imageUrl: require("@/assets/parillaargentina.png")        
        },
        {
          id: 5,
          name: "Pescadores",
          location: "Santa Lucía, Honduras",
          description: "PESCADORES nace de nuestro amor al mar, a la buena cocina, al cuidado de la salud y del medio hambiente.",
          imageUrl: require("@/assets/pescadores.jpg")        
        },
        {
          id: 6,
          name: "CIMA",
          location: "Santa Lucía, Honduras",
          description: "Cocina a la parrilla y una mixología innovadora para brindarte una experiencia gastronómica inigualable!",
          imageUrl: require("@/assets/cima.png")        }
      ]
    };
  },
  methods: {
    goToReservation(restaurant) {
      // Example: navigate to your existing ReservationPage route
      // passing the restaurant ID as a param or query
      this.$router.push({
        name: "Reservation", // Must match the route name you set in router/index.js
        params: { restaurantId: restaurant.id }
      });
    }
  }
};
</script>

<style scoped>
/* Additional styling to refine the design */
</style>
