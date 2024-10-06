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
