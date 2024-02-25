import { Request, Response } from "express";
import { GetUserResponse } from "./GetUserResponse";
import { User } from "../../../models/Entities";
import { GetUserRequest } from "./GetUserRequest";
import { StatusCodes } from "http-status-codes";
import {
	BaseResponse,
	ErrorResponse,
	SuccessReponse,
} from "../../Common/BaseResponse";
import { errorMessages } from "../../../utils/constants/errorMessages";
import { context } from "../../../Infrastructure/dbContext";

export const GetUserHandler = async (
	req: Request<GetUserRequest>,
	res: Response<BaseResponse<GetUserResponse>>
) => {
	const user = await context<User>("Users")
		.select("Id", "FirstName", "LastName", "Email")
		.where("Id", req.params.id)
		.first();

	if (!user) {
		return res
			.status(StatusCodes.NOT_FOUND)
			.send(
				new ErrorResponse(errorMessages.UserNotFound, StatusCodes.NOT_FOUND)
			);
	}
	const response: GetUserResponse = {
		id: user.Id,
		name: user.FirstName + " " + user.LastName,
		email: user.Email,
	};

	return res.status(StatusCodes.OK).send(new SuccessReponse(response));
};
