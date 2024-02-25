import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "./BaseResponse";
import { StatusCodes } from "http-status-codes";
import { errorMessages } from "../../utils/constants/errorMessages";

export interface IValidator<TRequest extends object> {
	validation: (body: TRequest) => boolean;
	message: string;
}

const status = StatusCodes.BAD_REQUEST;

export const validateRequest =
	<TRequest extends object>(...validators: IValidator<TRequest>[]) =>
	(req: Request<{}, {}, TRequest>, res: Response, next: NextFunction) => {
		if (Object.keys(req.body).length === 0) {
			return res
				.status(status)
				.send(new ErrorResponse("Body is required", status));
		}

		let validationErrors: string[];

		try {
			validationErrors = validators.reduce((errors: string[], validator) => {
				if (!validator.validation(req.body)) {
					errors.push(validator.message);
				}
				return errors;
			}, []);
		} catch (error) {
			validationErrors = [errorMessages.InvalidBody];
		}
		return validationErrors.length === 0
			? next()
			: res.status(status).send(new ErrorResponse(validationErrors, status));
	};
