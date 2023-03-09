import App from "./app";
import logger from "./logger";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3001;

App.set("port", PORT);
App.listen(PORT, () => {
    logger.info(`Server is running on port: ${PORT}`);
});
