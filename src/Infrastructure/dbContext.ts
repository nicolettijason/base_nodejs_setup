import { envProperties } from "../helpers";
import { knex } from "knex";
import { DatabaseTable } from "../models/Enums/DatabaseTable";
import { BaseEntity } from "../models/Entities";

const knexContext = knex({
	client: "pg",
	connection: envProperties.CONNECTION_STRING,
	searchPath: ["knex", "public"],
});

export const context = <T extends BaseEntity>(
	table: keyof typeof DatabaseTable
) => knexContext<T>(table);
