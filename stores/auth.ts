import { defineStore } from "pinia";
import type { IUser } from "~/Interfaces/IUser";
import { FetchUser } from "~/services/authService";

export const useAuthStore = defineStore("auth", {
	state: () => ({
		isLoggedIn: false,
		user: null as IUser | null,
	}),
	actions: {
		// This method handles the login and setting the token
		login(token: string) {
			if (typeof window !== "undefined") {
				localStorage.setItem("token", token);
				this.isLoggedIn = true;
				this.fetchUser(); // Fetch and set the user after login
			}
		},
		// Logout clears the user and token
		logout() {
			if (typeof window !== "undefined") {
				localStorage.removeItem("token");
				this.isLoggedIn = false;
				this.user = null;
			}
		},
		// Set user data after it's fetched
		setUser(user: IUser) {
			this.user = user;
			this.isLoggedIn = true;
		},
		// Fetch user data asynchronously and set it in the store
		async fetchUser() {
			try {
				const user = await FetchUser(); // Fetch user from the API
				this.setUser(user); // Set the user using the setUser action
			} catch (error) {
				console.error("Error fetching user:", error);
			}
		},
	},
});
