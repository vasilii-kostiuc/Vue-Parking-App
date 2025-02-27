import { createRouter, createWebHistory } from "vue-router";
 
function auth(to, from, next) {
  if (!localStorage.getItem("access_token")) {
    return next({ name: "login" });
  }
 
  next();
}
 
function guest(to, from, next) {
  if (localStorage.getItem("access_token")) {
    return next({ name: "vehicles.index" });
  }
 
  next();
}
 
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: import("@/views/HomeView.vue"),
    },
    {
      path: "/register",
      name: "register",
      beforeEnter: guest,
      component: () => import("@/views/Auth/RegisterView.vue"),
    },
    {
      path: "/vehicles",
      name: "vehicles.index",
      beforeEnter: auth,
      component: () => import("@/views/Vehicles/IndexView.vue"),
    },
    {
      path: "/vehicles/:id/edit",
      name: "vehicles.edit",
      beforeEnter: auth,
      component: () => import("@/views/Vehicles/EditView.vue"),
    },
    {
      path: "/login",
      name: "login",
      beforeEnter: guest,
      component: () => import("@/views/Auth/LoginView.vue"),
    },
    {
      path: "/profile",
      name: "profile.edit",
      beforeEnter: auth,
      component: () => import("@/views/Profile/EditView.vue"),
    },
    {
      path: "/vehicles/create",
      name: "vehicles.create",
      beforeEnter: auth,
      component: () => import("@/views/Vehicles/CreateView.vue"),
    },
    {
      path: "/parkings/active",
      name: "parkings.active",
      beforeEnter: auth,
      component: () => import("@/views/Parkings/ActiveParkings.vue"),
    },
    {
      path: "/parkings/new",
      name: "parkings.create",
      beforeEnter: auth,
      component: () => import("@/views/Parkings/ParkingOrder.vue"),
    },
    {
      path: "/parkings/history",
      name: "parkings.history",
      beforeEnter: auth,
      component: () => import("@/views/Parkings/ParkingHistory.vue"),
    },
    {
      path: "/parkings/:id",
      name: "parkings.show",
      beforeEnter: auth,
      component: () => import("@/views/Parkings/ParkingDetails.vue"),
    },
  ],
});
 
export default router;