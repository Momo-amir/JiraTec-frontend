<template>
	<div v-if="project">
		<div class="flex flex-row justify-between mx-10 mt-5">
			<div class="">
				<h1 class="text-2xl font-bold mb-4">{{ project.title }}</h1>
				<p class="mb-6">{{ project.description }}</p>
			</div>
			<div class="">
				<button @click="showTaskModal = true" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">Add Task</button>
			</div>
		</div>

		<!-- Kanban Board Component -->
		<div class="m-10">
			<KanbanBoard :tasks="project.tasks ?? []" @taskUpdated="handleTaskUpdated" />
		</div>

		<!-- Button to add a new task -->

		<!-- Task Modal Component -->
		<TaskModal v-if="showTaskModal" @close="showTaskModal = false" @taskCreated="handleTaskCreated" :projectId="project.projectID" />
	</div>
	<div v-else>
		<div class="flex flex-col justify-center items-center h-[100vh]">
			<div class="flex items-center">
				<img src="~/assets/images/spinner.svg" alt="Loading" class="w-10 h-10 mr-2 animate-spin" />
				<p>Loading project...</p>
			</div>
			<div v-if="errorMessage" class="flex justify-center items-center mt-5">
				<p class="text-red-500">{{ errorMessage }}</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getProjectById } from "~/services/projectService";
import type { IProject } from "~/Interfaces/IProject";

const route = useRoute();
const projectId = parseInt(route.params.id as string);

const project = ref<IProject | null>(null);
const showTaskModal = ref(false);
const errorMessage = ref<string | null>(null);

const loadProject = async () => {
	try {
		const fetchedProject = await getProjectById(projectId);
		project.value = fetchedProject;
	} catch (error) {
		console.error(`Failed to load project with ID ${projectId}:`, error);
		errorMessage.value = `Failed to load project: ${(error as Error).message}`;
	}
};

onMounted(() => {
	loadProject();
});

const handleTaskCreated = (task: any) => {
	if (project.value) {
		project.value.tasks = [...(project.value.tasks || []), task];
	}
};

const handleTaskUpdated = (updatedTask: any) => {
	if (project.value && project.value.tasks) {
		const index = project.value.tasks.findIndex((t) => t.taskID === updatedTask.taskID);
		if (index !== -1) {
			project.value.tasks.splice(index, 1, updatedTask);
		}
	}
};
</script>
