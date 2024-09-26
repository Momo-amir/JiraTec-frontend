// stores/auth.ts
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
	state: () => ({
		isLoggedIn: typeof window !== "undefined" && !!localStorage.getItem("token"), // Check if token is present !! converts to boolean
	}),
	actions: {
		login(token: string) {
			if (typeof window !== "undefined") {
				localStorage.setItem("token", token);
				this.isLoggedIn = true;
			}
		},
		logout() {
			if (typeof window !== "undefined") {
				localStorage.removeItem("token");
				this.isLoggedIn = false;
			}
		},
	},
});
