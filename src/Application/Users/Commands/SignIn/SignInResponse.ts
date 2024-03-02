/**
 * @typedef {object} SignIn
 * @property {number} id - The id of the user
 * @property {string} username - The username of the user
 * @property {string} email - The email of the user
 */

/**
 * Response to sign in
 * @typedef {object} SignInResponse
 * @property {boolean} success - success
 * @property {number} statusCode - statusCode
 * @property {SignIn} result - result
 */

export interface SignInResponse {
	id: number;
	username: string;
	email: string;
}
