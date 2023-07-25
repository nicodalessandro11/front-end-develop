// Import required functions from Vue Router
import { createRouter, createWebHistory } from "vue-router";

// Import view components
import Home from "../views/Home.vue";
import Auth from "../views/Auth.vue";
import Account from "../views/Account.vue";

// Import child components
import SignIn from "../components/SignIn.vue";
import SignUp from "../components/SignUp.vue";

// Define the routes for the application.
// Each route should map a path to a component.
const routes = [
  // Route for the home page
  { path: "/", component: Home },

  // Route for the authentication page, which has its own child routes
  {
    path: "/auth",
    component: Auth,

    // Child routes for the authentication page
    children: [
      // Route for the login page
      { path: "login", component: SignIn },

      // Route for the signup page
      { path: "signup", component: SignUp },
    ],
  },

  // Route for the account page
  { path: "/account", component: Account },
];

// Create and configure the router
const router = createRouter({
  // Use the HTML5 history API
  history: createWebHistory(),

  // Apply the routes to the router
  routes,
});

// Export the router so it can be used in the main application
export default router;
