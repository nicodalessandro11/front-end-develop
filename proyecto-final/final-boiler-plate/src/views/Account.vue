<template>
  <Nav />
  <h1>Name: {{ username }}</h1>
  <h1>Website: <a target="_blank" :href="website">{{ website }}</a></h1>
  <h1>Location: {{ location }}</h1>
  <h1>Biography: {{ bio }}</h1>
  <img :src="avatar_url" v-if="avatar_url" alt="Profile picture">
  <input @change="fileManager" type="file" />
  <button @click="uploadFile">Upload File</button>

  <Profile @updateProfileEmit="handleUpdateProfile" />
</template>

<script setup>
import { supabase } from "../supabase";
import { onMounted, ref, watch } from "vue";
import { useUserStore } from "../stores/user";
import Nav from "../components/Nav.vue";
import Profile from "../components/Profile.vue";

// variables avatar

const file = ref();
const fileUrl = ref();

const fileManager = (event) => {
  file.value = event.target.files[0];
};

const handleUpdateProfile = (updatedProfileData) => {
  username.value = updatedProfileData.full_name;
  website.value = updatedProfileData.website;
  location.value = updatedProfileData.location;
  bio.value = updatedProfileData.bio;
  avatar_url.value = updatedProfileData.avatar_url;
};

const uploadFile = async () => {
  if (!file.value) return;
  const filePath = `profiles/${file.value.name}`;
  const { error: uploadError } = await supabase.storage
    .from("profile-img")
    .upload(filePath, file.value);
  if (uploadError) {
    console.error("Error uploading file:", uploadError);
    return;
  }
  console.log("File successfully upload.");

  const { data: urlData, error: urlError } = await supabase.storage
    .from("profile-img")
    .getPublicUrl(filePath);
  console.log(urlData);
  if (urlError) {
    console.error("Error getting public URL:", urlError);
    return;
  }

  fileUrl.value = urlData.publicURL;
  console.log(fileUrl.value);

  const { error: updateError } = await supabase
    .from("profiles")
    .update({ avatar_url: fileUrl.value })
    .eq("user_id", supabase.auth.user().id);

  if (updateError) {
    console.error("Error updating profile:", updateError);
    return;

  } console.log("Profile successfully updated.");

  await userStore.fetchUser();
}

const userStore = useUserStore();

const loading = ref(false);
const username = ref(null);
const website = ref(null);
const avatar_url = ref(null);
const location = ref(null);
const bio = ref(null);

async function getProfile() {
  await userStore.fetchUser();
  username.value = userStore.profile.full_name;
  website.value = userStore.profile.website;
  location.value = userStore.profile.location;
  bio.value = userStore.profile.bio;
  avatar_url.value = userStore.profile.avatar_url;
}

watch(
  () => userStore.profile,
  (updatedProfileData) => {
    avatar_url.value = updatedProfileData.avatar_url;
  },
  { deep: true }
);

onMounted(() => {
  getProfile();
});

</script>

<style scoped>
h1 {
  font-size: 1.5em;
  color: #333;
  margin-bottom: 0.5em;
}

a {
  color: #1a0dab;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

input[type="file"] {
  margin: 1em 0;
  padding: 0.5em;
  font-size: 1em;
}

button {
  padding: 0.5em 1em;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 0.25em;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

img {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  margin: 1em 0;
}

.Nav {
  padding: 1em 0;
  background-color: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
}

.Profile {
  padding: 1em 0;
  background-color: #e9ecef;
  border-radius: 0.25em;
  margin-bottom: 1em;
}

body {
  font-family: Arial, sans-serif;
  padding: 1em;
  background-color: #f5f5f5;
}
</style>

