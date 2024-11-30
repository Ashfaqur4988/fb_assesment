import { create } from "zustand";
import axios from "../lib/axios.js";
import { toast } from "react-hot-toast";

export const useAuthStore = create((set) => ({
  user: null,
  checkingAuth: true,
  loading: false,

  signup: async ({ username, email, password }) => {
    set({ loading: true });
    if (!username || !email || !password)
      return toast.error("All fields are required");

    try {
      const response = await axios.post("/auth/signup", {
        username,
        email,
        password,
      });
      set({ loading: false, user: response.data });
      toast.success("Sign up done successfully");
    } catch (error) {
      console.log(error, "error in signup " + error.response.data.message);
      set({ loading: false });
      toast.error(error.response.data.message);
    }
  },

  login: async ({ email, password }) => {
    set({ loading: true });
    try {
      const response = await axios.post("/auth/login", {
        email,
        password,
      });
      set({ loading: false, user: response.data });
      console.log(response.data);
      toast.success("Login done successfully");
    } catch (error) {
      console.log(error, "error in login " + error.response.data.message);
      set({ loading: false });
      toast.error(error.response.data.message);
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      await axios.post("/auth/logout");
      set({ loading: false, user: null });
      toast.success("Logout done successfully");
    } catch (error) {
      console.log(error, "error in logout " + error.response.data.message);
      set({ loading: false });
      toast.error(error.response.data.message);
    }
  },

  checkAuth: async () => {
    set({ checkingAuth: true });
    try {
      const response = await axios.get("/auth/checkauth");
      set({ checkingAuth: false, user: response.data });
    } catch (error) {
      console.log(error, "error in checkAuth " + error.response.data.message);
      set({ checkingAuth: false, user: null });
      throw error;
    }
  },
}));
