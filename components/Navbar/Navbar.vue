<!-- YourMainComponent.vue -->
<template>
	<div>
		<nav>
			<div class="flex justify-between items-center mx-auto w-full bg-white py-5 shadow-md">
				<div>
					<nuxt-link to="/">
						<img alt="Logo" />
					</nuxt-link>
				</div>
				<div class="mr-4">
					<ul class="flex gap-4">
						<li class="hover:text-accent"></li>

						<li class="hover:text-accent">
							<nuxt-link to="/UiLib">UI library</nuxt-link>
						</li>
						<li>
							<button @click="logoutUser" class="py-2 px-4 bg-red-500 text-white rounded-md">Logout</button>
						</li>
						<li>
							<!-- Button to open the modal -->
							<button @click="showModal = true" class="py-2 px-4 bg-green-500 text-white rounded-md">Add New Project</button>
						</li>
					</ul>
				</div>
			</div>
		</nav>

		<!-- Modal component -->
		<Modal :isVisible="showModal" @close="showModal = false" />
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const logoutUser = () => {
	localStorage.removeItem("token"); // Clear the JWT token from local storage
	navigateTo("/login"); // Redirect to the login page
};

// Reactive variable to control the visibility of the modal
const showModal = ref(false);

// Function to handle project creation
</script>
