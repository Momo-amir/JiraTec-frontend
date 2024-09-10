<template>
	<div class="max-w-md mx-auto bg-white p-8 border border-gray-300 rounded-lg shadow-md">
		<h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
		<form @submit.prevent="handleSubmit">
			<div class="mb-4">
				<label for="username" class="block text-sm font-medium text-gray-700">Email</label>
				<input type="email" id="email" v-model="email" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
			</div>
			<div class="mb-6">
				<label for="password" class="block text-sm font-medium text-gray-700">Password</label>
				<input type="password" id="password" v-model="password" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
			</div>
			<button type="submit" class="w-full bg-primary text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">Login</button>
		</form>
		<div class="mt-4 flex justify-between text-sm">
			<a href="/register" class="text-primary hover:underline">Register</a>
			<a href="/forgot-password" class="text-primary hover:underline">Forgot Password?</a>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { loginUser } from "~/services/authService.ts";

const email = ref("");
const password = ref("");

const handleSubmit = async () => {
	try {
		const user = await loginUser(email.value, password.value);
		console.log("User logged in:", user);
		// Handle successful login (e.g., save token, redirect)
	} catch (error) {
		console.error("Failed to login:", error);
		// Show error message to user
	}
};
</script>
