<template>
  <div class="login-container min-vh-100 d-flex animate__animated animate__fadeIn">
    <!-- Sección izquierda (fondo de color + formulario de inicio de sesión) -->
    <div class="left-section d-flex flex-column justify-content-center align-items-center p-4">
      <!-- Texto principal -->
      <h2 class="text-white mb-1">Iniciar Sesión</h2>
      <p class="text-white mb-4">
        Bienvenido a nuestra página 
        <span class="ms-2" style="cursor: pointer;"></span>
      </p>

      <!-- Formulario de inicio de sesión -->
      <form @submit.prevent="login" class="w-100" style="max-width: 300px;">
        <div class="mb-3">
          <label class="form-label text-white">Email</label>
          <input
            v-model="email"
            type="email"
            placeholder="Email"
            class="form-control"
            required
          />
        </div>
        <div class="mb-3">
          <label class="form-label text-white">Contraseña</label>
          <input
            v-model="password"
            type="password"
            placeholder="Contraseña"
            class="form-control"
            required
          />
        </div>
        <div class="form-check mb-3">
          <input
            type="checkbox"
            class="form-check-input"
            id="keepLoggedIn"
          />
          <label for="keepLoggedIn" class="form-check-label text-white">
            Mantener sesión iniciada
          </label>
        </div>
        <button type="submit" class="btn btn-primary w-100 mb-2">
          Iniciar Sesión
        </button>
        <p v-if="error" class="mt-3 text-danger text-center">{{ error }}</p>
      </form>
    </div>

    <!-- Sección derecha (ilustración) -->
    <div class="right-section d-flex justify-content-center align-items-center p-4">
      <!-- Ajusta la ruta de la imagen a la tuya -->
      <img
        src="@/assets/logo1.jpg"
        alt="Ilustración"
        class="img-fluid"
        style="max-width: 400px;"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
      error: ""
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:5000/api/auth/login', {
          email: this.email,
          password: this.password
        });
        
        if (response.data.usuarioId) {
          // Store the user ID in localStorage
          localStorage.setItem("user", JSON.stringify({ 
            id: response.data.usuarioId,
            email: this.email 
          }));
          this.$router.push("/reservation-list");
        } else {
          this.error = "Error en la autenticación";
        }
      } catch (error) {
        this.error = error.response?.data?.error || "Error en la autenticación";
      }
    }
  }
};
</script>

<style scoped>
/* Contenedor principal que ocupa toda la altura y se divide en dos columnas */
.login-container {
  width: 100%;
}

/* Sección izquierda: fondo de color, texto blanco */
.left-section {
  flex: 1;
  background: linear-gradient(90deg, #2c3e50, #4ca1af);
}

/* Sección derecha: fondo blanco con la ilustración */
.right-section {
  flex: 1;
  background-color: #fff;
}

/* Botones: transición y colores */
.btn-primary {
  background-color: #0062cc;
  border-color: #005cbf;
  transition: background-color 0.3s ease;
}
.btn-primary:hover {
  background-color: #005cbf;
}
</style>
