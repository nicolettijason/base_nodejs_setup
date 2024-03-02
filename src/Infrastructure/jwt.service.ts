import jwt from "jsonwebtoken";
import { envProperties } from "../helpers";
import { ITokenDatas } from "../models/interfaces/tokenDatas.interface";
import { UserRoles } from "../models/Enums/UserRoles";

export const JwtService = {
	generateToken: (
		id: number,
		username: string,
		email: string,
		role: UserRoles
	) => {
		const datas: ITokenDatas = { id, username, email, role };
		return jwt.sign(datas, envProperties.JWT_SECRET, { expiresIn: "1h" });
	},
	verifyToken: (
		token: string | undefined,
		callback: (error: { message: string }) => void,
		validator?: (datas: ITokenDatas) => boolean
	) => {
		try {
			if (!token) {
				callback({ message: "No token provided" });
				return false;
			}
			const datas = jwt.verify(token, envProperties.JWT_SECRET) as ITokenDatas;
			if (validator && !validator(datas)) {
				return callback({ message: "Invalid token" });
			}
			return true;
		} catch (error) {
			callback(error as { message: string });
			return false;
		}
	},
};
