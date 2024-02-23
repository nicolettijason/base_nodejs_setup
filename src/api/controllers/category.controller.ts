import express from "express";
import { CreateCategoryHandler } from "../../Application/Categories/CreateCategory/CreateCategoryHandler";
import { CreateCategoryValidator } from "../../Application/Categories/CreateCategory/CreateCategoryValidator";

export const categoryRouter = express.Router();

/**
 * POST /api/categories
 * @tags Categories
 * @summary This is the summary of the endpoint
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

categoryRouter.post("/", CreateCategoryValidator, CreateCategoryHandler);
