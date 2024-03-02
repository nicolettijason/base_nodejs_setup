import { Request, Response } from "express";
import { GetAllCategoriesResponse } from "./GetAllCategoriesResponse";
import { SuccessReponse } from "../../../Common/BaseResponse";
import { Category } from "../../../../models/Entities/Category/category.interface";
import { User } from "../../../../models/Entities";
import { context } from "../../../../Infrastructure/dbContext";
import { DatabaseTable } from "../../../../models/Enums/DatabaseTable";

export const GetAllCategoriesHandler = async (
	_req: Request,
	res: Response<SuccessReponse<GetAllCategoriesResponse[]>>
) => {
	const categories: (User & Category)[] = await context<Category>(DatabaseTable.Categories)
		.leftJoin<User>("Users", "Users.Id", "Categories.UserId")
		.select(
			"Categories.Id",
			"Name",
			"IsPublic",
			"UserId",
			"FirstName",
			"LastName"
		);

	const response = await Promise.all(
		categories.map(async (category) => {
			return {
				id: category.Id,
				name: category.Name,
				isPublic: category.IsPublic,
				user: {
					id: category.UserId,
					firstName: category.FirstName,
					lastName: category.LastName,
				},
			};
		})
	);

	return res.status(200).send(new SuccessReponse(response));
};
