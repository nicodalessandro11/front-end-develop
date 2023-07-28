import { defineStore } from "pinia";

export const useModalStore = defineStore({
  id: "modal",
  state: () => ({
    isModalOpen: false,
    isToastOpen: false,
    message: "",
    messageType: "", // 'error', 'warning', or 'success'
    confirmation: null,
  }),
  actions: {
    openToast(message, messageType) {
      this.isToastOpen = true;
      this.message = message;
      this.messageType = messageType;

      // Closes the modal automatically after 2 seconds
      setTimeout(() => {
        this.closeToast();
      }, 2000);
    },
    resetConfirmation() {
      this.confirmation = null;
    },
    setConfirmation(value) {
      this.confirmation = value;
    },
    openModal(message) {
      this.isModalOpen = true;
      this.message = message;
    },
    closeToast() {
      this.isToastOpen = false;
      this.message = "";
      this.messageType = "";
    },
    closeModal() {
      this.isModalOpen = false;
      this.message = "";
      this.messageType = "";
    },
  },
});
