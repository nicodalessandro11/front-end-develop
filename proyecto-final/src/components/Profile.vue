<template>
  <div class=" wrapper container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <button class="btn btn-primary mb-3" @click="editToggleProfile">Edit Profile</button>
        <form v-if="inputUpdate" class="profile-form bg-light p-4 rounded shadow">
          <div class="form-group">
            <label for="full-name">Full name</label>
            <input id="full-name" v-model="profile.full_name" placeholder="Full name" type="text" class="form-control" />
          </div>

          <div class="form-group">
            <label for="biography">Biography</label>
            <textarea id="biography" rows="3" v-model="profile.bio" placeholder="Biography" type="text-area"
              class="form-control"></textarea>
          </div>

          <div class="form-group">
            <label for="website">Website</label>
            <input id="website" v-model="profile.website" placeholder="Website" type="text" class="form-control" />
          </div>

          <div class="form-group">
            <label for="location">Location</label>
            <input id="location" v-model="profile.location" placeholder="Location" type="text" class="form-control" />
          </div>

          <button type="button" @click="updateProfile" class="btn btn-primary mt-3">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import { useUserStore } from "../stores/user";
import { supabase } from "../supabase";

const userStore = useUserStore();

// Defines a custom emit event
const emit = defineEmits(["updateProfileEmit"])

// Defines the props for this component
const props = defineProps({
  profile: {
    type: Object,
  },
  inputUpdate: {
    type: Boolean,
  },
});

// Used to toggle the visibility of the form
const inputUpdate = ref(false);

// Toggles inputUpdate when called
const editToggleProfile = () => {
  inputUpdate.value = !inputUpdate.value;
};

// Gets the profile from the user store, or an empty object if it doesn't exist
const profile = computed(() => (userStore.profile ? userStore.profile : {}));

// Updates the profile in the database and emits the updated profile
const updateProfile = async () => {
  // Creates an object with the updated profile data
  const updatedProfileData = {
    full_name: profile.value.full_name,
    bio: profile.value.bio,
    location: profile.value.location,
    website: profile.value.website,
  };

  // Updates the profile in the database
  const { data, error } = await supabase
    .from("profiles")
    .update(updatedProfileData)
    .eq("user_id", supabase.auth.user().id);

  // Toggles the form visibility
  editToggleProfile()

  if (error) {
    console.error(error);
  } else {
    console.log("Profile Successfully updated");
    // Emits the updated profile
    emit('updateProfileEmit', updatedProfileData)
  }
};

// Fetches the user when the component is mounted
onMounted(async () => {
  await userStore.fetchUser();
});
</script>

<style scoped>
.wrapper {
  max-width: 800px;
  margin: auto;
}

.profile-form label {
  font-weight: bold;
  color: #333;
}

.profile-form button {
  width: 100%;
}

.profile-form input,
.profile-form textarea {
  border-radius: 0;
}
</style>
