import { Router } from "express";
import { GetUsersHandler } from "../../Application/Users/Queries/GetUsers/GetUsersHandler";
import { GetUserHandler } from "../../Application/Users/Queries/GetUser/GetUserHandler";
import { SignUpRequestValidator } from "../../Application/Users/Commands/SignUp/SignUpRequestValidator";
import { SignUpHandler } from "../../Application/Users/Commands/SignUp/SignUpHandler";
import { SignInHandler } from "../../Application/Users/Commands/SignIn/SignInHandler";
import { LogoutHandler } from "../../Application/Users/Commands/Logout/LogoutHandler";
import { acceptRole } from "../middlewares/userValidators";
import { UserRoles } from "../../models/Enums/UserRoles";

export const userRouter = Router();

/**
 * GET /api/users
 * @tags Users
 * @summary Get all users
 * @return {GetUsersResponse} 200 - success response
 */
userRouter.get("/", acceptRole(UserRoles.Admin), GetUsersHandler);

/**
 * GET /api/users/{id}
 * @tags Users
 * @summary Get user by id
 * @param {number} id.path.required - id
 * @return {GetUserResponse} 200 - success response
 * @return {ErrorResponse} 404 - not found
 */
userRouter.get(
	"/:id",
	acceptRole(UserRoles.User, UserRoles.Admin),
	GetUserHandler
);

/**
 * POST /api/users/signup
 * @tags Users
 * @summary Signup user
 * @param {SignUpRequest} request.body.required - Signup request
 * @return {SuccessResponse} 201 - success response
 * @return {ErrorResponse} 400 - bad request
 * @example request - Signup user
 * {
 * "firstName": "John",
 * "lastName": "Doe",
 * "username": "johnDoe",
 * "email": "john.doe@hotmail.com",
 * "password": "Azerty123"
 * }
 */
userRouter.post("/signup", SignUpRequestValidator, SignUpHandler);

/**
 * POST /api/users/signin
 * @tags Users
 * @summary Signin user
 * @param {SignInRequest} request.body.required - Signin request
 * @return {SignInResponse} 200 - success response
 * @return {ErrorResponse} 400 - bad request
 * @example request - Signin user
 * {
 * "username": "johnDoe",
 * "password":"Azerty123"
 * }
 */
userRouter.post("/signin", SignInHandler);

/**
 * POST /api/users/logout
 * @tags Users
 * @summary Logout user
 * @return {SuccessResponse} 200 - success response
 */
userRouter.post("/logout", LogoutHandler);
