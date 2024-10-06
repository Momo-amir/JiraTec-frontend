<template>
	<div v-if="project">
		<div class="flex flex-row justify-between mx-10 mt-5">
			<div>
				<h1 class="text-2xl font-bold mb-4 text-primary">{{ project.title }}</h1>
				<p class="mb-6 text-base-content">{{ project.description }}</p>
			</div>

			<div>
				<h2 class="text-lg font-semibold text-primary">Project Team</h2>
				<div class="flex mt-2 space-x-1">
					<UserAvatar v-for="user in project.users" :key="user.userID" :user="user" />
				</div>
			</div>
		</div>

		<div class="flex justify-end mx-10 items-end">
			<div class="">
				<button @click="showTaskModal = true" class="mt-4 mx-4 px-4 py-2 bg-primary text-base-100 rounded-md">Add Task</button>

				<button @click="showUserModal = true" class="mt-4 px-4 py-2 bg-primary text-base-100 rounded-md">Manage Team</button>
			</div>
		</div>

		<div class="m-10">
			<KanbanBoard :tasks="project.tasks || []" @taskUpdated="handleTaskUpdated" @taskDeleted="handleTaskDeleted" @editTask="handleTaskEdited" @addColumn="handleAddColumn" @editColumn="handleEditColumn" />
		</div>

		<TaskModal v-if="showTaskModal" @close="closeTaskModal" @taskCreated="handleTaskCreated" @taskUpdated="handleTaskUpdated" :projectId="project.projectID" :taskToEdit="taskToEdit" />

		<UserModal v-if="showUserModal" @close="showUserModal = false" @usersUpdated="loadProject" :projectId="project.projectID" :projectUsers="project.users || []" />
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
import { ref, onMounted } from "vue";
import { getProjectById } from "~/services/projectService";
import type { IProject } from "~/Interfaces/IProject";

const route = useRoute();
const projectId = parseInt(route.params.id as string);

const project = ref<IProject | null>(null);
const showTaskModal = ref(false);
const showUserModal = ref(false);
const taskToEdit = ref(undefined);
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

const handleTaskDeleted = (taskId: number) => {
	if (project.value && project.value.tasks) {
		const index = project.value.tasks.findIndex((t) => t.taskID === taskId);
		if (index !== -1) {
			project.value.tasks.splice(index, 1);
		}
	}
};

const handleTaskEdited = (task: any) => {
	taskToEdit.value = task;
	showTaskModal.value = true;
};

const closeTaskModal = () => {
	showTaskModal.value = false;
	taskToEdit.value = undefined; // Reset taskToEdit when closing the modal - should prolly be null but I have been a bit lazy :)
};
</script>
