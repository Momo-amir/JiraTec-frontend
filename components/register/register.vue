<template>
	<div class="max-w-md mx-auto bg-white p-8 border border-gray-300 rounded-lg shadow-md">
		<h2 class="text-2xl font-bold mb-6 text-center">Register</h2>
		<form @submit.prevent="handleSubmit">
			<div class="mb-4">
				<label for="name" class="block text-sm font-medium text-gray-700">Name</label>
				<input type="text" id="name" v-model="user.name" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
			</div>
			<div class="mb-4">
				<label for="email" class="block text-sm font-medium text-gray-700">Email</label>
				<input type="email" id="email" v-model="user.email" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
			</div>
			<div class="mb-6">
				<label for="password" class="block text-sm font-medium text-gray-700">Password</label>
				<input type="password" id="password" v-model="user.passwordHash" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
			</div>
			<button type="submit" class="w-full bg-primary text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">Register</button>
		</form>

		<!-- Error message display -->
		<div v-if="errorMessage" class="mt-4 text-red-600 text-sm">
			{{ errorMessage }}
		</div>

		<div class="mt-4 flex justify-between text-sm">
			<a href="/login" class="text-primary hover:underline">Login</a>
			<a href="/forgot-password" class="text-primary hover:underline">Forgot Password?</a>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { registerUser } from "~/services/authService";

// Define the user object with initial values
const user = ref({
	name: "",
	email: "",
	passwordHash: "", // Use 'passwordHash' to match your API
	roleID: 0, // Default value, adjust if needed
	role: {
		roleID: 0,
		roleName: "string",
	},
});

// Reactive reference for error message
const errorMessage = ref("");

// Form submission handler
const handleSubmit = async () => {
	errorMessage.value = ""; // Reset error message before submission

	try {
		const registeredUser = await registerUser(user.value);
		console.log("User registered:", registeredUser);
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
