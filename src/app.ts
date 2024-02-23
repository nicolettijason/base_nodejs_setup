import cors from "cors";
import express from "express";
import helmet from "helmet";
import router from "./api/router";
import { envProperties, logServer } from "./helpers";
import swagger from "./api/swagger";

const app = express();

const port = envProperties.PORT_DEFAULT;

if (!port) {
	// check if port is defined
	console.log("No PORT_DEFAULT in .env file");
	process.exit(1);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use("/api", router);
swagger(app);

app.listen(port, () => {
	logServer(port);
});
