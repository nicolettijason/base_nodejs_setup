import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import cookie from "cookie";
import { SuccessReponse } from "../../../Common/BaseResponse";

export const LogoutHandler = (req: Request, res: Response) => {
	res.setHeader(
		"Set-Cookie",
		cookie.serialize("token", "", {
			httpOnly: true,
			path: "/",
			expires: new Date(-1),
		})
	);
	return res.status(StatusCodes.OK).send(new SuccessReponse());
};
