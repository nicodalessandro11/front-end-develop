<template>
    <div class="date-banner mb-3 text-center">
        <span class="badge badge-secondary">
            <i class="fas fa-calendar-day"></i>
            Today is {{ todayDate }}
        </span>
    </div>

    <div class="container mt-4 palette-200 pt-5 pb-5 ps-5 pe-5 rounded-4">
        <h6 class="mb-3">Start organizing your tasks!</h6>
        <h1 class="mb-3 text-thin">Add a new Task</h1>
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
            <button @click="addTask" class="btn btn-secondary btn-second">Add</button>
        </div>
    </div>
</template>

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

// Create a reactive variable to display today's date
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const todayDate = ref(new Intl.DateTimeFormat('en-US', options).format(new Date()));

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

<style scoped>
.container {
    max-width: 600px;
    background-color: #222222;
    color: white;
}

.date-banner {
    padding: 15px;
    margin-bottom: 20px;
}

.date-banner .badge {
    background-color: #222222;
    color: #f8f9fa;
    padding: 15px 25px;
    border-radius: 20px;
    font-size: 17px;
}

.date-banner .badge i {
    margin-right: 10px;
}
</style>
