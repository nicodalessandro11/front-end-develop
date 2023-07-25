<!-- Import necessary modules -->
<script setup>
import { ref } from "vue";
import { useTaskStore } from "../stores/task";

// Initialize taskStore using the useTaskStore function
const taskStore = useTaskStore();

// Create reactive variables using ref()
const name = ref('');
const description = ref('');

// Create reactive variables to handle error messages
const showErrorMessage = ref(false);
const errorMessage = ref(null);

// Function to add a task
const addTask = () => {
    // Check if name or description is empty
    if (name.value.length === 0 || description.value.length === 0) {
        // Display an error message
        showErrorMessage.value = true;
        errorMessage.value = 'The task title or description is empty';

        // Hide the error message after 5 seconds
        setTimeout(() => {
            showErrorMessage.value = false;
        }, 5000);
    } else {
        // If both name and description are provided, add the task to the taskStore
        taskStore.addTask(name.value, description.value);

        // Clear the name and description fields
        name.value = '';
        description.value = '';
    }
};
</script>


<template>
    <div class="container mt-4">
        <h1 class="mb-3">Add a new Task</h1>
        <div v-if="showErrorMessage" class="alert alert-danger" role="alert">
            {{ errorMessage }}
        </div>
        <div>
            <div class="mb-3">
                <input type="text" class="form-control" placeholder="Add a Task Title" v-model="name">
            </div>
            <div class="mb-3">
                <input type="text" class="form-control" placeholder="Add a Task Description" v-model="description">
            </div>
            <button @click="addTask" class="btn btn-primary">Add</button>
        </div>
    </div>
</template>

<style scoped>
.container {
    max-width: 600px;
}
</style>

  