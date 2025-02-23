import { createRouter, createWebHistory } from "vue-router";
import Login from "../pages/Login.vue";
import Dashboard from "../pages/Dashboard.vue";
import NotFound from "../pages/NotFound.vue";
import { useAuthStore } from "../store/auth";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { requiresAuth: false },
  },
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  await authStore.fetchUser();

  // If the user is not authenticated
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next("/login"); // redirect to login
  } else {
    next(); // allow navigation
  }
});

export default router;
