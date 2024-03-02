import { StatusCodes } from "http-status-codes";
import { context } from "../../../../Infrastructure/dbContext";
import { envProperties } from "../../../../helpers";
import { User } from "../../../../models/Entities";
import {
	BaseResponse,
	ErrorResponse,
	SuccessReponse,
} from "../../../Common/BaseResponse";
import { SignInRequest } from "./SignInRequest";
import { SignInResponse } from "./SignInResponse";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { JwtService } from "../../../../Infrastructure/jwt.service";
import { UserRoles } from "../../../../models/Enums/UserRoles";
import { DatabaseTable } from "../../../../models/Enums/DatabaseTable";

export const SignInHandler = async (
	req: Request<{}, BaseResponse<SignInResponse>, SignInRequest>,
	res: Response<BaseResponse<SignInResponse>>
) => {
	const { username, password } = req.body;
	const user = await context<User>(DatabaseTable.Users)
		.where("Username", username)
		.first();
	if (!user) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.send(
				new ErrorResponse(
					"Username or password is incorrect",
					StatusCodes.BAD_REQUEST
				)
			);
	}

	const isPasswordValid = await bcrypt.compare(password, user.Password);
	if (!isPasswordValid) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.send(new ErrorResponse("Invalid password", StatusCodes.BAD_REQUEST));
	}

	const token = JwtService.generateToken(
		user.Id,
		user.Username,
		user.Email,
		UserRoles.User
	);
	const actualDate = new Date();

	res.setHeader(
		"Set-Cookie",
		cookie.serialize("token", token, {
			httpOnly: true,
			path: "/",
			expires: new Date(actualDate.setHours(actualDate.getHours() + 1)),
		})
	);

	return res.status(StatusCodes.OK).send(
		new SuccessReponse<SignInResponse>(
			{
				id: user.Id,
				username: user.Username,
				email: user.Email,
			},
			StatusCodes.OK
		)
	);
};
