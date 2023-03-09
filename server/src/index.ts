import App from "./app";
import logger from "./logger";

const PORT = process.env.PORT || 3001

App.set("port", PORT)
App.listen(PORT, () => {
    logger.info(`Server is running on port: ${PORT}`)
})