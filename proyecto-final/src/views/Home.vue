<template>
  <!-- Include the Nav component -->
  <Nav />

  <!-- Include the NewTask component -->
  <div class="bg-container pt-5 pb-5">
    <NewTask />
  </div>
  <div class="wrapper container mt-4">
    <!-- Display the heading for tasks -->
    <h1 class="task120-heading mb-4 text-center">Your Tasks</h1>

    <!-- Use v-for to loop through tasks and display TaskItem component for each task -->
    <div class="task-grid">
      <TaskItem class="task-item mb-3 mx-2" v-for="task in tasks" :key="task.id" :task="task" />
    </div>
  </div>
</template>


<script setup>
// Import necessary modules from Vue
import { onMounted, computed } from 'vue';

// Import the useTaskStore function from "../stores/task" to access the task store
import { useTaskStore } from "../stores/task";

// Import components
import Nav from '../components/Nav.vue';
import NewTask from '../components/NewTask.vue';
import TaskItem from '../components/TaskItem.vue';

// Initialize the taskStore using the useTaskStore function
const taskStore = useTaskStore();

// Create a computed property to get the tasks from the task store
const tasks = computed(() => taskStore.tasksArr);

// When the component is mounted, fetch the tasks from the task store
onMounted(async () => {
  await taskStore.fetchTasks();

});
</script>

<style scoped>
.bg-container {
  background-color: #6dcdff;
}

.wrapper {
  max-width: 800px;
  margin: auto;
}

.task-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 20px;
}

.task-item {
  max-width: 300px;
  margin: auto;
}

.task-heading {
  color: #2c3e50;
  /* Change this to the color you want for your title */
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
}
</style>

