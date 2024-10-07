<template>
	<div class="p-2 bg-base-100 flex flex-col gap-y-2" @click="handleClickOutside">
		<div @click="viewFullDetails" type="button" class="">
			<span class="text-xs font-semibold px-1 rounded-sm w-fit" :class="priorityClass">{{ priority }}</span>
			<h3 class="font-semibold text-primary">{{ task.title }}</h3>
			<p class="text-sm text-base-content" v-if="task.description">{{ task.description }}</p>
			<p class="text-xs text-base-content/70">Assigned to: {{ assignedUserName }}</p>
			<p class="text-xs text-base-content/70" v-if="dueDate">Due Date: {{ dueDate }}</p>

			<div class="flex justify-end mt-2 relative">
				<!-- Options Button -->
				<button @click="toggleOptions" class="text-primary hover:text-primary-focus bg-inherit hover:bg-base-200 p-1 rounded-full ease-in duration-200">&#x22EE;</button>
				<!-- Options Menu -->
				<div v-if="showOptions" class="absolute top-4 right-0 mt-2 w-fit bg-base-100 border border-base-300 rounded-md shadow-lg" ref="optionsMenu">
					<ul>
						<li>
							<button @click="$emit('editTask', task)" class="text-xs w-full text-left px-4 py-2 text-primary hover:text-primary-focus hover:bg-base-200 ease-in duration-200">Edit</button>
						</li>

						<li>
							<button @click="() => deleteTask(props.task.taskID)" class="text-error hover:text-error-focus text-xs w-full text-left px-4 py-2 hover:bg-base-200 ease-in duration-200">Delete</button>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { ITask } from "~/Interfaces/ITask";
import { getUserById } from "~/services/authService";
import { deleteTask as deleteTaskService } from "~/services/taskService";

const props = defineProps<{
	task: ITask;
}>();

const task = ref<Partial<ITask>>(props.task);

const emits = defineEmits(["taskDeleted", "editTask"]);

const assignedUserName = ref("Unassigned");
const showOptions = ref(false);
const optionsMenu = ref<HTMLElement | null>(null);

const dueDate = ref<string | undefined>(props.task.dueDate ? new Date(props.task.dueDate).toLocaleDateString() : undefined);

const toggleOptions = (event: Event) => {
	event.stopPropagation();
	showOptions.value = !showOptions.value;
};

const handleClickOutside = (event: Event) => {
	if (optionsMenu.value && !optionsMenu.value.contains(event.target as Node)) {
		showOptions.value = false;
	}
};

onMounted(async () => {
	if (props.task.assignedTo) {
		try {
			const user = await getUserById(props.task.assignedTo);
			assignedUserName.value = user.name || user.email;
		} catch (error) {
			console.error("Failed to fetch assigned user:", error);
		}
	}

	document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
	document.removeEventListener("click", handleClickOutside);
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

const deleteTask = async (taskId: number) => {
	try {
		console.log("Deleting task with ID: ", taskId);

		await deleteTaskService(taskId);
		emits("taskDeleted", taskId);
	} catch (error) {
		console.error("Failed to delete task:", error);
	}
};

const router = useRouter();

const viewFullDetails = () => {
	router.push(`/tasks/${task.value.taskID}`);
};
</script>
