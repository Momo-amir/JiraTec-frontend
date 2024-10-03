<template>
	<div class="flex space-x-4">
		<div v-for="status in statuses" :key="status" class="w-1/3" @drop="onDrop(status)" @dragover.prevent>
			<h2 class="text-xl font-semibold mb-2 text-primary">{{ statusLabels[status] }}</h2>
			<div class="bg-base-200 p-2 rounded-md min-h-[200px]">
				<div v-for="task in tasksByStatus[status]" :key="task.taskID" class="bg-base-100 p-2 mb-2 rounded-md shadow hover:bg-base-300 ease-out duration-200" draggable="true" @dragstart="onDragStart(task)" @dragend="onDragEnd">
					<TaskCard :task="task" @taskDeleted="taskDeleted" @editTask="editTask" />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import type { ITask } from "~/Interfaces/ITask";
import { updateTask } from "~/services/taskService"; // Import updateTask function

const props = defineProps<{
	tasks: ITask[];
}>();

const emits = defineEmits(["taskUpdated", "taskDeleted", "editTask"]);

const statuses = [0, 1, 2]; // Corresponds to TaskStatusEnum

const statusLabels: { [key: number]: string } = {
	0: "To Do",
	1: "In Progress",
	2: "Done",
};

const tasksByStatus = computed<Record<number, ITask[]>>(() => {
	const groupedTasks: Record<number, ITask[]> = {
		0: [],
		1: [],
		2: [],
	};
	props.tasks.forEach((task) => {
		groupedTasks[task.status]?.push(task);
	});
	return groupedTasks;
});

const draggedTask = ref<ITask | null>(null);

const onDragStart = (task: ITask) => {
	draggedTask.value = task;
};

const onDragEnd = () => {
	draggedTask.value = null;
};

const onDrop = async (status: number) => {
	if (draggedTask.value && draggedTask.value.status !== status) {
		const updatedTask = { ...draggedTask.value, status };
		// Update the task on the server
		await updateTaskStatus(updatedTask);
		// Emit the updated task to the parent component
		emits("taskUpdated", updatedTask);
	}
};

const updateTaskStatus = async (task: ITask) => {
	try {
		console.log("Updating Task:", task); // Log the full task object for debugging

		// Pass the full task object to the updateTask method
		await updateTask(task.taskID, task);
	} catch (error) {
		console.error("Failed to update task status:", error);
	}
};

const taskDeleted = (taskId: number) => {
	// Emit the taskDeleted event with the taskId to parent component
	emits("taskDeleted", taskId);
};

const editTask = (task: ITask) => {
	console.log("Task to edit:", task);
	emits("editTask", task);
};
</script>
