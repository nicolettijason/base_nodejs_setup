import { UserRoles } from "../Enums/UserRoles";

export interface ITokenDatas {
	id: number;
	username: string;
	email: string;
	role: UserRoles;
}
