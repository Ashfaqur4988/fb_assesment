import { create } from "zustand";
import axios from "../lib/axios";

export const useAddLeadSource = create((set) => ({
  isOpen: false,
  showLeadsModal: false,
  leads: [],
  loading: false,

  getLeads: async () => {
    try {
      set({ loading: true });
      const response = await axios.get("/leads/");
      set({ leads: response.data, loading: false });
      console.log(response.data);
    } catch (error) {
      set({ loading: false });
      console.log(error);
    }
  },
  openModal: () => {
    console.log("openModal"), set({ isOpen: true });
  },
  closeModal: () => {
    console.log("closeModal"), set({ isOpen: false });
  },
  openLeadsModal: () => {
    console.log("openLeadsModal"), set({ showLeadsModal: true });
  },
  closeLeadsModal: () => {
    console.log("closeLeadsModal"), set({ showLeadsModal: false });
  },
}));
