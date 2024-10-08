<template>
	<div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
		<div class="bg-base-100 p-6 rounded-lg shadow-lg w-1/3 bg-opacity-100">
			<header class="flex justify-between items-center mb-4">
				<h2 class="text-xl font-semibold text-primary">{{ isEditMode ? "Edit Task" : "Add New Task" }}</h2>
				<button @click="closeModal" class="text-gray-500 hover:text-gray-700">&times;</button>
			</header>

			<form @submit.prevent="handleSubmit">
				<!-- Task Title -->
				<div class="mb-4">
					<label for="title" class="block text-sm font-medium text-gray-700">Task Title</label>
					<input type="text" id="title" v-model="task.title" class="px-4 py-2 mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
				</div>

				<!-- Description -->
				<div class="mb-4">
					<label for="description" class="block text-sm font-medium text-gray-700">Description</label>
					<textarea id="description" v-model="task.description" class="mt-1 px-4 py-2 block w-full border-gray-300 rounded-md shadow-sm"></textarea>
				</div>

				<!-- Assign To -->
				<div class="mb-4">
					<label for="assignedTo" class="block text-sm font-medium text-gray-700">Assign To</label>
					<select id="assignedTo" v-model="task.assignedTo" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
						<option value="">Select a user</option>
						<option v-for="user in users" :key="user.userID" :value="user.userID">
							{{ user.name || user.email }}
						</option>
					</select>
				</div>

				<!-- Priority -->
				<div class="mb-4">
					<label for="priority" class="block text-sm font-medium text-gray-700">Priority</label>
					<select id="priority" v-model="task.priority" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
						<option v-for="priorityOption in priorities" :key="priorityOption.value" :value="priorityOption.value">
							{{ priorityOption.label }}
						</option>
					</select>
				</div>

				<!-- Due Date -->
				<div class="mb-4">
					<label for="dueDate" class="block text-sm font-medium text-gray-700">Due Date</label>
					<input type="date" id="dueDate" v-model="task.dueDate" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
				</div>

				<!-- Form Actions -->
				<div class="flex justify-between items-center">
					<!-- "View Full Details" Button (only in edit mode) -->
					<div v-if="isEditMode"></div>

					<div class="flex">
						<button type="button" @click="closeModal" class="mr-2 py-2 px-4 bg-secondary-light hover:bg-secondary-dark text-base rounded-md hover:rounded-none duration-200">Cancel</button>
						<button type="submit" class="py-2 px-4 bg-primary hover:bg-primary-dark text-base-100 rounded-md hover:rounded-none duration-200">{{ isEditMode ? "Update Task" : "Add Task" }}</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script setup lang="ts">
import { createTask, updateTask } from "~/services/taskService";
import { getProjectById } from "~/services/projectService";

import type { ITask } from "~/Interfaces/ITask";
import type { IUser } from "~/Interfaces/IUser";
import { TaskPriorityEnum, TaskStatusEnum } from "~/enums/enums";

const props = defineProps<{
	projectId: number;
	taskToEdit?: ITask; // Optional task to be edited
}>();

const emits = defineEmits(["close", "taskCreated", "taskUpdated"]);

const isEditMode = ref(!!props.taskToEdit); // Determine if the modal is for editing or creating a task by checking if taskToEdit is provided the !! converts the value to a boolean
const task = ref<Partial<ITask>>(
	props.taskToEdit
		? { ...props.taskToEdit }
		: {
				projectID: props.projectId,
				title: "",
				description: "",
				status: TaskStatusEnum.ToDo,
				priority: TaskPriorityEnum.Medium,
				assignedTo: undefined,
				dueDate: undefined,
		  }
	// Partial<ITask> is used to allow the task object to be partially filled using the spread operator to copy the taskToEdit object if it exists
);

const users = ref<IUser[]>([]);
const priorities = [
	{ value: TaskPriorityEnum.Low, label: "Low" },
	{ value: TaskPriorityEnum.Medium, label: "Medium" },
	{ value: TaskPriorityEnum.High, label: "High" },
];

const loadProjectUsers = async () => {
	try {
		const project = await getProjectById(props.projectId);
		users.value = project.users || [];
	} catch (error) {
		console.error("Failed to load project users:", error);
	}
};

onMounted(() => {
	loadProjectUsers();
});

const closeModal = () => {
	emits("close");
};

const handleSubmit = async () => {
	try {
		// Ensure dueDate is formatted correctly
		if (task.value.dueDate) {
			task.value.dueDate = new Date(task.value.dueDate).toISOString();
		}

		if (isEditMode.value) {
			// Update existing task
			await updateTask(task.value.taskID!, task.value);
			emits("taskUpdated", task.value);
		} else {
			// Create new task
			const newTask = await createTask(task.value);
			emits("taskCreated", newTask);
		}

		closeModal();
	} catch (error) {
		console.error("Failed to submit task:", error);
	}
};
</script>
