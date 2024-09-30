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
					</tr>
				</thead>
				<tbody class="bg-base-100 divide-y divide-base-300">
					<tr v-for="project in projects" :key="project.projectID" @click="goToProject(project.projectID)" class="cursor-pointer hover:bg-base-200">
						<td class="px-4 py-2 whitespace-nowrap">{{ project.title }}</td>
						<td class="px-4 py-2 whitespace-nowrap">{{ project.createdByName }}</td>
						<td class="px-4 py-2 whitespace-nowrap">{{ formatDate(project.dueDate) }}</td>
						<td class="px-4 py-2 whitespace-nowrap">
							<span :class="statusClass(project.status)">{{ project.status || "N/A" }}</span>
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
import { getCurrentUserProjects } from "~/services/projectService";
import type { IProject } from "~/Interfaces/IProject";

// State to store the projects data
const projects = ref<IProject[]>([]);

// Access the router instance
const router = useRouter();

// Function to navigate to the project page
const goToProject = (projectId: number) => {
	router.push(`/project/${projectId}`);
};

// Function to load projects for the logged-in user
const loadProjects = async () => {
	try {
		// Fetch projects for the current user
		const fetchedProjects = await getCurrentUserProjects();

		projects.value = fetchedProjects;
	} catch (error) {
		console.error("Failed to load projects:", error);
	}
};

// Fetch projects when the component is mounted
onMounted(() => {
	loadProjects();
	addEventListener("project-created", loadProjects);
});

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
</script>
