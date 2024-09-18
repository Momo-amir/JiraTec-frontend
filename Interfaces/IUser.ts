// interfaces/User.ts
export interface IUser {
	userID: number;
	name: string;
	email: string;
	role: number; // Adjust the type based on your RoleEnum
	// Exclude 'token' field here since it's not needed in this context
	projects?: any[]; // If you have projects associated
}
