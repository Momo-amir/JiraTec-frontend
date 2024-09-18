export const fetchWithAuth = async (url: string, options: any = {}) => {
	const token = localStorage.getItem("token"); // Retrieve the token from local storage

	// Define headers, merging any provided in options with authentication headers
	const headers = {
		...options.headers,
		"Content-Type": "application/json",
		Accept: "application/json",
		Authorization: `Bearer ${token}`, // Include the token in the Authorization header
	};

	try {
		// Make the API request with the merged headers
		const response = await $fetch(url, { ...options, headers });

		// You could add additional logic here, like checking for 401 status codes to handle token refresh
		return response;
	} catch (error) {
		console.error("Error in fetchWithAuth:", error);
		// Handle different error scenarios here, e.g., token refresh or logout
		throw error;
	}
};
