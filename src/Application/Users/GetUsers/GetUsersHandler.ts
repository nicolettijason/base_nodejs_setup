import { Request, Response } from "express";
import { context } from "../../../Infrastructure/dbContext";
import { User } from "../../../models/Entities";
import { StatusCodes } from "http-status-codes";
import { BaseResponse, SuccessReponse } from "../../Common/BaseResponse";
import { GetUserResponse } from "../GetUser/GetUserResponse";

export const GetUsersHandler = async (
	_req: Request,
	res: Response<BaseResponse<GetUserResponse[]>>
) => {
	const query = await context<User>("Users").select(
		"Id",
		"Email",
		"FirstName",
		"LastName"
	);

	return res.status(StatusCodes.OK).send(
		new SuccessReponse(
			query.map((row) => ({
				id: row.Id,
				email: row.Email,
				name: row.FirstName + " " + row.LastName,
			}))
		)
	);
};
