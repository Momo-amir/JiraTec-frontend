// services/taskService.js
const apiBaseUrl = process.env.NUXT_PUBLIC_API_BASE_URL;

export const getTasks = async () => {
	try {
		const response = await fetch(`${apiBaseUrl}/task`);
		if (!response.ok) throw new Error(`Error: ${response.statusText}`);
		return await response.json();
	} catch (error) {
		console.error("Error fetching tasks:", error);
		throw error;
	}
};

export const createTask = async (taskData) => {
	try {
		const response = await fetch(`${apiBaseUrl}/task`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(taskData),
		});
		if (!response.ok) throw new Error(`Error: ${response.statusText}`);
		return await response.json();
	} catch (error) {
		console.error("Error creating task:", error);
		throw error;
	}
};

// Add other CRUD methods for tasks similarly...
