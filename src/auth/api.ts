import { apiClient } from "@/core/api/httpClient";
import LoginInfo from "@/auth/types/LoginInfo";
import User from "@/auth/types/User";

const mockUser = {
  rights: ["AccessToCampaign", "AccessToUser"],
};

export default {
  sendResetEmail: async (email: string) => {
    return await apiClient
      .post("/forgot-password", {
        email,
      })
      .then((json) => json.data);
  },
  setPassword: async (password: string, token: string) => {
    return await apiClient
      .post("/set-password", {
        password,
        token,
      })
      .then((json) => json.data);
  },
  login: async (email: string, password: string): Promise<LoginInfo> => {
    return await apiClient
      .post("/login", {
        password,
        email,
      })
      .then((json) => json.data)
      .then((data) => ({
        token: data?.token || null,
        user: mockUser,
        //user: data?.user || null,
      }));
  },
  logout: async () => {
    return await apiClient.get("/logout").then((json) => json.data);
  },
  getUser: async (): Promise<User> => {
    return Promise.resolve(mockUser);
    // return await apiClient
    //   .get("/user")
    //   .then((json) => json.data)
    //   .then((data) => data);
  },
};
