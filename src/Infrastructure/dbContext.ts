import { BaseEntity } from "../models/Entities";
import { envProperties } from "../helpers";
import { knex } from "knex";

export const context = knex({
	client: "pg",
	connection: envProperties.CONNECTION_STRING,
	searchPath: ["knex", "public"],
});
