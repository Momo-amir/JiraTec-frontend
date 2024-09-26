import type { IUser } from "~/Interfaces/IUser";
import type { ITask } from "./ITask";

export interface IProject {
	projectID: number; // Required
	title: string; // Required
	description: string; // Required
	createdBy?: IUser; // Optional
	createdByName?: string; // Optional
	createdDate?: string; // Optional
	tasks?: ITask[]; // Optional
	users?: IUser[]; // Optional
}
