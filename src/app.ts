import cors from "cors";
import express from "express";
import helmet from "helmet";
import router from "./api/router";
import { logServer } from "./helpers";
import swagger from "./api/swagger";
import { envProperties } from "./utils/constants/properties";

const app = express();

const port = envProperties.PORT_DEFAULT;

if (!port) {
	console.log("No PORT_DEFAULT in .env file");
	process.exit(1);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
swagger(app);
app.use(envProperties.API_PATH, router);

app.listen(port, () => {
	logServer(port);
});
