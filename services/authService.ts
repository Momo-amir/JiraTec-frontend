import type { IUser } from "~/Interfaces/IUser";
import type { ILoginResponse } from "~/Interfaces/ILoginResponse";
import { fetchWithAuth } from "~/services/apiHelper";

export const registerUser = async (user: { name: string; email: string; passwordHash: string; role: number }) => {
	// Correctly access the runtime config
	const config = useRuntimeConfig();
	const url = `${config.public.apiBaseUrl}User/register`; // Make sure the correct value is used
	console.log("Sending request to:", url);

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

export const loginUser = async (user: { email: string; password: string }): Promise<ILoginResponse> => {
	const config = useRuntimeConfig();
	const url = `${config.public.apiBaseUrl}User/login`;
	console.log("Sending request to:", url);

	try {
		const response = await $fetch<ILoginResponse>(url, {
			method: "POST",
			body: JSON.stringify(user), // Sending JSON payload
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		});

		console.log("Response:", response);

		// Store the JWT token in local storage
		if (response && response.token) {
			localStorage.setItem("token", response.token);
			localStorage.setItem("userId", response.userID.toString());
		}

		return response;
	} catch (error) {
		console.error("Error in loginUser:", error);
		throw error;
	}
};

export const FetchUser = async (): Promise<ILoginResponse> => {
	const config = useRuntimeConfig();
	const userId = localStorage.getItem("userId"); // Retrieve the user ID from local storage

	if (!userId) {
		throw new Error("User ID not found in local storage");
	}

	const url = `${config.public.apiBaseUrl}User/${userId}`;
	console.log("Sending request to:", url);

	try {
		const response: any = await fetchWithAuth(url); // Use 'any' type for simplicity
		const userData = response as ILoginResponse;
		console.log("Response:", userData);
		return userData;
	} catch (error) {
		console.error("Error fetching user:", error);
		throw error;
	}
};

export const getUserById = async (userId: number): Promise<IUser> => {
	const config = useRuntimeConfig();
	const { data, error } = await useFetch<IUser>(`${config.public.apiBaseUrl}User/${userId}`);

	if (error.value) {
		throw error.value;
	}

	return data.value as IUser;
};
