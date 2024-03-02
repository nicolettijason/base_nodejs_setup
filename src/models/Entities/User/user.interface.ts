import { BaseAuditableEntity } from "..";

export interface User extends BaseAuditableEntity {
	FirstName: string;
	LastName: string;
	Username: string;
	Email: string;
	Password: string;
}
