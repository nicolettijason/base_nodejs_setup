import { CreateCategoryRequest } from "./CreateCategoryRequest";
import validator from "../../Common/baseValidator";

export const CreateCategoryValidator = validator<CreateCategoryRequest>(
	{
		validation: (req) => req.name.length > 0,
		message: "Name is required",
	},
	{
		validation: (req) => req.userId > 0,
		message: "UserId is required",
	}
);
