import { defineStore } from "pinia";
import api from "@/auth/api";
import { apiClient } from "@/core/api/httpClient";
import User from "@/auth/types/User";

const tokenStorageKey = "token";

type AuthStore = {
  token: string | null;
  user: User | null;
};

export const useAuthStore = defineStore({
  id: "auth",
  state: (): AuthStore => ({
    token: null,
    user: null,
  }),
  actions: {
    sendResetEmail(email: string) {
      return api.sendResetEmail(email);
    },
    setPassword(password: string, token: string) {
      return api.setPassword(password, token);
    },
    loadTokenLocal() {
      const token = localStorage.getItem(tokenStorageKey);
      if (token) {
        this.setToken(token);
      }
    },
    setToken(token: string | null) {
      this.token = token;
      if (token) {
        apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
        localStorage.setItem(tokenStorageKey, token);
      } else {
        delete apiClient.defaults.headers.common.Authorization;
        localStorage.removeItem(tokenStorageKey);
      }
    },
    doLogin(userName: string, password: string) {
      return api.login(userName, password).then((loginInfo) => {
        this.setToken(loginInfo.token);
        this.user = loginInfo.user;
      });
    },
    getUser() {
      return api.getUser().then((user: User) => {
        this.user = user;
      });
    },
    doLogout() {
      return api.logout().then(() => {
        this.setToken(null);
        this.user = null;
      });
    },
  },
  getters: {
    hasUser(state): boolean {
      return !!state.user;
    },
    userHasRight(state) {
      return (rightCode: string): boolean => {
        if (state.user) {
          return state.user.rights.indexOf(rightCode) !== -1;
        }
        return false;
      };
    },
    hasToken(state): boolean {
      return !!state.token;
    },
  },
});
