<template>
  <div class="card">
    <div class="card-body">
      <div :class="{ 'task-complete': task.is_complete }" class="task-content">
        <h3 class="card-title">{{ task.title }}</h3>
        <p class="card-text">{{ task.description }}</p>
        <span v-if="task.is_complete" class="badge bg-success">Completed</span>
      </div>

      <div class="button-group mt-2">
        <button class="btn btn-delete me-2" @click="openDeleteConfirmation"><i class="fas fa-trash-alt"></i></button>
        <button class="btn btn-complete me-2" @click="handleComplete"><i class="fas fa-check-circle"></i></button>
        <button class="btn btn-edit me-2" @click="updateToggle"><i class="fas fa-edit"></i></button>
      </div>

      <div v-if="inputUpdate">
        <div class="input-group mt-2 mb-3">
          <input type="text" class="form-control" v-model="name" placeholder="Update task name">
        </div>
        <div class="input-group mb-3">
          <input type="text" class="form-control" v-model="description" placeholder="Update task description">
        </div>
        <button class="btn btn-update" @click="updateTask">Update</button>
      </div>
    </div>
  </div>
</template>

<script setup>
// Import necessary modules from Vue
import { ref, watch } from "vue";

// Import the useTaskStore function from "../stores/task" to access the task store
import { useTaskStore } from "../stores/task.js";
import { useModalStore } from "../stores/modal";


// Initialize the taskStore using the useTaskStore function
const taskStore = useTaskStore();

// Initialize the modalSTORE
const modalStore = useModalStore()

// Create reactive variables using ref()
const name = ref(props.task.title);
const description = ref(props.task.description);

// Define props for the component (task prop)
const props = defineProps({
  task: Object, // This prop will be used to pass the task object to the component
});

// Function to delete a task
const deleteTask = async () => {
  await taskStore.deleteTask(props.task.id);
};

// Function to handle opening of delete confirmation modal
const openDeleteConfirmation = () => {
  modalStore.openModal("Are you sure you want to delete the task?")
}

// Watch for confirmation changes from modalStore
watch(() => modalStore.confirmation, (newVal) => {
  if (newVal === true) {
    deleteTask()
    modalStore.resetConfirmation()
    modalStore.closeModal()
  }
}, { immediate: true })

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

// Functions to handle and toggle the completion state of a task
const toggleComplete = () => {
  props.task.is_complete = !props.task.is_complete;
  taskStore.completeTask(props.task.id, props.task.is_complete);
};

const handleComplete = () => {
  if (!props.task.is_complete) {
    modalStore.openToast("Congratulations, your task is completed!", 'success')
  }
  toggleComplete()
}

</script>

<style scoped>
.card {
  margin: 1rem 0;
  background-color: #F7F6F8;
  border-color: rgb(60, 60, 60)
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
  background-color: rgb(204, 12, 57);
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  box-shadow: rgba(2, 8, 14, 0.1) 0px 8px 16px 0px;
  color: white;
}

.btn-complete {
  background-color: rgb(152, 201, 30);
  color: black
}

.btn-edit {
  background-color: rgb(220, 183, 0);
  color: black
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

.task-content {
  height: 120px;
  overflow: auto;
}

.task-complete .card-title,
.task-complete .card-text {
  color: #888;
}
</style>
