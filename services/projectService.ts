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

export const addUsersToProject = async (projectId: number, userIds: number[], value: string): Promise<void> => {
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

export const removeUserFromProject = async (projectId: number, userId: number): Promise<void> => {
	const config = useRuntimeConfig();
	const url = `${config.public.apiBaseUrl}Projects/${projectId}/users/${userId}`;
	try {
		await fetchWithAuth(url, {
			method: "DELETE",
		});
	} catch (error) {
		console.error("Error removing user from project:", error);
		throw error;
	}
};

export const updateUserRoleInProject = async (projectId: number, userId: number, role: RoleEnum): Promise<void> => {
	const config = useRuntimeConfig();
	const url = `${config.public.apiBaseUrl}Projects/${projectId}/users/${userId}/role`;
	const payload = { role };
	try {
		await fetchWithAuth(url, {
			method: "PUT",
			body: JSON.stringify(payload),
			headers: {
				"Content-Type": "application/json",
			},
		});
	} catch (error) {
		console.error("Error updating user role in project:", error);
		throw error;
	}
};
