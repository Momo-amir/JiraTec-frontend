import { RoleEnum } from "~/enums/enums";

export interface IUserWithRole {
	userID: number;
	name: string;
	email: string;
	role: RoleEnum;
}
// Not yet implemented
