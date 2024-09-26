// middleware/auth.ts
export default defineNuxtRouteMiddleware((to, from) => {
	if (import.meta.client) {
		try {
			const token = localStorage.getItem("token");

			// If no token is found and the user is not on the login or register page, redirect to login
			if (!token && to.path !== "/login" && to.path !== "/register") {
				return navigateTo("/login");
			}
		} catch (error) {
			console.error("Error accessing localStorage:", error);
			return navigateTo("/login");
		}
	}
});

/*
LocalStorage is a browser-only API and does not exist on the server side.
In a Nuxt 3 application, your code is executed both on the server (during server-side rendering) and on the client (in the browser).
When your middleware tries to access localStorage on the server side, it throws an error.
To fix this we check if the code is running on the client side before accessing localStorage.
that is what the if import.meta.client statement does.

*/
