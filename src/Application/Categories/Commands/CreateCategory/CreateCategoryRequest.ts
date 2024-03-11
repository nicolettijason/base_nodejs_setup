/**
 * CreateCategoryRequest
 * @typedef {object} CreateCategoryRequest
 * @property {string} Name.required - Name of the category
 * @property {boolean} IsPublic.required - Is the category public
 */

export interface CreateCategoryRequest {
	name: string;
	isPublic: boolean;
}
