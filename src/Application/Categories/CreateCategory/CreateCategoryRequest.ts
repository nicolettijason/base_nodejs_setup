/**
 * CreateCategoryRequest
 * @typedef {object} CreateCategoryRequest
 * @property {string} Name.required - Name of the category
 * @property {boolean} IsPublic.required - Is the category public
 * @property {number} UserId.required - User Id
 */

export interface CreateCategoryRequest {
	name: string;
	isPublic: boolean;
	userId: number;
}
