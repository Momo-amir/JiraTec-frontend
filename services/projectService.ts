import type { IProject } from "~/Interfaces/IProject";
import { fetchWithAuth } from "~/services/apiHelper";

export const getProjects = async (): Promise<IProject[]> => {
	const config = useRuntimeConfig();
	const url = `${config.public.apiBaseUrl}Project`;

	try {
		const response = await fetchWithAuth(url);
		return response as IProject[];
	} catch (error) {
		console.error("Error fetching projects:", error);
		throw error;
	}
};

export const createProject = async (project: { title: string; description: string }): Promise<IProject> => {
	const config = useRuntimeConfig();
	const url = `${config.public.apiBaseUrl}Project`;

	try {
		const response = await fetchWithAuth(url, {
			method: "POST",
			body: JSON.stringify(project),
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		});

		return response as IProject;
	} catch (error) {
		console.error("Error creating project:", error);
		throw error;
	}
};

export const addUsersToProject = async (projectId: number, userIds: number[]): Promise<void> => {
	const config = useRuntimeConfig();
	const url = `${config.public.apiBaseUrl}Project/${projectId}/Users`;

	const userDtos = userIds.map((userId) => ({ userID: userId }));

	try {
		await fetchWithAuth(url, {
			method: "POST",
			body: JSON.stringify(userDtos),
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		});
	} catch (error) {
		console.error(`Error adding users to project ${projectId}:`, error);
		throw error;
	}
};

export const getCurrentUserProjects = async (): Promise<IProject[]> => {
	const config = useRuntimeConfig();
	const url = `${config.public.apiBaseUrl}Project/User/Projects`;

	try {
		const response = await fetchWithAuth(url);
		return response as IProject[];
	} catch (error) {
		console.error("Error fetching current user's projects:", error);
		throw error;
	}
};
