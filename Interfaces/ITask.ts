import { TaskStatusEnum, TaskPriorityEnum } from "~/enums/enums";

export interface ITask {
	taskID: number;
	projectID: number; // Include ProjectID
	title: string;
	description?: string;
	assignedTo: number;
	status: TaskStatusEnum;
	priority: TaskPriorityEnum;
	dueDate?: string;
}
