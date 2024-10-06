import type { IUser } from "~/Interfaces/IUser";
import type { ITask } from "./ITask";

export interface IProject {
	projectID: number;
	title: string;
	description: string;
	createdBy?: IUser;
	createdByName?: string;
	createdDate?: string;
	tasks?: ITask[];
	users?: IUser[];
}
