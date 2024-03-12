import { envProperties } from "../utils/constants/properties";

export const logServer = (port: number) => {
	const serverMessage = `Server is running: [http://localhost:${port}]`;
	const swaggerMessage = `Swagger is available at: [http://localhost:${port}${envProperties.SWAGGER_PATH}]`;
	const apiDocMessage = `API documentation is available at: [http://localhost:${port}${envProperties.SWAGGER_DOC_PATH}]`;

	console.log(`
	\x1b[1m╔════════════════════════════════════════════\x1b[0m
	\x1b[1m║\x1b[32m${serverMessage}\x1b[0m\x1b[1m║\x1b[0m
	\x1b[1m║\x1b[36m${swaggerMessage}\x1b[0m\x1b[1m║\x1b[0m
	\x1b[1m║\x1b[33m${apiDocMessage}\x1b[0m\x1b[1m║\x1b[0m
	\x1b[1m╚════════════════════════════════════════════\x1b[0m
	`);
};
