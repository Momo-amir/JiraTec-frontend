export const registerUser = async (user: { name: string; email: string; passwordHash: string; roleID: number }) => {
	// Correctly access the runtime config
	const config = useRuntimeConfig();
	const url = `${config.public.apiBaseUrl}User/register`; // Make sure the correct value is used
	console.log("Sending request to:", url);
	console.log("Request payload:", user);

	try {
		const response = await $fetch(url, {
			method: "POST",
			body: user, // Passes the object directly
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		});

		console.log("Response:", response);
		return response;
	} catch (error) {
		console.error("Error in registerUser:", error);
		throw error;
	}
};
