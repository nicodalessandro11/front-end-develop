<template>
  <div class="wrapper container mt-5">
    <h3 class="header-title">Log In to ToDo App</h3>

    <!-- Form for sign in -->
    <form @submit.prevent="signIn" class="form-sign-in">
      <div class="form">
        <!-- Email input field -->
        <div class="form-input">
          <label class="input-field-label" for="email">E-mail</label>
          <input type="email" class="input-field" placeholder="example@gmail.com" id="email" v-model="email" required />
        </div>

        <!-- Password input field -->
        <div class="form-input">
          <label class="input-field-label" for="password">Password</label>
          <input type="password" class="input-field" placeholder="**********" id="password" v-model="password" required />
        </div>

        <!-- Submit button -->
        <button class="btn btn-primary" type="submit">Sign In</button>
      </div>
    </form>

    <!-- Sign up link -->
    <p class="mt-3">Don't have an account?
      <PersonalRouter :route="route" :buttonText="buttonText" class="sign-up-link" />
    </p>
  </div>
</template>

<script setup>
// Import necessary modules and components
import PersonalRouter from "./PersonalRouter.vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { ref } from "vue";

// Define the route and button text for sign up link
const route = "/auth/signup";
const buttonText = "Sign Up";

// Initialize reactive variables for form inputs
const email = ref("");
const password = ref("");

// Initialize Vue router for redirects
const redirect = useRouter();

// Define the sign in function
const signIn = async () => {
  try {
    // Attempt to sign in with entered credentials
    await useUserStore().signIn(email.value, password.value);

    // If successful, redirect to home page
    redirect.push({ path: "/" });

  } catch (error) {
    // If unsuccessful, alert with the error
    alert(error);
  }
};
</script>

<!-- Style section -->
<style scoped>
.wrapper {
  max-width: 800px;
  margin: auto;
}

.container {
  max-width: 600px;
  margin: auto;
  padding: 2em;
  background-color: #f9f9f9;
  border-radius: 4px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.header-title {
  color: #333;
  text-align: center;
  margin-bottom: 1em;
}

.form-input {
  margin-bottom: 1em;
}

.input-field {
  width: 100%;
  padding: 0.5em;
  font-size: 1em;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.button {
  width: 100%;
  padding: 0.5em;
  background-color: #00688d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: #00506b;
}

.sign-up-link {
  color: #00688d;
}

.sign-up-link:hover {
  text-decoration: underline;
}
</style>
