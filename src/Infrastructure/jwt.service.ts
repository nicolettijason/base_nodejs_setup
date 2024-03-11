import jwt from "jsonwebtoken";
import { envProperties } from "../helpers";
import { ITokenDatas } from "../models/interfaces/tokenDatas.interface";
import { UserRoles } from "../models/Enums/UserRoles";
import cookie from "cookie";

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
	getToken: (cookies: string) => {
		return cookie.parse(cookies).token || "";
	},

	getTokenDatas: (
		cookies: string | undefined,
		callback?: (error: { message: string }) => void,
		validator?: (datas: ITokenDatas) => boolean
	) => {
		const callBackReturn = () => {
			return callback ? callback({ message: "No token provided" }) : null;
		};
		try {
			const token = JwtService.getToken(cookies || "");

			const datas = jwt.verify(token, envProperties.JWT_SECRET) as ITokenDatas;
			if (validator && !validator(datas)) {
				return callBackReturn();
			}
			return datas;
		} catch (error) {
			return callBackReturn();
		}
	},
};
