<template>
	<div v-if="project">
		<div class="flex flex-row justify-between mx-10 mt-5">
			<div class="">
				<h1 class="text-2xl font-bold mb-4 text-primary">{{ project.title }}</h1>
				<p class="mb-6 text-base-content">{{ project.description }}</p>
			</div>
			<div class="">
				<button @click="showTaskModal = true" class="mt-4 px-4 py-2 bg-primary text-base-100 rounded-md">Add Task</button>
			</div>
		</div>

		<!-- Kanban Board Component -->
		<div class="m-10">
			<KanbanBoard :tasks="project.tasks ?? []" @taskUpdated="handleTaskUpdated" @taskDeleted="handleTaskDeleted" @taskEdited="handleTaskEdited" />
		</div>

		<!-- Task Modal Component -->
		<TaskModal v-if="showTaskModal" @close="showTaskModal = false" @taskCreated="handleTaskCreated" :projectId="project.projectID" />
	</div>
	<div v-else>
		<div class="flex flex-col justify-center items-center h-[100vh] bg-base-100">
			<div class="flex items-center">
				<img src="~/assets/images/spinner.svg" alt="Loading" class="w-10 h-10 mr-2 animate-spin" />
				<p class="text-primary">Loading project...</p>
			</div>
			<div v-if="errorMessage" class="flex justify-center items-center mt-5">
				<p class="text-error">{{ errorMessage }}</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { getProjectById } from "~/services/projectService";
import type { IProject } from "~/Interfaces/IProject";

const route = useRoute();
const projectId = parseInt(route.params.id as string);

const project = ref<IProject | null>(null);
const showTaskModal = ref(false);
const errorMessage = ref<string | null>(null);

const loadProject = async () => {
	try {
		// Fetch the project by its ID and set it to the project ref
		const fetchedProject = await getProjectById(projectId);
		project.value = fetchedProject;
	} catch (error) {
		// Log the error and set the error message
		console.error(`Failed to load project with ID ${projectId}:`, error);
		errorMessage.value = `Failed to load project: ${(error as Error).message}`;
	}
};

// Load the project when the component is mounted
onMounted(() => {
	loadProject();
});

const handleTaskCreated = (task: any) => {
	// Add the new task to the project's tasks array
	if (project.value) {
		project.value.tasks = [...(project.value.tasks || []), task]; // Ensure tasks is an array using the nullish coalescing operator. This is called the spread operator in javascript
	}
};
//the spread operator essentialy makes a copy of the array and adds the new task to it

const handleTaskUpdated = (updatedTask: any) => {
	// Update the task in the project's tasks array
	if (project.value && project.value.tasks) {
		const index = project.value.tasks.findIndex((t) => t.taskID === updatedTask.taskID);
		if (index !== -1) {
			project.value.tasks.splice(index, 1, updatedTask);
		}
	}
};

const handleTaskDeleted = (taskId: number) => {
	// Check if the project and its tasks are defined
	if (project.value && project.value.tasks) {
		// Find the index of the task with the given taskId
		const index = project.value.tasks.findIndex((t) => t.taskID === taskId);
		// If the task is found, remove it from the tasks array
		if (index !== -1) {
			project.value.tasks.splice(index, 1);
		}
	}
};

const handleTaskEdited = () => {
	// set the taskModal ref to true
	showTaskModal.value = true;
};
</script>
