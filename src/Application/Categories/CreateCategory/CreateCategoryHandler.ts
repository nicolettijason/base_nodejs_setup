import { Request, Response } from "express";
import * as context from "../../../Infrastructure/dbContext";
import { Category } from "../../../models/Entities/Category/category.interface";
import { ErrorResponse, SuccessReponse } from "../../Common/BaseResponse";
import { StatusCodes } from "http-status-codes";
import { CreateCategoryRequest } from "./CreateCategoryRequest";
import { User } from "../../../models/Entities";
import { errorMessages } from "../../../utils/constants/errorMessages";

export const CreateCategoryHandler = async (
	req: Request<{}, {}, CreateCategoryRequest>,
	res: Response<SuccessReponse<undefined> | ErrorResponse>
) => {
	const user = req.body.userId
		? await context.query<User>('SELECT * FROM "Users" WHERE "Id" = $1', [
				req.body.userId,
		  ])
		: null;

	if (!user || user.rowCount === 0) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.send(
				new ErrorResponse(errorMessages.UserNotFound, StatusCodes.BAD_REQUEST)
			);
	}

	return context
		.query<Category>(
			'INSERT INTO "Categories" ("Name", "IsPublic", "UserId", "CreatedAt", "ModifiedAt") VALUES ($1, $2, $3, $4, $5)',
			[
				req.body.name,
				req.body.isPublic,
				req.body.userId,
				new Date(),
				new Date(),
			]
		)
		.then(() => {
			return res
				.status(StatusCodes.CREATED)
				.send(new SuccessReponse(undefined));
		})
		.catch((err) => {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.send(new ErrorResponse(err.message, StatusCodes.BAD_REQUEST));
		});
};
