import { create } from "zustand";
import axios from "../lib/axios";

export const useAddBlockStore = create((set) => ({
  isAddBlockModalOpen: false,
  isColdEmailModalOpen: false,
  isWaitModalOpen: false,

  emailTemplates: [],
  loading: false,

  getEmailTemplates: async () => {
    try {
      const response = await axios.get("/email-template/");
      set({ emailTemplates: response.data, loading: false });
    } catch (error) {
      set({ loading: false });
      console.log(error);
    }
  },

  openAddBlockModal: () => set({ isAddBlockModalOpen: true }),
  closeAddBlockModal: () => set({ isAddBlockModalOpen: false }),
  openColdEmailModal: () => set({ isColdEmailModalOpen: true }),
  closeColdEmailModal: () => set({ isColdEmailModalOpen: false }),
  openWaitModal: () => set({ isWaitModalOpen: true }),
  closeWaitModal: () => set({ isWaitModalOpen: false }),
}));
