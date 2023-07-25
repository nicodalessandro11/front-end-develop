<template>
  <!-- Create a router-link with the specified route -->
  <router-link :to="route">{{ buttonText }}</router-link>
</template>

<script setup>
// Define the props for the component (route and buttonText)
defineProps({
  route: String,         // The target route for the router-link
  buttonText: String,    // The text displayed on the button
});
</script>

