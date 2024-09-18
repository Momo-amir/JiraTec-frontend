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

// Function to fetch a project by ID
export const getProjectById = async (id: number): Promise<IProject> => {
	const config = useRuntimeConfig();
	const url = `${config.public.apiBaseUrl}Project/${id}`;

	try {
		const response = await fetchWithAuth(url);
		return response as IProject;
	} catch (error) {
		console.error(`Error fetching project with ID ${id}:`, error);
		throw error;
	}
};

// Function to create a new project
export const createProject = async (project: IProject): Promise<IProject> => {
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

// Function to update an existing project
export const updateProject = async (id: number, project: IProject): Promise<void> => {
	const config = useRuntimeConfig();
	const url = `${config.public.apiBaseUrl}Project/${id}`;

	try {
		await fetchWithAuth(url, {
			method: "PUT",
			body: JSON.stringify(project),
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		});
	} catch (error) {
		console.error(`Error updating project with ID ${id}:`, error);
		throw error;
	}
};

// Function to delete a project by ID
export const deleteProject = async (id: number): Promise<void> => {
	const config = useRuntimeConfig();
	const url = `${config.public.apiBaseUrl}Project/${id}`;

	try {
		await fetchWithAuth(url, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		});
	} catch (error) {
		console.error(`Error deleting project with ID ${id}:`, error);
		throw error;
	}
};

export const getProjectsForUser = async (userId: number): Promise<IProject[]> => {
	const config = useRuntimeConfig();
	const url = `${config.public.apiBaseUrl}User/${userId}/projects`;

	try {
		const response = await fetchWithAuth(url);
		return response as IProject[];
	} catch (error) {
		console.error(`Error fetching projects for user ID ${userId}:`, error);
		throw error;
	}
};
