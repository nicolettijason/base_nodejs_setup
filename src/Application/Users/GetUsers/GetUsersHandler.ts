import { Request, Response } from "express";
import * as context from "../../../Infrastructure/dbContext";
import { User } from "../../../models/Entities";
import { StatusCodes } from "http-status-codes";
import { BaseResponse, SuccessReponse } from "../../Common/BaseResponse";
import { GetUserResponse } from "../GetUser/GetUserResponse";

export const GetUsersHandler = async (
	_req: Request,
	res: Response<BaseResponse<GetUserResponse[]>>
) => {
	const query = await context.query<User>('SELECT * FROM "Users"', []);

	return res.status(StatusCodes.OK).send(
		new SuccessReponse(
			query.rows.map((row) => ({
				id: row.Id,
				email: row.Email,
				name: row.FirstName + " " + row.LastName,
			}))
		)
	);
};
