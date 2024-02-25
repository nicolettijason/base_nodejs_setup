import { BaseEntity } from "..";

export interface BaseAuditableEntity extends BaseEntity {
	CreatedAt: Date;
	ModifiedAt: Date;
}
