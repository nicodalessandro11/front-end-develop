import { ref } from "vue";
import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore } from "./user";

export const useTaskStore = defineStore("tasks", () => {
  // Esta tienda utiliza el Composition API
  const tasksArr = ref([]);
  
  // conesguir tareas de supabase
  const fetchTasks = async () => {
    const { data: tasks } = await supabase
      .from("tasks")
      .select("*")
      .order("id", { ascending: false });
    tasksArr.value = tasks;
    // console.log(tasksArr.value);
  };

  // añadir tareas de supabase
  const addTask = async (title, description) => {
    console.log(useUserStore().user.id);
    const { data, error } = await supabase.from("tasks").insert([
      {
        user_id: useUserStore().user.id,
        title: title,
        is_complete: false,
        description: description,
      },
    ]);
    await fetchTasks();
  };

  // borrar tareas de supabase
  const deleteTask = async (id) => {
    const { data, error } = await supabase.from("tasks").delete().match({
      id: id,
    });
    await fetchTasks();
  };

  // actualizar tareas de supabase
  const updateTask = async (id, title, description) => {
    const { data, error } = await supabase
      .from("tasks")
      .update([
        {
          title: title,
          description: description,
        },
      ])
      .eq("id", id);
      await fetchTasks();
  };

    // actualizar tareas de supabase
    const completeTask = async (id, booleanValue) => {
      const { data, error } = await supabase
        .from('tasks')
        .update({ is_complete: booleanValue })
        .eq('id', id);
    
      if (error) {
        console.error(error);
        return;
      }
        await fetchTasks();
    };

  return { tasksArr, fetchTasks, addTask, deleteTask, updateTask, completeTask };
});
