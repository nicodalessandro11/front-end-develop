<template>
  <div class="container">
    <div class="row">
      <button @click="editToggleProfile">Edit Profile</button>
      <form v-if="inputUpdate" class="col-2" action="">
        <label for="">Full name</label>
        <input v-model="profile.full_name" placeholder="Full name" type="text" />

        <label for="">Biography</label>
        <textarea rows="10" cols="50" v-model="profile.bio" placeholder="Biography" type="text-area"></textarea>

        <label for="">Website</label>
        <input v-model="profile.website" placeholder="Website" type="text" />

        <label for="">Location</label>
        <input v-model="profile.location" placeholder="Location" type="text" />

        <button type="button" @click="updateProfile">
          Update Profile
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import { useUserStore } from "../stores/user";
import { supabase } from "../supabase";

const userStore = useUserStore();

const emit = defineEmits(["updateProfileEmit"])

const props = defineProps({
  profile: {
    type: Object,
  },
  inputUpdate: {
    type: Boolean,
  },
});

//para el padre

const inputUpdate = ref(false);

const editToggleProfile = () => {
  inputUpdate.value = !inputUpdate.value;
};

const profile = computed(() => (userStore.profile ? userStore.profile : {}));

const updateProfile = async () => {
  const updatedProfileData = {
    full_name: profile.value.full_name,
    bio: profile.value.bio,
    location: profile.value.location,
    website: profile.value.website,
  };
  console.log(updatedProfileData);
  const { data, error } = await supabase
    .from("profiles")
    .update(updatedProfileData)
    .eq("user_id", supabase.auth.user().id);
  editToggleProfile()
  if (error) {
    console.error(error);
  } else {
    console.log("Perfil actualizado correctamente");
    emit('updateProfileEmit', updatedProfileData)

  }

};

onMounted(async () => {
  await userStore.fetchUser();
});
</script>

<style scoped></style>
