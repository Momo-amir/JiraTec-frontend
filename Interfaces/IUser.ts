// interfaces/User.ts
export interface IUser {
	userID: number;
	name: string;
	email: string;
	role: number;
	// Excludes 'token' field here since it's not needed in this context
	projects?: any[]; // associated projects
}
