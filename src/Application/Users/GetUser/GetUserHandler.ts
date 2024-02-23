import { Request, Response } from "express";
import { GetUserResponse } from "./GetUserResponse";
import * as context from "../../../Infrastructure/dbContext";
import { User } from "../../../models/Entities";
import { GetUserRequest } from "./GetUserRequest";
import { StatusCodes } from "http-status-codes";
import {
	BaseResponse,
	ErrorResponse,
	SuccessReponse,
} from "../../Common/BaseResponse";
import { errorMessages } from "../../../utils/constants/errorMessages";

export const GetUserHandler = async (
	req: Request<GetUserRequest>,
	res: Response<BaseResponse<GetUserResponse>>
) => {
	const query = await context.query<User>(
		'SELECT * FROM "Users" WHERE "Id" = $1',
		[req.params.id]
	);

	if (query.rowCount === 0) {
		return res
			.status(StatusCodes.NOT_FOUND)
			.send(
				new ErrorResponse(errorMessages.UserNotFound, StatusCodes.NOT_FOUND)
			);
	}

	const row = query.rows[0];

	const response: GetUserResponse = {
		id: row.Id,
		name: row.FirstName + " " + row.LastName,
		email: row.Email,
	};
	return res.status(StatusCodes.OK).send(new SuccessReponse(response));
};
