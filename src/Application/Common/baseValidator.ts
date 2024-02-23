import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "./BaseResponse";
import { StatusCodes } from "http-status-codes";

export interface IValidator<TRequest> {
	validation: (body: TRequest) => boolean;
	message: string;
}

const status = StatusCodes.BAD_REQUEST;

export default <TRequest>(...args: IValidator<TRequest>[]) =>
	(req: Request<{}, {}, TRequest>, res: Response, next: NextFunction) => {
		const result = args
			.filter((arg) => !arg.validation(req.body))
			.map((arg) => arg.message);

		return result.length === 0
			? next()
			: res.status(status).send(new ErrorResponse(result, status));
	};
