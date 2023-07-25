<template>
  <div class="card">
    <div class="card-body">
      <h3 class="card-title" :class="{ 'text-decoration-line-through': task.is_complete }">{{ task.title }}</h3>
      <p class="card-text" :class="{ 'text-decoration-line-through': task.is_complete }">{{ task.description }}</p>

      <div class="button-group mt-2">
        <button class="btn btn-delete me-2" @click="deleteTask"><i class="fas fa-trash-alt"></i></button>
        <button class="btn btn-complete me-2" @click="toggleComplete"><i class="fas fa-check-circle"></i></button>
        <button class="btn btn-edit me-2" @click="updateToggle"><i class="fas fa-edit"></i></button>
      </div>

      <div v-if="inputUpdate">
        <div class="input-group mb-3">
          <input type="text" class="form-control" v-model="name" placeholder="Update task name">
        </div>
        <div class="input-group mb-3">
          <input type="text" class="form-control" v-model="description" placeholder="Update task description">
        </div>
        <button class="btn btn-update" @click="updateTask"><i class="fas fa-arrow-circle-up"></i> Update</button>
      </div>
    </div>
  </div>
</template>

<script setup>
// Import necessary modules from Vue
import { ref, defineProps } from "vue";

// Import the useTaskStore function from "../stores/task" to access the task store
import { useTaskStore } from "../stores/task";


// Initialize the taskStore using the useTaskStore function
const taskStore = useTaskStore();

// Create reactive variables using ref()
const name = ref("");
const description = ref("");

// Define props for the component (task prop)
const props = defineProps({
  task: Object, // This prop will be used to pass the task object to the component
});

// Function to delete a task
const deleteTask = async () => {
  await taskStore.deleteTask(props.task.id);
};

// Create a reactive variable to handle input update
const inputUpdate = ref(false);

// Function to toggle the input update state
const updateToggle = () => {
  inputUpdate.value = !inputUpdate.value;
};

// Function to update a task
const updateTask = () => {
  taskStore.updateTask(props.task.id, name.value, description.value);
  name.value = "";
  description.value = "";
  updateToggle();
};

// Function to toggle the completion state of a task
const toggleComplete = () => {
  props.task.is_complete = !props.task.is_complete;
  taskStore.completeTask(props.task.id, props.task.is_complete);
};
</script>

<style scoped>
.card {
  margin: 1rem 0;
  background-color: rgb(247, 246, 248);
}

.button-group {
  display: flex;
  justify-content: start;
}

.btn-delete,
.btn-complete,
.btn-edit,
.btn-update {
  font-size: 0.8rem;
  color: #ffffff;
  width: 80px;
}

.btn-delete {
  background-color: rgb(249, 213, 226);
  border-width: 1px;
  border-color: rgb(204, 12, 57);
  border-style: solid;
  border-radius: 4px;
  box-shadow: rgba(2, 8, 14, 0.1) 0px 8px 16px 0px;
  color: rgb(60, 60, 60);

}

.btn-complete {
  background-color: rgb(220, 243, 160);
  border-color: rgb(152, 201, 30);
  color: rgb(60, 60, 60);

}

.btn-edit {
  background-color: #00688d;
  color: #fff;
}

.btn-update {
  background-color: rgb(254, 242, 184);
  border-color: rgb(220, 183, 0);
  color: rgb(60, 60, 60)
}

.btn-delete:hover,
.btn-complete:hover,
.btn-edit:hover,
.btn-update:hover {
  opacity: 0.8;
}
</style>



