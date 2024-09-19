import type { IUser } from "~/Interfaces/IUser";

export interface IProject {
	projectID: number; // Required
	title: string; // Required
	description: string; // Required
	createdBy?: IUser; // Optional
	createdByName?: string; // Optional
	createdDate?: string; // Optional
	tasks?: any[]; // Optional
	users?: IUser[]; // Optional
}
