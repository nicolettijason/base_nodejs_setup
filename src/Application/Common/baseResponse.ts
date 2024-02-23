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
	message?: string | string[];
	statusCode?: StatusCodes;

	constructor(
		success: boolean,
		result?: TResponse,
		message?: string | string[],
		statusCode?: StatusCodes
	) {
		this.success = success;
		this.result = result;
		this.message = message;
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
 * @property {oneOf|string|string[]} message - message
 * @property {number} statusCode - statusCode
 */

export class ErrorResponse extends BaseResponse {
	success = false;
	constructor(
		public message: string | string[],
		public statusCode?: StatusCodes
	) {
		super(false, undefined, message, statusCode);
	}
}
