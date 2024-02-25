import { CreateCategoryRequest } from "./CreateCategoryRequest";
import { validateRequest } from "../../../Common/baseValidator";
import { errorMessages } from "../../../../utils/constants/errorMessages";

export const CreateCategoryRequestValidator =
	validateRequest<CreateCategoryRequest>(
		{
			validation: (req) => req.name.length > 0,
			message: errorMessages.required.Name,
		},
		{
			validation: (req) => req.userId > 0,
			message: errorMessages.InvalidId,
		}
	);
