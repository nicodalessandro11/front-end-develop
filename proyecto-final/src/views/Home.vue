<template>
  <!-- Include the Nav component -->
  <Nav />
  <!-- Include the NewTask component -->
  <div class="bg-container palette-0 pt-5 pb-5">
    <NewTask />
  </div>
  <div class="wrapper container mt-5 mb-5 text-center">
    <!-- Display the heading for tasks -->
    <div class="task120-heading-wrapper mb-4 text-center">
      <h1 class="task120-heading">
        <i class="fas fa-clipboard-list"></i>
        Your Tasks : {{ totalTasks }}
      </h1>
    </div>
    <!-- Display a summary of tasks -->
    <div class="task-summary mb-4">
      <span>Completed: {{ tasksCompleted }}</span> <br />
      <span>Pending: {{ tasksToDo }}</span>
    </div>
    <!-- Use v-for to loop through tasks and display TaskItem component for each task -->
    <div class="task-grid mt-3">
      <TaskItem class="task-item mb-3 mx-2" v-for="task in tasks" :key="task.id" :task="task" />
    </div>
  </div>
</template>

<script setup>
// Import necessary modules from Vue
import { onMounted, computed } from 'vue';

// Import the useTaskStore function from "../stores/task" to access the task store
import { useTaskStore } from "../stores/task";
import { useModalStore } from '../stores/modal'

// Import components
import Nav from '../components/Nav.vue';
import NewTask from '../components/NewTask.vue';
import TaskItem from '../components/TaskItem.vue';

// Initialize the taskStore using the useTaskStore function
const taskStore = useTaskStore();

const modalStore = useModalStore();

// Create a computed property to get the tasks from the task store
const tasks = computed(() => taskStore.tasksArr);

// Compute the number of total tasks, completed tasks, and tasks to do
const totalTasks = computed(() => tasks.value.length);
const tasksCompleted = computed(() => tasks.value.filter(task => task.is_complete).length);
const tasksToDo = computed(() => tasks.value.filter(task => !task.is_complete).length);

// When the component is mounted, fetch the tasks from the task store
onMounted(async () => {
  await taskStore.fetchTasks(); 100
});
</script>

<style scoped>
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

.task120-heading-wrapper {
  display: inline-block;
  padding: 15px 50px;
  background-color: #f2f2f2;
  border-radius: 30px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  margin: 0 auto;
}

.task120-heading {
  font-family: 'Raleway', sans-serif;
  font-size: 28px;
  font-weight: 700;
  color: #333;
}

.task120-heading .fas {
  margin-right: 8px;
}

.task-heading {
  color: #2c3e50;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
}

.task-summary {
  font-family: 'Raleway', sans-serif;
  font-size: 20px;
  color: #333;
  margin-bottom: 20px;
}
</style>

