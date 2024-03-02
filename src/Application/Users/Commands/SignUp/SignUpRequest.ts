/**
 * Request for sign up
 * @typedef {object} SignUpRequest
 * @property {string} firstName.required - First name
 * @property {string} lastName.required - Last name
 * @property {string} username.required - Username
 * @property {string} email.required - Email
 * @property {string} password.required - Password
 */

export interface SignUpRequest {
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	password: string;
}
