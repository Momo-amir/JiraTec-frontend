<template>
	<div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
		<div class="bg-base-100 p-6 rounded-lg shadow-lg w-1/3">
			<header class="flex justify-between items-center mb-4">
				<h2 class="text-xl font-semibold text-primary">Manage Team</h2>
				<button @click="closeModal" class="text-base-content hover:text-base-content/70">&times;</button>
			</header>

			<div>
				<ul class="divide-y divide-base-300">
					<li v-for="user in users" :key="user.userID" class="flex items-center justify-between py-2">
						<div>
							<span>{{ user.name || user.email }}</span>
						</div>
						<div>
							<button
								@click="toggleUserAssignment(user.userID)"
								class="py-1 px-3 rounded-md text-sm"
								:class="{
									'bg-error text-white': isUserInProject(user.userID),
									'bg-primary text-white': !isUserInProject(user.userID),
								}">
								{{ isUserInProject(user.userID) ? "Remove" : "Add" }}
							</button>
						</div>
					</li>
				</ul>
			</div>

			<div class="flex justify-end mt-4">
				<button @click="closeModal" class="py-2 px-4 bg-base-300 hover:bg-base-400 rounded-md">Close</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getAllUsers } from "~/services/userService";
import { addUsersToProject, removeUserFromProject } from "~/services/projectService";

const props = defineProps<{
	projectId: number;
	projectUsers: IUser[];
}>();

const emits = defineEmits(["close", "usersUpdated"]);

import type { IUser } from "~/Interfaces/IUser";

const users = ref<IUser[]>([]);

const loadUsers = async () => {
	try {
		users.value = await getAllUsers();
	} catch (error) {
		console.error("Failed to load users:", error);
	}
};

onMounted(() => {
	loadUsers();
});

// Check if a user is already assigned to the project
const isUserInProject = (userID: number) => {
	return props.projectUsers.some((user) => user.userID === userID);
};

// Toggle user assignment to the project
const toggleUserAssignment = async (userID: number) => {
	try {
		if (isUserInProject(userID)) {
			// Remove user from project
			await removeUserFromProject(props.projectId, userID);
		} else {
			// Add user to project
			await addUsersToProject(props.projectId, [userID], "");
		}
		// Emit event to notify parent component to reload data
		emits("usersUpdated");
	} catch (error) {
		console.error("Failed to update user assignment:", error);
	}
};

const closeModal = () => {
	emits("close");
};
</script>
