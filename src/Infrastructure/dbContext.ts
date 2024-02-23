import { Pool, QueryResult, QueryResultRow } from "pg";
import { BaseEntity } from "../models/Entities";
import { envProperties } from "../helpers";

const pool = new Pool({ connectionString: envProperties.CONNECTION_STRING });

export const query = <TEntity extends QueryResultRow & BaseEntity>(
	text: string,
	params: (string | number | boolean | Date)[]
) => {
	return pool.query(text, params) as Promise<QueryResult<TEntity>>;
};
