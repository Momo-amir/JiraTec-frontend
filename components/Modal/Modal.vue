<template>
	<div v-if="isVisible" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
		<div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
			<header class="flex justify-between items-center mb-4">
				<h2 class="text-xl font-semibold">Add New Project</h2>
				<button @click="closeModal" class="text-gray-500 hover:text-gray-700">&times;</button>
			</header>

			<!-- Form for adding a new project -->
			<form @submit.prevent="handleSubmit">
				<div class="mb-4">
					<label for="title" class="block text-sm font-medium text-gray-700">Project Title</label>
					<input type="text" id="title" v-model="newProject.title" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
				</div>
				<div class="mb-4">
					<label for="description" class="block text-sm font-medium text-gray-700">Description</label>
					<textarea id="description" v-model="newProject.description" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required></textarea>
				</div>

				<div class="flex justify-end">
					<button type="button" @click="closeModal" class="mr-2 py-2 px-4 bg-gray-300 hover:bg-gray-400 rounded-md">Cancel</button>
					<button type="submit" class="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md">Add Project</button>
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

		// Clear the form inputs
		newProject.value.title = "";
		newProject.value.description = "";

		closeModal();
	} catch (error) {
		console.error("Failed to create project:", error);
	}
};
</script>
