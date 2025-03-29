// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../components/LoginPage.vue";
import ReservationPage from "../components/ReservationPage.vue";
import ReservationList from "../components/ReservationsList.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: LoginPage
  },
  {
    path: "/reservation-list",
    name: "ReservationsList",
    component: ReservationList
  },
  {
    path: "/reservation",
    name: "Reservation",
    component: ReservationPage
  },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
