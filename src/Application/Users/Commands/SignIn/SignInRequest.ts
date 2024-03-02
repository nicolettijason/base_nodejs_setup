/**
 * Request to sign in
 * @typedef {object} SignInRequest
 * @property {string} username.required - The username
 * @property {string} password.required - The password
 */

export interface SignInRequest {
    username: string;
    password: string;
}