<template>
	<div class="container mx-auto p-6" v-if="task">
		<div class="flex flex-row justify-end gap-4 h-6">
			<p class="mb-2">
				<strong class="text-primary">Assigned to:</strong> <span v-if="assignedUserName">{{ assignedUserName }} </span><span v-else>Unassigned</span>
			</p>
			<p class="mb-24"><strong class="text-primary">Due Date:</strong> {{ dueDate }}</p>
		</div>
		<h1 class="text-h3 font-bold text-primary mb-4">{{ task.title }}</h1>
		<p class="mb-2 text-lg">{{ task.description }}</p>

		<!-- Comment Section -->
		<div class="mt-6 bg-base-200 p-4 rounded-lg">
			<h2 class="text-lg font-semibold mb-4 text-h4 text-primary">Comments</h2>
			<div v-for="comment in comments" :key="comment.commentID" class="mb-4 p-4 bg-base-100 rounded-lg relative flex flex-col">
				<p class="mb-2">{{ comment.content }}</p>
				<p class="text-xs text-gray-600 mb-2 absolute bottom-0" v-if="comment.user">Posted by {{ comment.user.name || "Unknown User" }} on {{ new Date(comment.createdDate).toLocaleDateString() }}</p>

				<!-- Show edit/delete options only for the comment author -->
				<div v-if="comment.user && comment.user.userID === authStore.user?.userID" class="relative mt-2 flex justify-end">
					<button @click="toggleOptions(comment.commentID)" class="text-primary hover:text-primary-focus bg-inherit hover:bg-base-200 p-1 rounded-full ease-in duration-200">&#x22EE;</button>

					<div v-if="showOptionsForComment(comment.commentID)" class="absolute top-4 z-10 right-0 mt-2 w-fit bg-base-100 border border-base-300 rounded-md shadow-lg">
						<ul>
							<li>
								<button @click="startEditing(comment)" class="text-xs w-full text-left px-4 py-2 text-primary hover:text-primary-focus hover:bg-base-200 ease-in duration-200">Edit</button>
							</li>
							<li>
								<button @click="handleDeleteComment(comment.commentID)" class="text-error hover:text-error-focus text-xs w-full text-left px-4 py-2 hover:bg-base-200 ease-in duration-200">Delete</button>
							</li>
						</ul>
					</div>
				</div>
			</div>

			<!-- Comment Input -->
			<div class="mt-4">
				<textarea v-model="newComment" class="w-full p-2 border rounded-lg mb-1" placeholder="Write a comment..." maxlength="500"></textarea>
				<div class="text-right text-sm text-gray-600 mb-2">{{ newComment.length }}/500 characters</div>
				<button @click="submitComment" class="py-2 px-4 bg-primary text-white rounded">
					{{ isEditing ? "Update Comment" : "Add Comment" }}
				</button>
			</div>
		</div>
	</div>

	<div v-else class="text-center py-20">
		<p class="text-lg text-gray-600">Loading task details...</p>
	</div>
</template>

<script setup lang="ts">
import { getTaskById } from "~/services/taskService";
import { getCommentsByTaskId, createComment, deleteComment as deleteCommentService, updateComment } from "~/services/commentService";
import { useAuthStore } from "~/stores/auth";
import { getUserById } from "~/services/authService";

const route = useRoute();
const taskID = parseInt(route.params.taskID as string);

import type { ITask } from "~/Interfaces/ITask";
import type { IComment } from "~/Interfaces/IComment";

const authStore = useAuthStore();

const task = ref<ITask | null>(null);
const comments = ref<IComment[]>([]);
const newComment = ref("");
const isEditing = ref(false);
const commentToEdit = ref<IComment | null>(null);
const optionsMenuState = ref<{ [key: number]: boolean }>({});
const assignedUserName = ref("Unassigned");
const dueDate = ref("");

// Function to toggle the options menu for a specific comment
const toggleOptions = (commentID: number) => {
	optionsMenuState.value[commentID] = !optionsMenuState.value[commentID];
};

// Function to check if the options menu for a specific comment should be shown
const showOptionsForComment = (commentID: number) => {
	return optionsMenuState.value[commentID];
};

onMounted(async () => {
	try {
		// Fetch user info if not already fetched
		if (!authStore.user) {
			await authStore.fetchUser();
		}

		// Fetch task and comments data
		task.value = await getTaskById(taskID);
		if (task.value) {
			dueDate.value = task.value.dueDate ? new Date(task.value.dueDate).toLocaleDateString() : "No Due Date";

			// Fetch the assigned user's name
			if (task.value.assignedTo) {
				const assignedUser = await getUserById(task.value.assignedTo);
				assignedUserName.value = assignedUser?.name || "Unassigned";
			}

			comments.value = await getCommentsByTaskId(taskID);
		}
	} catch (error) {
		console.error("Failed to load task or comments:", error);
	}
});

const submitComment = async () => {
	try {
		// Ensure the comment content is not empty
		if (!newComment.value.trim()) {
			console.error("Comment content cannot be empty");
			return;
		}

		if (isEditing.value && commentToEdit.value) {
			// Update an existing comment
			const updatedComment = {
				...commentToEdit.value,
				content: newComment.value,
			};
			await updateComment(commentToEdit.value.commentID, updatedComment);
			isEditing.value = false;
			commentToEdit.value = null;
		} else {
			// Ensure user ID is available for new comments
			const userId = authStore.user?.userID;
			if (!userId) {
				console.error("User must be logged in to submit a comment");
				return;
			}

			// Create a new comment with the user ID
			await createComment(taskID, newComment.value, userId);
		}

		// Reload comments after adding/updating
		comments.value = await getCommentsByTaskId(taskID);
		newComment.value = ""; // Reset the input
	} catch (error) {
		console.error("Failed to submit comment:", error);
	}
};

const startEditing = (comment: IComment) => {
	isEditing.value = true;
	commentToEdit.value = comment;
	newComment.value = comment.content;
};

const handleDeleteComment = async (commentID: number) => {
	try {
		await deleteCommentService(commentID);
		comments.value = await getCommentsByTaskId(taskID); // Reload comments after deletion
	} catch (error) {
		console.error("Failed to delete comment:", error);
	}
};
</script>
