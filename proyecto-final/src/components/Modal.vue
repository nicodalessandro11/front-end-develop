<template>
    <Teleport to="#modal-container">
        <div v-if="isModalOpen" class="modal">
            <div class="modal-content">
                <h2>{{ message }}</h2>
                <div class="modal-buttons">
                    <button class="confirm-button" @click="handleConfirmation">Confirm</button>
                    <button class="cancel-button" @click="handleCloseModal">Cancel</button>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script setup>
import { computed } from 'vue';
import { useModalStore } from '../stores/modal'

const modalStore = useModalStore()
const isModalOpen = computed(() => modalStore.isModalOpen)
const message = computed(() => modalStore.message)

const handleCloseModal = () => {
    modalStore.closeModal()
}

const handleConfirmation = () => {
    modalStore.setConfirmation(true);
}

</script>

<style scoped>
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background: white;
    padding: 40px;
    border-radius: 24px;
    /* Increased from 8px to 24px */
    width: 80%;
    max-width: 500px;
    text-align: center;
}

.modal-buttons {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
}

.confirm-button {
    background-color: rgb(152, 201, 30);
    border: none;
    color: black;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 24px;
    /* New property */
}

.cancel-button {
    background-color: rgb(204, 12, 57);
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 24px;
    /* New property */
}
</style>

