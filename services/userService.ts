import type { IUser } from "~/Interfaces/IUser";
import { fetchWithAuth } from "~/services/apiHelper";

export const getAllUsers = async (): Promise<IUser[]> => {
	const config = useRuntimeConfig();
	const url = `${config.public.apiBaseUrl}User`;

	try {
		const response = await fetchWithAuth(url);
		return response as IUser[];
	} catch (error) {
		console.error("Error fetching users:", error);
		throw error;
	}
};
