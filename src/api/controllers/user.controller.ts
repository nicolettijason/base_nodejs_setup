import { Router } from "express";
import { GetUsersHandler } from "../../Application/Users/GetUsers/GetUsersHandler";
import { GetUserHandler } from "../../Application/Users/GetUser/GetUserHandler";

export const userRouter = Router();

/**
 * GET /api/users
 * @tags Users
 * @summary This is the summary of the endpoint
 * @return {GetUsersResponse} 200 - success response
 */
userRouter.get("/", GetUsersHandler);

/**
 * GET /api/users/{id}
 * @tags Users
 * @summary This is the summary of the endpoint
 * @param {number} id.path.required - id
 * @return {GetUserResponse} 200 - success response
 * @return {ErrorResponse} 404 - not found
 */
userRouter.get("/:id", GetUserHandler);
