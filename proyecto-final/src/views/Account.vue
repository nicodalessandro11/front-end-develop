<template>
  <Nav />
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="profile-card bg-light p-4 rounded shadow text-center">
          <h3 class="mb-3">{{ username }}</h3>
          <img :src="avatar_url || '/path/to/default/avatar.png'" v-if="avatar_url" class="profile-picture mb-3"
            alt="Profile picture">
          <div class="mb-3">
            <div class="row">
              <div class="col-6 offset-md-3">
                <input :key="inputKey" @change="fileManager" type="file" class="form-control" />
                <button @click="uploadFile" class="btn btn-secondary btn-second mt-2">Upload File</button>
              </div>
            </div>
          </div>
          <hr>
          <h4 class="mb-2"><a target="_blank" :href="website">{{ website }}</a></h4>
          <h4 class="mb-2">{{ location }}</h4>
          <p class="text-muted">{{ bio }}</p>
          <hr>
          <Profile @updateProfileEmit="handleUpdateProfile" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Import the necessary libraries and components
import { supabase } from "../supabase";
import { onMounted, ref, watch } from "vue";
import { useUserStore } from "../stores/user";
import Nav from "../components/Nav.vue";
import Profile from "../components/Profile.vue";
import { useModalStore } from '../stores/modal'

// Use Modal store
const modalStore = useModalStore()

// Define ref variables which will be used to hold the user's profile details and state
const file = ref();
const fileUrl = ref();
const inputKey = ref(Date.now()); // new ref for input key
const loading = ref(false);
const username = ref(null);
const website = ref(null);
const avatar_url = ref(null);
const location = ref(null);
const bio = ref(null);

// Use the user store
const userStore = useUserStore();

// Define a function to handle the upload of a file
const fileManager = (event) => {
  file.value = event.target.files[0];
};

// Define a function to handle the update of the profile
const handleUpdateProfile = async (updatedProfileData) => {
  // Update the profile in the database
  const { data, error } = await supabase
    .from("profiles")
    .update(updatedProfileData)
    .eq("user_id", supabase.auth.user().id);

  if (error) {
    modalStore.openToast(error.message, 'error');
  } else {
    modalStore.openToast("Profile Successfully updated", 'success');
    // Update the local value with the timestamp to avoid caching
    avatar_url.value = updatedProfileData.avatar_url;
    // Update local state with the updated profile data
    username.value = updatedProfileData.full_name;
    website.value = updatedProfileData.website;
    location.value = updatedProfileData.location;
    bio.value = updatedProfileData.bio;
  }
};


const uploadFile = async () => {
  if (!file.value) {
    modalStore.openToast("No file selected!", 'error');
    return;
  }

  if (file.value.type !== "image/jpeg" && file.value.type !== "image/png") {
    modalStore.openToast("Invalid file type. Only .jpeg and .png files are accepted.", 'error');
    return;
  }

  const { data } = await supabase
    .from("profiles")
    .select("avatar_url")
    .eq("user_id", supabase.auth.user().id);

  const deleteUrl = data[0].avatar_url;
  const { error: urlDeleteError } = await supabase.storage
    .from("profile-img")
    .remove([deleteUrl]);

  if (urlDeleteError) {
    modalStore.openToast(urlDeleteError.message, 'error');
    return;
  }

  const timestamp = Date.now();
  const filePath = `profiles/${timestamp}-${file.value.name}`;
  const { error: uploadError } = await supabase.storage
    .from("profile-img")
    .upload(filePath, file.value);

  if (uploadError) {
    modalStore.openToast(uploadError.message, 'error');
    return;
  }

  const { data: urlData, error: urlError } = await supabase.storage
    .from("profile-img")
    .getPublicUrl(filePath);

  if (urlError) {
    modalStore.openToast(urlError.message, 'error');
    return;
  }

  fileUrl.value = urlData.publicURL;

  const { error: updateError } = await supabase
    .from("profiles")
    .update({ avatar_url: fileUrl.value + '?' + timestamp }) // Add the timestamp here
    .eq("user_id", supabase.auth.user().id);

  if (updateError) {
    modalStore.openToast(updateError.message, 'error');
    return;
  }

  await userStore.fetchUser();

  file.value = null; // Clear the file input
  inputKey.value = Date.now(); // Change the key to force rerendering of the input field
  modalStore.openToast("Profile Successfully updated", 'success'); // Single success message
};

// Define a function to get the user's profile details
async function getProfile() {
  await userStore.fetchUser();
  username.value = userStore.profile.full_name;
  website.value = userStore.profile.website;
  location.value = userStore.profile.location;
  bio.value = userStore.profile.bio;
  avatar_url.value = userStore.profile.avatar_url;
}

// Set up a watcher to update the avatar_url when the user's profile data changes
watch(
  () => userStore.profile,
  (updatedProfileData) => {
    avatar_url.value = updatedProfileData.avatar_url;
  },
  { deep: true }
);

// On component mount, get the user's profile details
onMounted(() => {
  getProfile();
});
</script>


<style scoped>
.container {
  max-width: 1200px;
  margin: auto;
  padding: 30px 20px;
  background-color: #f7f7f7;
}

.profile-card {
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}

.profile-card h3 {
  font-size: 2em;
  color: #333;
}

.profile-card h4 {
  font-size: 1.25em;
  color: black;
}

.profile-card p {
  font-size: 1em;
  color: black;
}

.profile-card a {
  color: #007bff;
  text-decoration: none;
}

.profile-card a:hover {
  text-decoration: underline;
}

.profile-card .btn {
  width: 50%;
  background-color: #d5dee6;
  color: black;
  border-color: #d5dee6;
  border-radius: 5px;
  padding: 5px;
  transition: background-color 0.3s ease;
}

.profile-card .btn:hover {
  background-color: grey;
  color: white;
}

.profile-card .form-control {
  background-color: #f7f7f7;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
}

.profile-picture {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid #ccc;
}
</style>