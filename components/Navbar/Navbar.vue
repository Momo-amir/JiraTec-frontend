<template>
	<div v-if="authStore.isLoggedIn">
		<nav>
			<div class="flex justify-between items-center mx-auto w-full bg-base-100 py-5 shadow-md">
				<div>
					<nuxt-link to="/">
						<img alt="Logo" />
					</nuxt-link>
				</div>
				<div class="mr-4">
					<ul class="flex gap-4 items-center">
						<li class="hover:text-accent"></li>

						<li>
							<light-dark />
						</li>
						<li>
							<!-- Button to open the modal -->
							<button @click="showModal = true" class="py-2 px-4 bg-accent text-base-100 rounded-md">Add New Project</button>
						</li>
						<li>
							<button @click="logoutUser" class="py-2 px-4 bg-error text-base-100 rounded-md">Logout</button>
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
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth"; // Adjust the import path as needed

const authStore = useAuthStore();

const showModal = ref(false);

const logoutUser = () => {
	authStore.logout();
	navigateTo("/login"); // Redirect to the login page
};

// Check login status on component mount
onMounted(() => {
	if (typeof window !== "undefined") {
		authStore.isLoggedIn = !!localStorage.getItem("token");
	}
});
</script>
