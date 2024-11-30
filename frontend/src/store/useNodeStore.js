import { create } from "zustand";
import axios from "../lib/axios";

export const useNodeStore = create((set) => ({
  allNodes: [],
  allEdges: [],
  loading: false,

  getAllNodes: (nodes) => {
    console.log(nodes.slice(3));
  },

  getAllEdges: (edges) => {
    console.log(edges);
  },

  scheduleMail: async (nodes) => {
    try {
      set({ loading: true });
      const response = await axios.post("/schedule-mail/", { nodes });
      console.log(response.data);
      set({ loading: false });
    } catch (error) {
      set({ loading: false });
      console.log(error);
    }
  },
}));