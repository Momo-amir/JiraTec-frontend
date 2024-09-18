<template>
	<div class="p-4 bg-white shadow rounded-md">
		<h2 class="text-xl font-semibold mb-4">Project Summary</h2>
		<div class="overflow-x-auto">
			<table class="min-w-full divide-y divide-gray-200">
				<thead>
					<tr>
						<th class="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase">Project Name</th>
						<th class="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase">Project Manager</th>
						<th class="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase">Due Date</th>
						<th class="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase">Status</th>
					</tr>
				</thead>
				<tbody class="bg-white divide-y divide-gray-200">
					<tr v-for="project in projects" :key="project.projectID">
						<td class="px-4 py-2 whitespace-nowrap">{{ project.title }}</td>
						<td class="px-4 py-2 whitespace-nowrap">{{ project.createdByName }}</td>
						<td class="px-4 py-2 whitespace-nowrap">{{ formatDate(project.dueDate) }}</td>
						<td class="px-4 py-2 whitespace-nowrap">
							<span :class="statusClass(project.status)">{{ project.status }}</span>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getProjectsForUser } from "~/services/projectService";
import { FetchUser } from "~/services/authService";
import type { IProject } from "~/Interfaces/IProject";
import type { IUser } from "~/Interfaces/IUser";

// State to store the projects data
const projects = ref<IProject[]>([]);

// Function to load projects for the logged-in user
const loadProjects = async () => {
	try {
		// Fetch the logged-in user
		const user: IUser = await FetchUser();

		// Fetch projects for the user
		const fetchedProjects = await getProjectsForUser(user.userID);

		projects.value = fetchedProjects;
	} catch (error) {
		console.error("Failed to load projects:", error);
	}
};

// Fetch projects when the component is mounted
onMounted(() => {
	loadProjects();
});

// Method to format the due date
function formatDate(date: string | undefined): string {
	return date ? new Date(date).toLocaleDateString() : "N/A";
}

// Method to dynamically assign classes based on project status
function statusClass(status: string): string {
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
