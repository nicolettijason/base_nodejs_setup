import { BaseAuditableEntity } from "../BaseAuditableEntity/BaseAuditableEntity.interface";

export interface Category extends BaseAuditableEntity {
	Name: string;
	IsPublic: boolean;
	UserId: number;
}
