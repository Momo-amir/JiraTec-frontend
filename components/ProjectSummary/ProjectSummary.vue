<template>
	<div class="p-4 bg-base-100 shadow rounded-md">
		<h2 class="text-xl font-semibold mb-4 text-base-content">Project Summary</h2>
		<div class="overflow-x-auto">
			<table class="min-w-full divide-y divide-base-300">
				<thead>
					<tr>
						<th class="px-4 py-2 text-left text-sm font-medium text-base-content/70 uppercase">Project Name</th>
						<th class="px-4 py-2 text-left text-sm font-medium text-base-content/70 uppercase">Project Manager</th>
						<th class="px-4 py-2 text-left text-sm font-medium text-base-content/70 uppercase">Due Date</th>
						<th class="px-4 py-2 text-left text-sm font-medium text-base-content/70 uppercase">Status</th>
						<th class="px-4 py-2 text-left text-sm font-medium text-base-content/70 uppercase">Actions</th>
					</tr>
				</thead>
				<tbody class="bg-base-100 divide-y divide-base-300">
					<tr v-for="project in projects" :key="project.projectID" class="cursor-pointer hover:bg-base-200">
						<td class="px-4 py-2 whitespace-nowrap" @click="goToProject(project.projectID)">{{ project.title }}</td>
						<td class="px-4 py-2 whitespace-nowrap">{{ project.createdByName }}</td>
						<td class="px-4 py-2 whitespace-nowrap">{{ formatDate(project.dueDate) }}</td>
						<td class="px-4 py-2 whitespace-nowrap">
							<span :class="statusClass(project.status)">{{ project.status || "N/A" }}</span>
						</td>
						<td class="px-4 py-2 whitespace-nowrap flex justify-end">
							<div v-if="isProjectOwner(project)" class="relative">
								<button @click="toggleOptions(project.projectID)" class="text-primary hover:text-primary-focus bg-inherit hover:bg-base-200 p-1 rounded-full ease-in duration-200">&#x22EE;</button>
								<div v-if="showOptions === project.projectID" class="absolute top-4 right-2 mt-2 w-fit bg-base-100 border border-base-300 rounded-md shadow-lg">
									<ul>
										<li>
											<button @click="editProject(project)" class="text-xs w-full text-left px-4 py-2 text-primary hover:text-primary-focus hover:bg-base-200 ease-in duration-200">Edit</button>
										</li>
										<li>
											<button @click="deleteProjectHandler(project.projectID)" class="text-error hover:text-error-focus text-xs w-full text-left px-4 py-2 hover:bg-base-200 ease-in duration-200">Delete</button>
										</li>
									</ul>
								</div>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getCurrentUserProjects, deleteProject } from "~/services/projectService";
import { useAuthStore } from "~/stores/auth";
import type { IProject } from "~/Interfaces/IProject";

// State to store the projects data
const projects = ref<IProject[]>([]);
const showOptions = ref<number | null>(null);
const router = useRouter();
const authStore = useAuthStore();

// Fetch projects when the component is mounted
onMounted(() => {
	loadProjects();
});

// Function to navigate to the project page
const goToProject = (projectId: number) => {
	router.push(`/project/${projectId}`);
};

// Function to load projects for the logged-in user
const loadProjects = async () => {
	try {
		const fetchedProjects = await getCurrentUserProjects();
		projects.value = fetchedProjects;
	} catch (error) {
		console.error("Failed to load projects:", error);
	}
};

// Method to check if the logged-in user is the project owner
const isProjectOwner = (project: IProject) => {
	return project.createdByName === authStore.user?.name;
};

// Method to format the due date
function formatDate(date: string | undefined): string {
	return date ? new Date(date).toLocaleDateString() : "N/A";
}

// Method to dynamically assign classes based on project status
function statusClass(status: string | undefined): string {
	switch (status) {
		case "Completed":
			return "text-green-500 font-bold";
		case "In Progress":
			return "text-yellow-500 font-bold";
		case "Overdue":
			return "text-red-500 font-bold";
		default:
			return "text-gray-500 font-bold";
	}
}

// Toggle options menu for project
const toggleOptions = (projectId: number) => {
	showOptions.value = showOptions.value === projectId ? null : projectId;
};

// Method to handle project editing
const editProject = (project: IProject) => {
	// Trigger your project editing logic here (e.g., open a modal)
	console.log("Edit project", project);
	const showModal = ref(false);
};

// Method to handle project deletion
const deleteProjectHandler = async (projectId: number) => {
	try {
		await deleteProject(projectId);
		loadProjects(); // Reload projects after deletion
	} catch (error) {
		console.error(`Failed to delete project with ID ${projectId}:`, error);
	}
};
</script>
