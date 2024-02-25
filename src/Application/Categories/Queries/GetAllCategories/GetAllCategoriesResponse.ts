/**
 * @typedef {object} GetAllCategories
 * @property {number} id.required - id
 * @property {string} name.required - name
 * @property {boolean} isPublic.required - isPublic
 * @property {CategoryUser} user.required - user
 */

/**
 * @typedef {object} GetAllCategoriesResponse
 * @property {boolean} success - success
 * @property {number} statusCode - statusCode
 * @property {GetAllCategories[]} result - result
 */

export interface GetAllCategoriesResponse {
	id: number;
	name: string;
	isPublic: boolean;
	user: CategoryUser;
}

/**
 * @typedef {object} CategoryUser
 * @property {number} id.required - id
 * @property {string} firstName.required - firstName
 * @property {string} lastName.required - lastName
 */
export interface CategoryUser {
	id: number;
	firstName: string;
	lastName: string;
}
