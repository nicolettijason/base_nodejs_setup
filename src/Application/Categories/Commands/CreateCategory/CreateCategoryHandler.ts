import { Request, Response } from "express";
import { Category } from "../../../../models/Entities/Category/category.interface";
import { ErrorResponse, SuccessReponse } from "../../../Common/BaseResponse";
import { StatusCodes } from "http-status-codes";
import { CreateCategoryRequest } from "./CreateCategoryRequest";
import { User } from "../../../../models/Entities";
import { errorMessages } from "../../../../utils/constants/errorMessages";
import { context } from "../../../../Infrastructure/dbContext";
import { DatabaseTable } from "../../../../models/Enums/DatabaseTable";
import { JwtService } from "../../../../Infrastructure/jwt.service";

export const CreateCategoryHandler = async (
	req: Request<{}, {}, CreateCategoryRequest>,
	res: Response<SuccessReponse<undefined> | ErrorResponse>
) => {
	const currentUser = JwtService.getTokenDatas(req.headers.cookie);
	console.log(currentUser);
	const user = currentUser
		? await context<User>(DatabaseTable.Users)
				.where("Id", currentUser.id)
				.select("Id")
				.first()
		: null;

	if (!user)
		return res
			.status(StatusCodes.BAD_REQUEST)
			.send(
				new ErrorResponse(errorMessages.UserNotFound, StatusCodes.BAD_REQUEST)
			);

	return context<Category>(DatabaseTable.Categories)
		.insert({
			IsPublic: req.body.isPublic,
			Name: req.body.name,
			UserId: user.Id,
			CreatedAt: new Date(),
			ModifiedAt: new Date(),
		})
		.then(() =>
			res.status(StatusCodes.CREATED).send(new SuccessReponse(undefined))
		)
		.catch((err) =>
			res
				.status(StatusCodes.BAD_REQUEST)
				.send(new ErrorResponse(err.message, StatusCodes.BAD_REQUEST))
		);
};
