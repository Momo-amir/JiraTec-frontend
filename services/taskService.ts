import type { ITask } from "~/Interfaces/ITask";
import { fetchWithAuth } from "~/services/apiHelper";

export const getTasks = async (): Promise<ITask[]> => {
	const config = useRuntimeConfig();
	const url = `${config.public.apiBaseUrl}Task`;

	try {
		const response = await fetchWithAuth(url);
		return response as ITask[];
	} catch (error) {
		console.error("Error fetching tasks:", error);
		throw error;
	}
};

export const getTaskById = async (taskId: number): Promise<ITask> => {
	const config = useRuntimeConfig();
	const url = `${config.public.apiBaseUrl}Task/${taskId}`;

	try {
		const response = await fetchWithAuth(url);
		return response as ITask;
	} catch (error) {
		console.error(`Error fetching task with ID ${taskId}:`, error);
		throw error;
	}
};

export const createTask = async (task: Partial<ITask>): Promise<ITask> => {
	const config = useRuntimeConfig();
	const url = `${config.public.apiBaseUrl}Task`;

	try {
		const response = await fetchWithAuth(url, {
			method: "POST",
			body: JSON.stringify(task),
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		});

		return response as ITask;
	} catch (error) {
		console.error("Error creating task:", error);
		throw error;
	}
};

export const deleteTask = async (taskId: number): Promise<void> => {
	const config = useRuntimeConfig();
	const url = `${config.public.apiBaseUrl}Task/${taskId}`;

	try {
		await fetchWithAuth(url, {
			method: "DELETE",
			headers: {
				Accept: "application/json",
			},
		});
	} catch (error) {
		console.error(`Error deleting task with ID ${taskId}:`, error);
		throw error;
	}
};

export const updateTask = async (taskId: number, task: Partial<ITask>): Promise<void> => {
	const config = useRuntimeConfig();
	const url = `${config.public.apiBaseUrl}Task/${taskId}`;

	try {
		await fetchWithAuth(url, {
			method: "PUT",
			body: JSON.stringify(task),
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		});
	} catch (error) {
		console.error(`Error updating task with ID ${taskId}:`, error);
		throw error;
	}
};
