import App from "./app";
import logger from "./logger";
import dotenv from "dotenv";

dotenv.config();

const app = new App();

app.start().catch((err) => {
    logger.error(err);
});
