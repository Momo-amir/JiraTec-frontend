<template>
	<div class="mx-10 mt-10 mb-32">
		<hero :title="frontPageTitle" :description="frontPageDescription" imageUrl="/assets/images/heroimage.png" />
	</div>
	<div class="flex flex-col gap-8">
		<div class="flex items-center justify-center">
			<h1 class="text-h1">Take a look at your projects</h1>
		</div>
		<div class="mx-10 mt-5 mb-16">
			<project-summary />
		</div>
	</div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";

const authStore = useAuthStore();
const currentUser = computed(() => authStore.user?.name || "How did you get here?");

const frontPageTitle = computed(() => `Welcome to the Project Management App, ${currentUser.value}`);
const frontPageDescription = ref<string>("This is a simple project management app built with Nuxt3 and Tailwind CSS to help you manage your projects with ease. Get started by creating a new project or viewing your existing projects.");
</script>
