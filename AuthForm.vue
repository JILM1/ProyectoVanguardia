<!-- src/components/AuthForm.vue -->
<template>
  <div>
    <h2 class="text-2xl font-semibold mb-4 text-gray-800">Iniciar Sesión / Registro</h2>
    <!-- Formulario de registro -->
    <form @submit.prevent="register" class="mb-6">
      <input v-model="username" type="text" placeholder="Usuario" class="w-full p-3 mb-3 border rounded" required />
      <input v-model="email" type="email" placeholder="Email" class="w-full p-3 mb-3 border rounded" required />
      <input v-model="password" type="password" placeholder="Contraseña" class="w-full p-3 mb-3 border rounded" required />
      <button type="submit" class="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded">Registrarse</button>
    </form>
    <!-- Formulario de login -->
    <form @submit.prevent="login">
      <input v-model="loginEmail" type="email" placeholder="Email" class="w-full p-3 mb-3 border rounded" required />
      <input v-model="loginPassword" type="password" placeholder="Contraseña" class="w-full p-3 mb-3 border rounded" required />
      <button type="submit" class="w-full bg-green-500 hover:bg-green-600 text-white p-3 rounded">Iniciar Sesión</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'AuthForm',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      loginEmail: '',
      loginPassword: ''
    }
  },
  methods: {
    async register() {
      try {
        const response = await axios.post('http://localhost:5000/api/auth/register', {
          username: this.username,
          email: this.email,
          password: this.password
        });
        alert(response.data.message);
      } catch (error) {
        alert('Error en el registro');
      }
    },
    async login() {
      try {
        const response = await axios.post('http://localhost:5000/api/auth/login', {
          email: this.loginEmail,
          password: this.loginPassword
        });
        alert(response.data.message);
        // Guarda el ID del usuario o token según convenga para usarlo en las reservas
      } catch (error) {
        alert('Error en la autenticación');
      }
    }
  }
}
</script>
