/**
 * @typedef {object} GetUsersResponse
 * @property {boolean} success.required - success
 * @property {string} message - message
 * @property {number} statusCode - statusCode
 * @property {GetUser[]} result - result
 */

export interface GetUsersResponse {
	id: number;
	name: string;
	email: string;
}