import { defineStore } from "pinia";
import { supabase } from "../supabase";

// Define the user store using pinia
export const useUserStore = defineStore("user", {
  // Define the initial state of the store
  state: () => ({
    user: null,
    profile: null,
  }),

  // Define the actions for the store
  actions: {
    // Fetch the user's data and profile from supabase
    async fetchUser() {
      const user = await supabase.auth.user();
      if (user) {
        this.user = user;
        const { data: profile } = await supabase
          .from("profiles")
          .select()
          .match({ user_id: this.user.id });

        if (profile) this.profile = profile[0];
      }
    },

    // Sign up a new user and create a profile for them
    async signUp(email, password) {
      const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) {
        throw error;
      }

      if (user) {
        this.user = user;

        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .insert([
            {
              user_id: this.user.id,
              username: email,
            },
          ]);

        if (profileError) {
          console.error(profileError);
        } else {
          if (profile) {
            this.profile = profile[0];
          }
        }
      }
    },

    // Sign in an existing user and fetch their profile
    async signIn(email, password) {
      const { user, error } = await supabase.auth.signIn(
        {
          email: email,
          password: password,
        },
        {
          shouldCreateUser: false,
        }
      );

      if (error) throw error;
      if (user) {
        this.user = user;
        const { data: profile } = await supabase
          .from("profiles")
          .select()
          .match({ user_id: this.user.id });

        if (profile) this.profile = profile[0];
      }
    },

    // Sign out the current user
    async signOut() {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },
  },

  // Enable state persistence in localStorage
  persist: {
    enabled: true,
    strategies: [
      {
        key: "user",
        storage: localStorage,
      },
    ],
  },
});
