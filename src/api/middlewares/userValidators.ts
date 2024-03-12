import { NextFunction, Request, Response } from "express";
import { UserRoles } from "../../models/Enums/UserRoles";
import cookie from "cookie";
import { ErrorResponse } from "../../Application/Common/BaseResponse";
import { StatusCodes } from "http-status-codes";
import { JwtService } from "../../Infrastructure/jwt.service";
import { errorMessages } from "../../utils/constants/errorMessages";

export const acceptRole = (...roles: UserRoles[]) => {
	return (req: Request<{}, {}, {}>, res: Response, next: NextFunction) => {
		if (!roles.length) return next();

		JwtService.getTokenDatas(
			req.headers.cookie,
			() => unauthorized(res),
			(data) => roles.includes(data.role)
		) && next();
	};
};

const unauthorized = (res: Response) => {
	return res
		.status(StatusCodes.UNAUTHORIZED)
		.send(
			new ErrorResponse(errorMessages.AccessDenied, StatusCodes.UNAUTHORIZED)
		);
};