<template>
	<div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
		<div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
			<header class="flex justify-between items-center mb-4">
				<h2 class="text-xl font-semibold">Add Users to Project</h2>
				<button @click="closeModal" class="text-gray-500 hover:text-gray-700">&times;</button>
			</header>

			<form @submit.prevent="handleSubmit">
				<div class="mb-4">
					<label for="user" class="block text-sm font-medium text-gray-700">Select Users</label>
					<select v-model="selectedUsers" id="user" multiple class="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
						<option v-for="user in users" :key="user.userID" :value="user.userID">
							{{ user.name || user.email }}
						</option>
					</select>
				</div>

				<div class="mb-4">
					<label for="role" class="block text-sm font-medium text-gray-700">Assign Role</label>
					<select v-model="selectedRole" id="role" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
						<option :value="RoleEnum.Admin">Admin</option>
						<option :value="RoleEnum.User">User</option>
						<option :value="RoleEnum.ProjectLeader">Project Leader</option>
						<option :value="RoleEnum.Developer">Developer</option>
					</select>
				</div>

				<div class="flex justify-end">
					<button type="button" @click="closeModal" class="mr-2 py-2 px-4 bg-gray-300 hover:bg-gray-400 rounded-md">Cancel</button>
					<button type="submit" class="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md">Add Users</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script setup lang="ts">
import { getAllUsers } from "~/services/userService";
import { RoleEnum } from "~/enums/enums"; // Import the RoleEnum
import { addUsersToProject } from "~/services/projectService";

const props = defineProps<{
	projectId: number;
}>();

const emits = defineEmits(["close", "usersAdded"]);

import type { IUser } from "~/Interfaces/IUser"; // Import the IUser type

const users = ref<IUser[]>([]);
const selectedUsers = ref<number[]>([]);
const selectedRole = ref<RoleEnum>(RoleEnum.User); // Default role

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

const closeModal = () => {
	emits("close");
};

const handleSubmit = async () => {
	try {
		await addUsersToProject(props.projectId, selectedUsers.value, selectedRole.value.toString()); // Convert enum to string
		emits("usersAdded");
		closeModal();
	} catch (error) {
		console.error("Failed to add users to project:", error);
	}
};
</script>
