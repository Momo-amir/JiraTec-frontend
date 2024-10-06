import { defineStore } from "pinia";
import type { IUser } from "~/Interfaces/IUser";
import { FetchUser } from "~/services/authService";

export const useAuthStore = defineStore("auth", {
	state: () => ({
		isLoggedIn: false,
		user: null as IUser | null,
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
				this.user = null;
			}
		},
		setUser(user: IUser) {
			this.user = user;
			this.isLoggedIn = true;
		},
		async fetchUser() {
			try {
				const user = await FetchUser();
				this.setUser(user);
			} catch (error) {
				console.error("Error fetching user:", error);
			}
		},
	},
});
