/**
 * @typedef {object} GetUser
 * @property {number} id.required - id
 * @property {string} name.required - name
 * @property {string} email.required - email
 */

/**
 * @typedef {object} GetUserResponse
 * @property {boolean} success.required - success
 * @property {number} statusCode - statusCode
 * @property {GetUser} result - result
 */

export interface GetUserResponse {
	id: number;
	name: string;
	email: string;
}
