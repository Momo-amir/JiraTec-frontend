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
					<input type="text" id="description" v-model="newProject.description" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
				</div>

				<div class="mb-4">
					<label for="createdByName" class="block text-sm font-medium text-gray-700">Created By</label>
					<input type="text" id="createdByName" v-model="newProject.createdByName" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required disabled />
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
import { FetchUser } from "~/services/authService";
import type { IProject } from "~/Interfaces/IProject"; // Import the IProject interface

defineProps<{ isVisible: boolean }>();

const emit = defineEmits(["close"]); // Emit close event to parent

// Reactive object to hold the form data
const newProject = ref<IProject>({
	description: "",
	createdBy: {
		userID: 0,
		name: "",
		email: "",
		role: 0,
	},
	createdByName: "",
	createdDate: "",
	tasks: [],
	users: [],
	projectID: 0,
	title: "",
});

const closeModal = () => {
	emit("close");
};

// Function to handle the form submission
const handleSubmit = async () => {
	const projectPayload: IProject = {
		description: newProject.value.description,
		createdBy: {
			userID: newProject.value.createdBy.userID,
			name: newProject.value.createdBy.name,
			email: newProject.value.createdBy.email,
			role: newProject.value.createdBy.role,
		},
		createdByName: newProject.value.createdByName,
		createdDate: newProject.value.createdDate,
		tasks: newProject.value.tasks,
		users: [newProject.value.createdBy],
		projectID: 0,
		title: "",
	};

	// Log the request payload
	console.log("Submitting project:", projectPayload);

	// Call the create project service to create a new project
	const createdProject = await createProject(projectPayload);
};

onMounted(async () => {
	try {
		const user = await FetchUser();
		newProject.value.createdBy.userID = user.userID;
		newProject.value.createdByName = user.name;
		newProject.value.createdDate = new Date().toISOString(); // Set the current date in ISO 8601 format
		newProject.value.tasks = []; // Initialize tasks as an empty array
		newProject.value.users = [newProject.value.createdBy]; // Add the current user to the project
	} catch (error) {
		console.error("Failed to fetch user data:", error);
	}
});
</script>
