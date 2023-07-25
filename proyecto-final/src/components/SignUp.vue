<template>
  <div class="container mt-5">

    <div class="header text-center">
      <div class="header-description">
        <h3 class="header-title">Register to ToDo App</h3>
        <p class="header-subtitle">Start organizing your tasks!</p>
      </div>
    </div>

    <form @submit.prevent="signUp" class="form-sign-in mx-auto w-50">
      <div class="form mb-3">
        <div class="form-input mb-3">
          <label class="input-field-label">E-mail</label>
          <input type="email" class="form-control" placeholder="example@gmail.com" id="email" v-model="email" required />
        </div>
        <div class="form-input mb-3">
          <label class="input-field-label">Password</label>
          <input type="password" class="form-control" placeholder="**********" id="password" v-model="password"
            required />
        </div>
        <div class="form-input mb-3">
          <label class="input-field-label">Confirm password</label>
          <input type="password" class="form-control" placeholder="**********" id="confirmPassword"
            v-model="confirmPassword" required />
        </div>
        <button class="btn btn-primary btn-lg" type="submit">Sign Up</button>
        <p class="mt-3">
          Have an account?
          <PersonalRouter :route="route" :buttonText="buttonText" class="sign-up-link" />
        </p>
      </div>
    </form>

    <div v-show="errorMsg" class="alert alert-danger mt-4" role="alert">{{ errorMsg }}</div>
  </div>
</template>

<script setup>
// Importing necessary modules and components from vue, vue-router, and your application
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import PersonalRouter from "./PersonalRouter.vue";
import { supabase } from "../supabase";

// Initializing references for form input fields and error message
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const errorMsg = ref("");

// Initializing route information
const route = "/auth/login";
const buttonText = "Sign In";

// Getting router instance to perform navigation tasks
const redirect = useRouter();

// Function to handle user sign up
const signUp = async () => {
  // Check if password and confirmation password are the same
  if (password.value === confirmPassword.value) {
    try {
      // Calls the user store and sends the user's info to the backend to sign up
      await useUserStore().signUp(email.value, password.value);
      // On successful sign up, redirects user to the login view
      redirect.push({ path: "/auth/login" });
    } catch (error) {
      // If there's an error during sign up, displays the error message
      errorMsg.value = error.message;
      // After 5 seconds, hides the error message
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    }
  } else {
    // If the password and confirmation password do not match, sets the error message
    errorMsg.value = "Passwords do not match.";
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
  padding: 2em;
  background-color: #f9f9f9;
  border-radius: 4px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.header-title {
  font-size: 2.5em;
  color: #3c3c3c;
  margin-bottom: 0.5em;
}

.header-subtitle {
  font-size: 1.3em;
  color: #6c757d;
}

.input-field-label {
  font-weight: bold;
  color: #495057;
}

.alert-danger {
  text-align: center;
}

.btn-primary {
  width: 100%;
}
</style>


