/**
 * @typedef {object} GetUsersResponse
 * @property {boolean} success - success
 * @property {number} statusCode - statusCode
 * @property {GetUser[]} result - result
 */

export interface GetUsersResponse {
	id: number;
	name: string;
	email: string;
}
