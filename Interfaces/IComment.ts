export interface IComment {
	commentID: number;
	taskID: number;
	userID: number;
	content: string;
	createdDate: string;
	user: {
		userID: number;
		name: string;
		email: string;
	};
}
/**
 * Interface representing a comment in the system, including details about the comment,
 * the associated task, the user who made the comment, and the creation date.
 */
