// interfaces/Project.ts
import type { IUser } from "~/Interfaces/IUser"; // Adjust the import path as needed

export interface IProject {
	projectID: number;
	title: string;
	description: string;
	createdBy: IUser; // Change from number to IUser
	createdByName: string;
	createdDate: string; // or Date type
	users: IUser[]; // Array of user objects
	tasks?: any[]; // If you have tasks associated
	status?: string; // Optional field
}
