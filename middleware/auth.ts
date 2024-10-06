import { useAuthStore } from "~/stores/auth";
import { FetchUser } from "~/services/authService";
export default defineNuxtRouteMiddleware(async (to, from) => {
	if (import.meta.client) {
		try {
			const token = localStorage.getItem("token");

			// If no token is found and the user is not on the login or register page, redirect to login
			if (!token && to.path !== "/login" && to.path !== "/register") {
				return navigateTo("/login");
			} else if (token) {
				// If there's a token, check if the user is already loaded in the store
				const authStore = useAuthStore();
				if (!authStore.user) {
					try {
						// Fetch the user data based on the token
						const user = await FetchUser();
						authStore.setUser(user);
					} catch (error) {
						console.error("Error fetching user data:", error);
						localStorage.removeItem("token");
						return navigateTo("/login");
					}
				}
			}
		} catch (error) {
			console.error("Error accessing localStorage:", error);
			return navigateTo("/login");
		}
	}
});
