<template>
	<div class="p-2">
		<span class="text-xs font-semibold" :class="priorityClass">{{ priority }}</span>
		<h3 class="font-semibold">{{ task.title }}</h3>
		<p class="text-sm text-gray-600">{{ task.description }}</p>
		<p class="text-xs text-gray-500">Assigned to: {{ assignedUserName }}</p>
		<div class="flex justify-end mt-2">
			<button @click="deleteTask" class="text-red-500 hover:text-red-700">Delete</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { ITask } from "~/Interfaces/ITask";
import { getUserById } from "~/services/authService";
import { deleteTask } from "~/services/taskService";

const props = defineProps<{
	task: ITask;
}>();

const assignedUserName = ref("Unassigned");

onMounted(async () => {
	if (props.task.assignedTo) {
		try {
			const user = await getUserById(props.task.assignedTo);
			assignedUserName.value = user.name || user.email;
		} catch (error) {
			console.error("Failed to fetch assigned user:", error);
		}
	}
});

// Priority label
const priority = computed(() => {
	switch (props.task.priority) {
		case 0:
			return "Low";
		case 1:
			return "Medium";
		case 2:
			return "High";
		default:
			return "Unknown";
	}
});

// Computed property to determine the class based on priority
const priorityClass = computed(() => {
	switch (props.task.priority) {
		case 0:
			return "bg-green-100 text-green-800";
		case 1:
			return "bg-yellow-100 text-yellow-800";
		case 2:
			return "bg-red-100 text-red-800";
		default:
			return "";
	}
});
</script>
