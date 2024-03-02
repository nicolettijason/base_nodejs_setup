import { Request, Response } from "express";
import { SignUpRequest } from "./SignUpRequest";
import { context } from "../../../../Infrastructure/dbContext";
import { User } from "../../../../models/Entities";
import {
	BaseResponse,
	ErrorResponse,
	SuccessReponse,
} from "../../../Common/BaseResponse";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import { DatabaseTable } from "../../../../models/Enums/DatabaseTable";

export const SignUpHandler = async (
	req: Request<{}, {}, SignUpRequest>,
	res: Response<BaseResponse<string>>
) => {
	const { firstName, lastName, username, email, password } = req.body;
	const user = await context<User>(DatabaseTable.Users)
		.where("Email", email)
		.orWhere("Username", username)
		.first();
	if (user) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.send(new ErrorResponse("User already exists", StatusCodes.BAD_REQUEST));
	}

	let passwordHash = await bcrypt.hash(password, 10);

	await context<User>(DatabaseTable.Users).insert({
		FirstName: firstName,
		LastName: lastName,
		Email: email,
		Username: username,
		Password: passwordHash,
		CreatedAt: new Date(),
		ModifiedAt: new Date(),
	});

	return res
		.status(StatusCodes.CREATED)
		.send(new SuccessReponse(undefined, StatusCodes.CREATED));
};
