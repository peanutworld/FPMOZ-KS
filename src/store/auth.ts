import { defineStore } from "pinia";
import api from "../api/api";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface AuthResponse {
  status: string;
  token: string;
  data: {
    user: User;
  };
}

interface Credentials {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as User | null,
    isAuthenticated: false,
  }),
  actions: {
    async fetchUser() {
      const token = localStorage.getItem("auth_token");
      if (token) {
        try {
          const { data } = await api.get("/users/me");
          const authData = { status: "success", token, ...data };
          this.setUser(authData);
        } catch (error) {
          this.logout();
        }
      } else {
        this.logout();
      }
    },
    async signup(credentials: Credentials) {
      const { data } = await api.post("/users/signup", credentials);
      this.setUser(data);
    },
    async login(credentials: Credentials) {
      const { data } = await api.post("/users/login", credentials);
      this.setUser(data);
    },
    setUser(data: AuthResponse) {
      this.user = data.data.user;
      this.isAuthenticated = true;
      localStorage.setItem("auth_token", data.token);
    },
    logout() {
      this.user = null;
      this.isAuthenticated = false;
      localStorage.removeItem("auth_token");
    },
  },
});
