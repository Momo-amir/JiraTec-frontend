<template>
	<div v-if="isVisible" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
		<div class="bg-base-100 p-6 rounded-lg shadow-lg w-1/3">
			<header class="flex justify-between items-center mb-4">
				<h2 class="text-xl font-semibold text-base-content">Add New Project</h2>
				<button @click="closeModal" class="text-base-content hover:text-base-content/70">&times;</button>
			</header>

			<!-- Form for adding a new project -->
			<form @submit.prevent="handleSubmit">
				<div class="mb-4">
					<label for="title" class="block text-sm font-medium text-base-content">Project Title</label>
					<input type="text" id="title" v-model="newProject.title" class="mt-1 block w-full border border-base-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" required />
				</div>
				<div class="mb-4">
					<label for="description" class="block text-sm font-medium text-base-content">Description</label>
					<textarea id="description" v-model="newProject.description" class="mt-1 block w-full border border-base-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" required></textarea>
				</div>

				<div class="flex justify-end">
					<button type="button" @click="closeModal" class="mr-2 py-2 px-4 bg-base-300 hover:bg-base-400 rounded-md">Cancel</button>
					<button type="submit" class="py-2 px-4 bg-primary hover:bg-primary-focus text-base-content rounded-md">Add Project</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script setup lang="ts">
import { createProject } from "~/services/projectService";
import { ref } from "vue";

defineProps<{ isVisible: boolean }>();

const emit = defineEmits(["close", "project-created"]);

const newProject = ref<{
	title: string;
	description: string;
}>({
	title: "",
	description: "",
});

const closeModal = () => {
	emit("close");
};

const projectCreated = () => {
	emit("project-created");
};

const handleSubmit = async () => {
	try {
		const projectPayload = {
			title: newProject.value.title,
			description: newProject.value.description,
		};

		const createdProject = await createProject(projectPayload);
		projectCreated();
		console.log("Project created successfully", createdProject);
		reloadNuxtApp();

		// Clears the form inputs
		newProject.value.title = "";
		newProject.value.description = "";

		closeModal();
	} catch (error) {
		console.error("Failed to create project:", error);
	}
};
</script>
