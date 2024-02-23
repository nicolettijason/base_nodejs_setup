import { BaseEntity } from "..";

export interface BaseAuditableEntity extends BaseEntity {
	createdAt: Date;
	modifiedAt: Date;
}
