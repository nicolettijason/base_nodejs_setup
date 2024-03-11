import { BaseEntity } from "../models/Entities";
import { DatabaseTable } from "../models/Enums/DatabaseTable";
import { context } from "./dbContext";
import { Knex } from "knex";

export class queryBuilderExtension<T extends BaseEntity> {
	private _context: Knex.QueryBuilder<T>;
	constructor(table: DatabaseTable) {
		this._context = context<T>(table);
	}

	getById(id: string, ...columns: (keyof T)[]) {
		return this._context.select(columns).where("Id", id).first();
	}

	firstOrDefault(filters: Record<string, string>) {
		const query = this._context.where(filters);
		Object.keys(filters).forEach((key, i) => {
			if (i === 0) {
				query.where(key, filters[key]);
			} else {
				query.orWhere(key, filters[key]);
			}
		});
		return query.first();
	}

	search(keyword: string, ...columns: (keyof T)[]) {
		return this._context.where((builder) => {
			columns.forEach((column) => {
				builder.orWhere(column as string, "like", `%${keyword}%`);
			});
		});
	}

	deleteById(id: string) {
		return this._context.where("Id", id).del();
	}

	updateById(
		id: string,
		data: T extends Knex.CompositeTableType<unknown>
			? Knex.ResolveTableType<T, "update">
			: Knex.DbRecordArr<T>
	) {
		return this._context.where("Id", id).update(data);
	}
}

export const contextExtensions = <T extends BaseEntity>(table: DatabaseTable) =>
	new queryBuilderExtension<T>(table);
