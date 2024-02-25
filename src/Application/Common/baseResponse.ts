import { StatusCodes } from "http-status-codes";

/**
 * TO COPY IN EACH RESPONSE FILE
 * @typedef {object} BaseResponse
 * @property {boolean} success.required - success
 * @property {number} statusCode - statusCode
 * @property {object} result - result
 */

export class BaseResponse<TResponse = undefined> {
	result?: TResponse;
	success: boolean;
	error?: string | string[];
	statusCode?: StatusCodes;

	constructor(
		success: boolean,
		result?: TResponse,
		error?: string | string[],
		statusCode?: StatusCodes
	) {
		this.success = success;
		this.result = result;
		this.error = error;
		this.statusCode = statusCode;
	}
}

/**
 * SuccessReponse
 * @typedef {object} SuccessReponse
 * @property {boolean} success.required - success
 * @property {number} statusCode - statusCode
 */

export class SuccessReponse<TResponse> extends BaseResponse<TResponse> {
	constructor(result?: TResponse, public statusCode = StatusCodes.OK) {
		super(true, result, undefined, statusCode);
	}
}

/**
 * ErrorResponse
 * @typedef {object} ErrorResponse
 * @property {boolean} success.required - success
 * @property {oneOf|string|string[]} error - error
 * @property {number} statusCode - statusCode
 */

export class ErrorResponse extends BaseResponse {
	success = false;
	constructor(
		public error: string | string[],
		public statusCode?: StatusCodes
	) {
		super(false, undefined, error, statusCode);
	}
}
