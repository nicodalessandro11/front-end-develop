import { ref } from "vue";
import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore } from "./user";

// Define the tasks store
export const useTaskStore = defineStore("tasks", () => {
  // A ref to store the tasks
  const tasksArr = ref([]);

  // Function to fetch the tasks
  const fetchTasks = async () => {
    const { data: tasks } = await supabase
      .from("tasks") // Access the tasks table
      .select("*") // Select all fields
      .order("id", { ascending: false }); // Order by id in descending order
    tasksArr.value = tasks; // Assign the fetched tasks to tasksArr
  };

  // Function to add a task
  const addTask = async (title, description) => {
    // Insert a new task into the tasks table
    const { data, error } = await supabase.from("tasks").insert([
      {
        user_id: useUserStore().user.id, // The id of the current user
        title: title,
        is_complete: false,
        description: description,
      },
    ]);
    await fetchTasks(); // Refresh the tasks after adding
  };

  // Function to delete a task
  const deleteTask = async (id) => {
    // Delete a task from the tasks table that matches the id
    const { data, error } = await supabase.from("tasks").delete().match({
      id: id,
    });
    await fetchTasks(); // Refresh the tasks after deleting
  };

  // Function to update a task
  const updateTask = async (id, title, description) => {
    // Update a task in the tasks table that matches the id
    const { data, error } = await supabase
      .from("tasks")
      .update([
        {
          title: title,
          description: description,
        },
      ])
      .eq("id", id);
    await fetchTasks(); // Refresh the tasks after updating
  };

  // Function to mark a task as complete
  const completeTask = async (id, booleanValue) => {
    // Update a task's is_complete field in the tasks table that matches the id
    const { data, error } = await supabase
      .from("tasks")
      .update({ is_complete: booleanValue })
      .eq("id", id);

    if (error) {
      console.error(error);
      return;
    }
    await fetchTasks(); // Refresh the tasks after updating
  };

  // Return the public API for the tasks store
  return {
    tasksArr,
    fetchTasks,
    addTask,
    deleteTask,
    updateTask,
    completeTask,
  };
});
