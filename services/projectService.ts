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

export const addUsersToProject = async (projectId: number, userIds: number[], role: string): Promise<void> => {
	const config = useRuntimeConfig();
	const url = `${config.public.apiBaseUrl}Project/${projectId}/Users`;

	const userDtos = userIds.map((userId) => ({ userID: userId, role: 1 }));

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

export const removeUserFromProject = async (projectId: number, userId: number): Promise<void> => {
	const config = useRuntimeConfig();
	const url = `${config.public.apiBaseUrl}Project/${projectId}/Users/${userId}`;

	try {
		await fetchWithAuth(url, {
			method: "DELETE",
			headers: {
				Accept: "application/json",
			},
		});
	} catch (error) {
		console.error(`Error removing user from project ${projectId}:`, error);
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

export const getProjectById = async (projectId: number): Promise<IProject> => {
	const config = useRuntimeConfig();
	const url = `${config.public.apiBaseUrl}Project/${projectId}`;

	try {
		const response = await fetchWithAuth(url);
		return response as IProject;
	} catch (error) {
		console.error(`Error fetching project with ID ${projectId}:`, error);
		throw error;
	}
};

export const deleteProject = async (projectId: number): Promise<void> => {
	const config = useRuntimeConfig();
	const url = `${config.public.apiBaseUrl}Project/${projectId}`;

	try {
		await fetchWithAuth(url, {
			method: "DELETE",
			headers: {
				Accept: "application/json",
			},
		});
	} catch (error) {
		console.error(`Error deleting project with ID ${projectId}:`, error);
		throw error;
	}
};

export const updateProject = async (projectId: number, updatedProject: IProject): Promise<IProject> => {
	const config = useRuntimeConfig();
	const url = `${config.public.apiBaseUrl}Project/${projectId}`;

	const payload = {
		projectID: updatedProject.projectID,
		title: updatedProject.title,
		description: updatedProject.description,
	};

	try {
		const response = await fetchWithAuth(url, {
			method: "PUT",
			body: JSON.stringify(payload),
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		});

		return response as IProject;
	} catch (error) {
		console.error(`Error updating project with ID ${projectId}:`, error);
		throw error;
	}
};
