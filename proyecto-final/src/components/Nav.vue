<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <router-link class="navbar-brand" to="/">Todo App</router-link>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Task Manager</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/account">Your Account</router-link>
          </li>
        </ul>
      </div>

      <div class="d-flex align-items-center">
        <p class="navbar-text me-2 mb-0">Welcome, {{ userEmail }}</p>
        <button @click="signOut" class="btn btn-outline-primary btn-sm">Log out</button>
      </div>
    </div>
  </nav>
</template>

<script setup>
// Importing required modules and functions from respective packages.
import { useUserStore } from "../stores/user"; // Imports the user store.
import { useRouter } from "vue-router"; // Vue Router hook for programmatic navigation.

// Define the route variable as the home route ("/").
const route = "/";

// Define the buttonText variable for use in the navbar button.
const buttonText = "Home";

// Get the user object from the user store. 
// This could be a user profile containing information like email, name etc.
const getUser = useUserStore().user;

// Extract the user's email from the user object.
const userEmail = getUser.email;

// Use the Vue Router hook to enable programmatic navigation.
const redirect = useRouter();

// Define an async signOut function that is used to sign out the current user.
const signOut = async () => {
  try {
    // Attempt to sign out the current user using the method provided by the user store.
    await useUserStore().signOut();

    // On successful sign out, redirect the user to the login page.
    redirect.push({ path: "/auth/login" });
  } catch (error) {
    // If any error occurs during the sign-out process, it's caught here. 
    // You could add error handling logic here, like logging the error or showing a user-friendly message.
  }
};

</script>


<style scoped>
.navbar {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar .navbar-brand {
  font-weight: 600;
}

.navbar .navbar-nav .nav-link {
  font-weight: 500;
}

.navbar .navbar-text {
  font-size: 0.9rem;
}

.navbar .btn {
  font-size: 0.8rem;
  padding: 0.25rem 0.5rem;
}
</style>

