<template>
    <Teleport to="body">
        <div v-if="isModalOpen" class="my-modal" :style="{ backgroundColor: backgroundColor, borderColor: borderColor }">
            <p class="modal-text">{{ message }}</p>
            <button @click="closeModal" class="close-button">
                <i class="fas fa-times"></i> <!-- X icon -->
            </button>
        </div>
    </Teleport>
</template>

<script setup>
import { computed } from 'vue';
import { useModalStore } from '../stores/modal'

const modalStore = useModalStore()

const isModalOpen = computed(() => modalStore.isModalOpen)
const message = computed(() => modalStore.message)
const messageType = computed(() => modalStore.messageType)

setTimeout(isModalOpen.value = false, 2000)

// Determine colors based on messageType
const backgroundColor = computed(() => {
    switch (messageType.value) {
        case 'error':
            return 'rgb(249, 213, 226)';
        case 'warning':
            return 'rgb(254, 242, 184)';
        case 'success':
            return 'rgb(220, 243, 160)';
        default:
            return 'white';
    }
});

const borderColor = computed(() => {
    switch (messageType.value) {
        case 'error':
            return 'rgb(204, 12, 57)';
        case 'warning':
            return 'rgb(220, 183, 0)';
        case 'success':
            return 'rgb(152, 201, 30)';
        default:
            return 'black';
    }
});

const closeModal = () => {
    modalStore.closeModal()
}
</script>

<style scoped>
.my-modal {
    position: fixed !important;
    top: 7% !important;
    left: 50% !important;
    transform: translate(-50%, -50%) !important;
    z-index: 1000 !important;
    width: 80vw !important;
    max-width: 500px !important;
    box-sizing: border-box !important;
    display: flex !important;
    flex-direction: row !important;
    align-items: center !important;
    justify-content: center !important;
    border-width: 1px !important;
    border-style: solid !important;
    border-radius: 4px !important;
    padding: 15px !important;
    box-shadow: rgba(2, 8, 14, 0.1) 0px 8px 16px 0px !important;
}

.modal-text {
    font-size: 20px;
    margin: 0;
}

.close-button {
    background: none !important;
    border: none !important;
    cursor: pointer !important;
    position: absolute !important;
    /* position the close button absolute */
    top: 10px !important;
    /* Adjust this value to position the close button vertically */
    right: 10px !important;
    /* Adjust this value to position the close button horizontally */
    color: grey !important;
    /* Change color to grey */
}
</style>
