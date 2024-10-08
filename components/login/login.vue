<template>
	<div class="max-w-md w-full bg-base-100 p-8 border border-base-300 rounded-lg shadow-md md:mx-0">
		<h2 class="text-2xl font-bold mb-6 text-center text-primary">Login</h2>
		<form @submit.prevent="handleSubmit">
			<div class="mb-4">
				<label for="username" class="block text-sm font-medium text-base-content">Email</label>
				<input type="email" id="email" v-model="user.email" required class="mt-1 block w-full px-3 py-2 border border-base-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
			</div>
			<div class="mb-6">
				<label for="password" class="block text-sm font-medium text-base-content">Password</label>
				<input type="password" id="password" v-model="user.password" required class="mt-1 block w-full px-3 py-2 border border-base-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
			</div>
			<button type="submit" class="w-full bg-primary text-base-100 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium hover:bg-primary-focus focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary hover:rounded-none duration-200">Login</button>
		</form>
		<div class="mt-4 flex justify-between text-sm">
			<a href="/register" class="text-primary hover:underline">Register</a>
			<a href="/forgot-password" class="text-primary hover:underline">Forgot Password?</a>
		</div>
		<div v-if="errorMessage" class="mt-4 text-error text-sm">
			{{ errorMessage }}
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { loginUser } from "~/services/authService";

const user = ref({
	email: "",
	password: "",
});
const errorMessage = ref("");

const authStore = useAuthStore();

const handleSubmit = async () => {
	try {
		const response = await loginUser(user.value);
		console.log("User logged in:", response);

		// Use the Pinia store to handle token storage and login state
		authStore.login(response.token);

		// Redirect to frontpage
		navigateTo("/");
	} catch (error) {
		errorMessage.value = "Invalid email or password. Please try again.";
	}
};
</script>
