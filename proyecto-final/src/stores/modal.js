import { defineStore } from "pinia";

export const useModalStore = defineStore({
  id: "modal",
  state: () => ({
    isModalOpen: false,
    message: "",
    messageType: "", // 'error', 'warning', or 'success'
  }),
  actions: {
    openModal(message, messageType) {
      this.isModalOpen = true;
      this.message = message;
      this.messageType = messageType;

      // Closes the modal automatically after 2 seconds
      setTimeout(() => {
        this.closeModal();
      }, 2000);
    },
    closeModal() {
      this.isModalOpen = false;
      this.message = "";
      this.messageType = "";
    },
  },
});
