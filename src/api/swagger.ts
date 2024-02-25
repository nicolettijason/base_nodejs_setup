import expressSwagger from "express-jsdoc-swagger";
import e, { Express } from "express";
import { configDotenv } from "dotenv";
import { envProperties } from "../helpers";

const options = {
	info: {
		version: "1.0.0",
		title: "API",
	},
	security: {
		BasicAuth: {
			type: "http",
			scheme: "basic",
		},
	},
	// Base directory which we use to locate your JSDOC files
	baseDir: __dirname,
	// Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
	filesPattern: [
		"./controllers/*.ts",
		"../Application/**/**/*.ts",
		"../Application/**/**/**/*.ts",
		"../models/interfaces/*.ts",
	],
	// URL where SwaggerUI will be rendered
	swaggerUIPath: envProperties.SWAGGER_PATH,
	// Expose OpenAPI UI
	exposeSwaggerUI: true,
	// Expose Open API JSON Docs documentation in `apiDocsPath` path.
	exposeApiDocs: true,
	// Open API JSON Docs endpoint.
	apiDocsPath: envProperties.SWAGGER_DOC_PATH,
	// Set non-required fields as nullable by default
	notRequiredAsNullable: true,
	// You can customize your UI options.
	// you can extend swagger-ui-express config. You can checkout an example of this
	// in the `example/configuration/swaggerOptions.js`
	swaggerUiOptions: {},
	// multiple option in case you want more that one instance
};

export default (app: Express) => expressSwagger(app)(options);
