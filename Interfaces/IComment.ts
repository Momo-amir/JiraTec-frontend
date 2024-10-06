// Interfaces/IComment.ts
export interface IComment {
	commentID: number; // Unique identifier for the comment
	taskID: number; // The ID of the task this comment is associated with
	userID: number; // The ID of the user who made the comment
	content: string; // The content of the comment
	createdDate: string; // The date the comment was created
	user: {
		userID: number; // The ID of the user
		name: string; // The name of the user who posted the comment
		email: string; // The email of the user who posted the comment
	}; // The user object associated with the comment
}
