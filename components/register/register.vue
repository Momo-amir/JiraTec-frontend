<template>
	<div class="max-w-md mx-auto w-full bg-base-100 p-8 border border-base-300 rounded-lg shadow-md">
		<h2 class="text-2xl font-bold mb-6 text-center text-base-content">Register</h2>
		<form @submit.prevent="handleSubmit">
			<div class="mb-4">
				<label for="name" class="block text-sm font-medium text-base-content">Name</label>
				<input type="text" id="name" v-model="user.name" required class="mt-1 block w-full px-3 py-2 border border-base-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
			</div>
			<div class="mb-4">
				<label for="email" class="block text-sm font-medium text-base-content">Email</label>
				<input type="email" id="email" v-model="user.email" required class="mt-1 block w-full px-3 py-2 border border-base-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
			</div>
			<div class="mb-6">
				<label for="password" class="block text-sm font-medium text-base-content">Password</label>
				<input type="password" id="password" v-model="user.passwordHash" required class="mt-1 block w-full px-3 py-2 border border-base-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
			</div>
			<button type="submit" class="w-full bg-primary text-base-100 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium hover:bg-primary-focus focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">Register</button>
		</form>

		<!-- Error message display -->
		<div v-if="errorMessage" class="mt-4 text-error text-sm">
			{{ errorMessage }}
		</div>

		<div v-if="successMessage" class="mt-4 text-green text-sm">
			{{ successMessage }}
		</div>

		<div class="mt-4 flex justify-between text-sm">
			<a href="/login" class="text-primary hover:underline">Login</a>
			<a href="/forgot-password" class="text-primary hover:underline">Forgot Password?</a>
		</div>
	</div>
</template>

<script setup lang="ts">
import { registerUser } from "~/services/authService";

// Define the user object with initial values
const user = ref({
	name: "",
	email: "",
	passwordHash: "",
	role: 1,
});

// Reactive reference for error message
const errorMessage = ref("");
const successMessage = ref("");

// Form submission handler
const handleSubmit = async () => {
	errorMessage.value = ""; // Reset error message before submission

	try {
		const registeredUser = await registerUser(user.value);
		console.log("User registered:", registeredUser);
		return (successMessage.value = "User registered successfully! go to login page"), navigateTo("/login"), 2000;
		// Redirect or show a success message
	} catch (error) {
		// Check if the error response is a user already exists scenario
		if ((error as any).data === "User already exists") {
			errorMessage.value = "User already exists. Please use a different email.";
		} else {
			errorMessage.value = "An error occurred. Please try again.";
		}
	}
};
</script>
