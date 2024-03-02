import {
	validateEmail,
	validatePassword,
	validateRequest,
} from "../../../Common/baseValidator";
import { SignUpRequest } from "./SignUpRequest";

export const SignUpRequestValidator = validateRequest<SignUpRequest>(
	{
		validation: (req) => req.firstName.length > 0,
		message: "First Name is required",
	},
	{
		validation: (req) => req.lastName.length > 0,
		message: "Last Name is required",
	},
	{
		validation: (req) => req.username.length > 0,
		message: "Username is required",
	},
	{
		validation: (req) => validateEmail(req.email),
		message: "Invalid Email Address",
	},
	{
		validation: (req) => validatePassword(req.password),
		message:
			"Password must be at least 8 characters long and contain at least one letter and one number",
	}
);
