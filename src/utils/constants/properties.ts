import { configDotenv } from "dotenv";
import { IEnvProperties } from "../../models/interfaces";

const api_path = "/api";

const swagger_path = "/api/swagger";

const swagger_doc_path = "/api/swagger/swagger.json";

configDotenv();

export const envProperties: IEnvProperties = {
	...process.env,
	SWAGGER_DOC_PATH: swagger_doc_path,
	SWAGGER_PATH: swagger_path,
	API_PATH: api_path,
	PORT_DEFAULT: parseInt(process.env.PORT_DEFAULT as string, 10),
} as IEnvProperties;
