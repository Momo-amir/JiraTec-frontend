// services/commentService.ts
import { fetchWithAuth } from "~/services/apiHelper";
import type { IComment } from "~/Interfaces/IComment";

export const getCommentsByTaskId = async (taskID: number): Promise<IComment[]> => {
	const config = useRuntimeConfig();
	const url = `${config.public.apiBaseUrl}Comments/task/${taskID}`;

	try {
		const response = await fetchWithAuth(url);
		return response as IComment[];
	} catch (error) {
		console.error("Error fetching comments:", error);
		throw error;
	}
};

export const createComment = async (taskID: number, content: string, userId: number): Promise<IComment> => {
	const config = useRuntimeConfig();
	const url = `${config.public.apiBaseUrl}Comments`;

	const payload = {
		taskID: taskID,
		content: content,
		userID: userId, // Replace this with the actual user ID
	};

	try {
		const response = await fetchWithAuth(url, {
			method: "POST",
			body: JSON.stringify(payload),
			headers: {
				"Content-Type": "application/json",
			},
		});

		return response as IComment;
	} catch (error) {
		console.error("Error creating comment:", error);
		throw error;
	}
};

export const deleteComment = async (commentID: number): Promise<void> => {
	const config = useRuntimeConfig();
	const url = `${config.public.apiBaseUrl}Comments/${commentID}`;

	try {
		await fetchWithAuth(url, {
			method: "DELETE",
		});
	} catch (error) {
		console.error("Error deleting comment:", error);
		throw error;
	}
};

export const updateComment = async (commentID: number, updatedComment: IComment): Promise<IComment> => {
	const config = useRuntimeConfig();
	const url = `${config.public.apiBaseUrl}Comments/${commentID}`;

	// Include the User object if required
	const payload = {
		commentID: updatedComment.commentID,
		taskID: updatedComment.taskID,
		userID: updatedComment.userID,
		content: updatedComment.content,
		createdDate: updatedComment.createdDate,
		user: updatedComment.user, // Ensure this is populated
	};

	console.log("Updating comment with payload:", payload); // For debugging

	try {
		const response = await fetchWithAuth(url, {
			method: "PUT",
			body: JSON.stringify(payload),
			headers: {
				"Content-Type": "application/json",
			},
		});

		return response as IComment;
	} catch (error) {
		console.error("Error updating comment:", error);
		throw error;
	}
};
