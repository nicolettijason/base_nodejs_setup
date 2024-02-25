import { Router } from "express";
import { CreateCategoryHandler } from "../../Application/Categories/Commands/CreateCategory/CreateCategoryHandler";
import { CreateCategoryRequestValidator } from "../../Application/Categories/Commands/CreateCategory/CreateCategoryRequestValidator";
import { GetAllCategoriesHandler } from "../../Application/Categories/Queries/GetAllCategories/GetAllCategoriesHandler";

export const categoryRouter = Router();

/**
 * POST /api/categories
 * @tags Categories
 * @summary Create category
 * @param {CreateCategoryRequest} request.body.required - Create category request
 * @return {SuccessReponse} 201 - success response
 * @return {ErrorResponse} 400 - bad request
 * @example request - Create category
 * {
 * "name": "Category 1",
 * "isPublic": true,
 * "userId": 1
 * }
 */

categoryRouter.post("/", CreateCategoryRequestValidator, CreateCategoryHandler);

/**
 * GET /api/categories
 * @tags Categories
 * @summary Get all categories
 * @return {GetAllCategoriesResponse} 200 - success response
 */
categoryRouter.get("/", GetAllCategoriesHandler);
